import * as CANNON from "cannon";
import * as THREE from "three";
import { BoxProps, LayerProps, OverhangProps, CutProps } from "../../types";
import { Camera } from "./Camera";

const originalBoxSize = 3;
const boxHeight = 1;
const stack: any[] = [];
const overhangs: any[] = [];
let camera: THREE.Camera, scene: THREE.Scene, world: CANNON.World, renderer: THREE.WebGLRenderer;
let gameStarted = false;
let count = 0;

function addLayer({x, z, width, depth, direction}: LayerProps) {
	const y = boxHeight * stack.length;

	const layer = generateBox({x, y, z, width, depth, falls: false});
	layer.direction = direction;
    
	stack.push(layer);
}

function addOverhanging({x, z, width, depth}: OverhangProps) {
	const y = boxHeight * (stack.length - 1);

	const overhang = generateBox({x, y, z, width, depth, falls: true});
	overhangs.push(overhang);
}

export function generateBox({x, y, z, width, depth, falls}: BoxProps): any {
	const geometry = new THREE.BoxGeometry(width, boxHeight, depth);

	const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
	const material = new THREE.MeshLambertMaterial({ color: color });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	scene.add(mesh);

	const shape = new CANNON.Box(
		new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
	);
	const mass = falls ? 5 : 0;
	const body = new CANNON.Body({ mass, shape });
	body.position.set(x, y, z);
	world.addBody(body);

	const direction = "x";

	return {
		threejs: mesh,
		cannonjs: body,
		width,
		depth,
		direction
	};
}

export function cutBox({topLayer, overlap, size, delta}: CutProps): any {
	const direction = topLayer.direction;
	const newWidth = direction == "x" ? overlap : topLayer.width;
	const newDepth = direction == "z" ? overlap : topLayer.depth;

	topLayer.width = newWidth;
	topLayer.depth = newDepth;

	topLayer.threejs.scale[direction] = overlap / size;
	topLayer.threejs.position[direction] -= delta / 2;
	topLayer.cannonjs.position[direction] -= delta / 2;

	const shape = new CANNON.Box(
		new CANNON.Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
	);
	topLayer.cannonjs.shapes = [];
	topLayer.cannonjs.addShape(shape);

	return {
		newWidth: newWidth,
		newDepth: newDepth
	};
}

function animation() {
	const speed = 0.15;
	count = stack.length - 1;

	const topLayer = stack[stack.length - 1];
	topLayer.threejs.position[topLayer.direction] += speed;
	topLayer.cannonjs.position[topLayer.direction] += speed;

	renderCount();

	if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
		camera.position.y += speed;
	}

	updatePhysics();
	renderer.render(scene, camera);
}

function updatePhysics() {
	world.step(1 / 60);

	overhangs.forEach((element) => {
		element.threejs.position.copy(element.cannonjs.position);
		element.threejs.quaternion.copy(element.cannonjs.quaternion);
	});
}

function renderCount() {
	const element = document.querySelector("#count");
	element ? element.innerHTML = count.toString() : null;
}

function gameOver() {
	renderer.setAnimationLoop(null);
	window.removeEventListener("click", () => startGame());

	const element = document.querySelector("#gm-count");
	element ? element.innerHTML = count.toString() : null;
	const gameOverScreen = document.getElementById("gameOverScreen");
	if (gameOverScreen) {
		gameOverScreen.style ? gameOverScreen.style.display = "flex" : null;
	}
}

function startGame() {
	if(!gameStarted) {
		renderer.setAnimationLoop(animation);
		gameStarted = true;
	} else {
		const topLayer = stack[stack.length - 1];
		const previousLayer = stack[stack.length - 2];
		const direction = topLayer.direction;

		const delta = topLayer.threejs.position[direction] - previousLayer.threejs.position[direction];
		const overhanging = Math.abs(delta);
		const size = direction == "x" ? topLayer.width : topLayer.depth;
		const overlap = size - overhanging;

		if (overlap > 0) {
			const {newWidth, newDepth} = cutBox({topLayer, overlap, size, delta});

			const overhangingShift = (overlap / 2 + overhanging / 2) * Math.sign(delta);
			const overhangingX = direction == "x"
				? topLayer.threejs.position.x + overhangingShift
				: topLayer.threejs.position.x;
			const overhangingZ = direction == "z"
				? topLayer.threejs.position.z + overhangingShift
				: topLayer.threejs.position.z;
			const overhangWidth = direction == "x" ? overhanging : newWidth;
			const overhangDepth = direction == "z" ? overhanging : newDepth;

			addOverhanging({ x: overhangingX, z: overhangingZ, width: overhangWidth, depth: overhangDepth });

			const nextX = direction == "x" ? topLayer.threejs.position.x : -10;
			const nextZ = direction == "z" ? topLayer.threejs.position.z : -10;
			const nextDirection = direction == "x" ? "z" : "x";

			addLayer({ x: nextX, z: nextZ, width: newWidth, depth: newDepth, direction: nextDirection });
		} else {
			gameOver();
		}
	}
}

const Scene = (): void => {
	world = new CANNON.World();
	world.gravity.set(0, -10, 0);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 40;

	scene = new THREE.Scene();

	addLayer({ x: 0, z: 0, width: originalBoxSize, depth: originalBoxSize, direction: "" });
	addLayer({ x: -10, z: 0, width: originalBoxSize, depth: originalBoxSize, direction: "x" });

	const ambientLight = new THREE.AmbientLight(0xffffff, .6);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, .6);
	directionalLight.position.set(10, 20, 0);
	scene.add(directionalLight);

	camera = Camera();
	camera.position.set(4, 4, 4);
	camera.lookAt(0, 0, 0);

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
    
	const rootElement = document.getElementById("root");
	rootElement ? rootElement.appendChild(renderer.domElement) : null;

	window.addEventListener("click", () => startGame());
	window.addEventListener("keyup", (e) => {
		switch (e.code) {
		case "Space":
		case "Enter":
			startGame();
			break;
		default:
			console.log(e.code);
		}
	});
};
export default Scene;