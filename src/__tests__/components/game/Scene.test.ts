/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { generateBox, cutBox } from "../../../components/game/Scene";

describe("scene", () => {
	test("generate box", () => {
		const pos1 = { x: 1, y: 2, z: 3 };
		const dim1 = { w: 2, d: 3 };
		expect(() => generateBox({ x: pos1.x, y: pos1.y, z: pos1.z, width: dim1.w, depth: dim1.d, falls: false })).toThrow(TypeError);
		//expect(generate1.width).toBe(dim1.w);
		//expect(generate1.depth).toBe(dim1.d);
	});
	test("cut box", () => {
		const siz1 = { o: 2, s: 3, d: 4 };
		const top1 = {
			direction: "x",
			width: 2,
			depth: 2,
			threejs: { scale: { "x": 2, "z": 3 }, position: { "x": 2, "z": 3 } },
			cannonjs: { scale: { "x": 2, "z": 3 }, position: { "x": 2, "z": 3 } } };
		expect(() => cutBox({ topLayer: top1, overlap: siz1.o, size: siz1.s, delta: siz1.d })).toThrow(TypeError);
		//expect(cut1.newWidth).toBe(top1.width);
		//expect(cut1.newDepth).toBe(siz1.o);
	});
});