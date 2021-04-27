/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import Options from "../../../components/options/Options";
import styles from "../../../components/options/Options.module.scss";

let testOptions = {
	a: false,
	b: false,
	c: true
};
function setTestOptions(options: { a: boolean; b: boolean; c: boolean; }) {
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
	test("settings is clickable", () => {
		fireEvent.click(screen.getByText(/settings/i));
	});
});