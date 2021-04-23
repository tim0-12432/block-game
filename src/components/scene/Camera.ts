import * as THREE from "three";

export const Camera = () => {
	const width = 10;
	const height = width + (window.innerHeight / window.innerWidth);
	const near = 1;
	const far = 100;

	return new THREE.OrthographicCamera(
		width / -2,
		width / 2,
		height / 2,
		height / -2,
		near,
		far
	);
}