/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Camera } from "../../../components/game/Camera";
import * as THREE from "three";

describe("camera", () => {
	test("camera returns camera", () => {
		const cam = Camera();
		expect(cam).toBeInstanceOf(THREE.OrthographicCamera);
		expect(cam.isCamera).toBeTruthy();
		expect(cam.isObject3D).toBeTruthy();
		expect(cam.isOrthographicCamera).toBeTruthy();
	});
	test("camera has right properties", () => {
		const width = 10;
		const height = width + (window.innerHeight / window.innerWidth);
		const near = 1;
		const far = 100;
		const cam = Camera();
		expect(cam.left).toBe(width / -2);
		expect(cam.right).toBe(width / 2);
		expect(cam.top).toBe(height / 2);
		expect(cam.bottom).toBe(height / -2);
		expect(cam.far).toBe(far);
		expect(cam.near).toBe(near);
	});
});