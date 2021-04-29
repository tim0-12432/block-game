/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Options from "../../../components/options/Options";
import styles from "../../../components/options/Options.module.scss";
import { I18nextProvider } from "react-i18next";

import i18n from "../../../i18n/test.config";

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
	render(
		<I18nextProvider i18n={ i18n }>
			<Options options={ testOptions } setOptions={ setTestOptions } />
		</I18nextProvider>
	);
});

describe("options", () => {
	test("settings are rendered", () => {
		const container = document.getElementById(SETTINGS_CONTAINER_ID);
		expect(container).toBeInTheDocument;
		expect(screen.getByText(/gameover.settings/i)).toBeVisible();
	});
	test("options are not visible", () => {
		Object.keys(testOptions).forEach((key) => {
			expect(() => { return screen.getByText(`gameover.options.${key}:`); })
				.toThrow(`Unable to find an element with the text: gameover.options.${key}:. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`);
		});
	});
	test("settings is clickable", () => {
		fireEvent.click(screen.getByText(/gameover.settings/i));
	});
	test("options are visible", () => {
		fireEvent.click(screen.getByText(/gameover.settings/i));
		Object.keys(testOptions).forEach((key) => {
			const option = screen.getByText(`gameover.options.${key}:`);
			expect(option).toBeInTheDocument();
			expect(option).toBeVisible();
		});
	});
	/*
	// difficult to test => color, class //
	test("options have the right checkbox", () => {
		fireEvent.click(screen.getByText(/settings/i));
		Object.keys(testOptions).forEach((key, index) => {
			const option = screen.getByText(`${key}:`).nextElementSibling;
			console.log(option);

			if (testOptions[index]) {
				expect(option).toHaveStyle("color: rgb(79, 255, 79)");
			} else {
				expect(option).toHaveStyle("color: rgb(255, 34, 34)");
			}
		});
	});*/
});