/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { getFromLocalStorage, saveToLocalStorage } from "../storage";

const TEST_KEY1 = "little-block-game.test";
const TEST_KEY2 = "little-block-game.empty";

const testMessage = "hello my friend";

describe("storage", () => {
	test("save to local storage", () => {
		saveToLocalStorage(TEST_KEY1, testMessage);
	});
	test("get from local storage", () => {
		const message = getFromLocalStorage(TEST_KEY1);
		expect(message).toBe(testMessage);
	});
	test("get not existing key", () => {
		const message = getFromLocalStorage("little-block-game.not");
		expect(message.failed).toBeTruthy;
	});
	test("get empty key", () => {
		saveToLocalStorage(TEST_KEY2, null);
		const message1 = getFromLocalStorage(TEST_KEY2);
		expect(message1).toBe(null);
        
		saveToLocalStorage(TEST_KEY2, "");
		const message2 = getFromLocalStorage(TEST_KEY2);
		expect(message2).toBe("");
	});
});