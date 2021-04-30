// @types/react-i18next/index.d.ts
import "react-i18next";
import resourcesEN from "../../src/i18n/locales/en";

declare module "react-i18next" {
  type DefaultResources = typeof resourcesEN;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Resources extends DefaultResources {}
}