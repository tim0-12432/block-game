/* eslint-disable no-undef */
import { resourcesDE } from "../../i18n/locales/de";
import { resourcesEN } from "../../i18n/locales/en";
import { resourcesES } from "../../i18n/locales/es";
import { resourcesIT } from "../../i18n/locales/it";

const resources = [
	resourcesEN,
	resourcesDE,
	resourcesES,
	resourcesIT
];

describe("locales", () => {
	test("have the same keys", () => {
		resources.forEach((language) => {
			expect(typeof(language.translation)).toBe(typeof(resources[0].translation));
		});
	});
});