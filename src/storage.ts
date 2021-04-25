export const saveToLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage: any = (key: string) => {
	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, JSON.stringify({}));
		return {failed: true};
	} else {
		return JSON.parse(localStorage.getItem(key) || "{}");
	}
};