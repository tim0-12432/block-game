import * as THREE from "three";
import { Camera } from "./Camera";

type LayerProps = {
    x: number,
    z: number,
    width: number,
    depth: number,
    direction: string
}
type BoxProps = {
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
}

const boxHeight = 1;
const stack: any[] = [];
let camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let gameStarted = false;

function addLayer({x, z, width, depth, direction}: LayerProps) {
	const y = boxHeight * stack.length;

	const layer = generateBox({x, y, z, width, depth});
	layer.direction = direction;
    
	stack.push(layer);
}

function generateBox({x, y, z, width, depth}: BoxProps) {
	const geometry = new THREE.BoxGeometry(width, boxHeight, depth);

	const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
	const material = new THREE.MeshLambertMaterial({ color: color });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	scene.add(mesh);

	const direction = "x";

	return {
		threejs: mesh,
		width,
		depth,
		direction
	};
}

function animation() {
	const speed = 0.15;

	const topLayer = stack[stack.length - 1];
	topLayer.threejs.position[topLayer.direction] += speed;

    renderCount(stack.length);

	if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
		camera.position.y += speed;
	}

	renderer.render(scene, camera);
}

function renderCount(count: number) {
	const element = document.querySelector("#count");
	element ? element.innerHTML = count.toString() : null;
}

const Scene = () => {
	const originalBoxSize = 3;

	scene = new THREE.Scene();

	addLayer({ x: 0, z: 0, width: originalBoxSize, depth: originalBoxSize, direction: "x" });
	addLayer({ x: -10, z: 0, width: originalBoxSize, depth: originalBoxSize, direction: "z" });

	const ambientLight = new THREE.AmbientLight(0xffffff, .6);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, .6);
	directionalLight.position.set(10, 20, 0);
	scene.add(directionalLight);

	camera = Camera();
	camera.position.set(4, 4, 4);
	camera.lookAt(0, 0, 0);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
    
	const rootElement = document.getElementById("root");
	rootElement ? rootElement.appendChild(renderer.domElement) : null;

	window.addEventListener("click", () => {
		if(!gameStarted) {
			renderer.setAnimationLoop(animation);
			gameStarted = true;
		} else {
			const topLayer = stack[stack.length - 1];
			const direction = topLayer.direction;

			const nextX = direction == "x" ? 0 : -10;
			const nextZ = direction == "z" ? 0 : -10;
			const newWidth = originalBoxSize;
			const newDepth = originalBoxSize;
			const nextDirection = direction == "x" ? "z" : "x";

			addLayer({ x: nextX, z: nextZ, width: newWidth, depth: newDepth, direction: nextDirection });
		}
	});
};
export default Scene;