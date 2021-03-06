import React, { useEffect, useState, FC } from "react";
import { FPSStats } from "fps-react";

import styles from "./App.module.scss";
import Scene from "./components/game/Scene";
import Manual from "./components/manual/Manual";
import Options from "./components/options/Options";
import { OptionsProps } from "./types";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage, saveToLocalStorage } from "./storage";

const App: FC = () => {
	const OPTION_KEY = "little-block-game.options";
	const [options, setOptions] = useState<OptionsProps>(
		{
			dev: false,
			manual: false
		}
	);
	const { t } = useTranslation();

	useEffect(() => {
		const setDefaultSettings = async () => {
			await setOptions(getOptions());
			Scene();
		};
		setDefaultSettings();
	}, []);

	useEffect(() => {
		saveOptions();
	}, [options]);

	function reloadPage() {
		window.location.reload();
	}

	function saveOptions() {
		saveToLocalStorage(OPTION_KEY, options);
	}
	function getOptions() {
		const stored = getFromLocalStorage(OPTION_KEY);
		if (stored.failed) {
			saveOptions();
			return options;
		} else {
			return stored;
		}
	}

	window.addEventListener("keyup", (e) => {
		if (e.code == "KeyR") {
			reloadPage();
		}
	});

	return (
		<>
			{ options.dev ? <div id={ styles.dev }>
				<FPSStats />
			</div> : null }
			<div id={ styles.app }>
				<div id="count" className={ styles.count }>0</div>
				<div id="gameOverScreen" className={ styles.gameOver }>
					<h1>Game Over!</h1>
					<h2>{ t("gameover.reachedPoints.part1") }<span id="gm-count">0</span>{ t("gameover.reachedPoints.part2") }</h2>
					<button onClick={(e) => reloadPage()}>{ t("gameover.again") }</button>
					<Options options={ options } setOptions={ setOptions } />
				</div>
			</div>
			{ options.manual ? <div id={ styles.manual }>
				<Manual />
			</div> : null }
		</>
	);
};

export default App;
