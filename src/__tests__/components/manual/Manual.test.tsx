/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import Manual from "../../../components/manual/Manual";
import styles from "../../../components/manual/Manual.module.scss";

const MANUAL_CONTAINER_CLASS = styles.manual;

beforeEach(() => {
	render(<Manual />);
});

describe("manual", () => {
	test("manual is rendered", () => {
		const container = document.querySelector("div > div");
		expect(container).toBeInTheDocument;
		expect(container).toBeVisible();
	});
	test("manual is readable", () => {
		const container = document.querySelector("div > div");
		const children = container?.childNodes.length;
		expect(children).toBeGreaterThan(0);
		expect(children).toBe(2);
	});
});