module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/src/__mocks__/fileMock.js"
    },
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageReporters: [
        "lcov", "text"
    ],
    testPathIgnorePatterns: [
        "e2e",
        "node_modules"
    ],
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/__mocks__/",
        "!**/*config*",
        "!<rootDir>/node_modules/"
    ]
};