/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { render } from "@testing-library/react";
import Manual from "../../../components/manual/Manual";
import { I18nextProvider } from "react-i18next";

import i18n from "../../../i18n/test.config";

beforeEach(() => {
	render(
		<I18nextProvider i18n={ i18n }>
			<Manual />
		</I18nextProvider>
	);
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