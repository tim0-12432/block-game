/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import Options from "../../../components/options/Options";
import styles from "../../../components/options/Options.module.scss";

let testOptions:{ [key: string]: boolean } = {
	a: false,
	b: false,
	c: true
};
function setTestOptions(options: { [key: string]: boolean }) {
	testOptions = options;
}

const SETTINGS_CONTAINER_ID = styles.options;

beforeEach(() => {
	render(<Options options={ testOptions } setOptions={ setTestOptions } />);
});

describe("options", () => {
	test("settings are rendered", () => {
		const container = document.getElementById(SETTINGS_CONTAINER_ID);
		expect(container).toBeInTheDocument;
		expect(screen.getByText(/settings/i)).toBeVisible();
	});
	test("options are not visible", () => {
		Object.keys(testOptions).forEach((key) => {
			expect(() => { return screen.getByText(`${key}:`); })
				.toThrow(`Unable to find an element with the text: ${key}:. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`);
		});
	});
	test("settings is clickable", () => {
		fireEvent.click(screen.getByText(/settings/i));
	});
	test("options are visible", () => {
		fireEvent.click(screen.getByText(/settings/i));
		Object.keys(testOptions).forEach((key) => {
			const option = screen.getByText(`${key}:`);
			expect(option).toBeInTheDocument();
			expect(option).toBeVisible();
		});
	});
	test("options have the right checkbox", () => {
		fireEvent.click(screen.getByText(/settings/i));
		Object.keys(testOptions).forEach((key, index) => {
			const option = screen.getByText(`${key}:`).nextElementSibling;
			console.log(option?.classList);
			if (testOptions[index]) {
				expect(option?.classList.contains(styles.on)).toBeTruthy();
			} else {
				expect(option?.classList.contains(styles.off)).toBeTruthy();
			}
		});
	});
});