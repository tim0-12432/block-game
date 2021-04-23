import React, { useEffect, useState, FC } from "react";
import { FPSStats } from "fps-react";

import styles from "./App.module.scss";
import Scene from "./components/game/Scene";
import Manual from "./components/manual/Manual";

const App: FC = () => {
	const [devEnabled, setDevEnabled] = useState(false);
  const [manualEnabled, setManualEnabled] = useState(true);

	useEffect(() => {
		Scene();
	}, []);

	function reloadPage() {
		window.location.reload();
	}

	window.addEventListener("keyup", (e) => {
		if (e.code == "KeyR") {
			reloadPage();
		}
	});

	return (
		<>
			{ devEnabled ? <div id={ styles.dev }>
				<FPSStats />
			</div> : null }
			<div id={ styles.app }>
				<div id="count" className={ styles.count }>0</div>
				<div id="gameOverScreen" className={ styles.gameOver }>
					<h1>Game Over!</h1>
					<h2>You reached <span id="gm-count">0</span> Points!</h2>
					<button onClick={(e) => reloadPage()}>Try again!</button>
				</div>
			</div>
      { manualEnabled ? <div id={ styles.manual }>
				<Manual />
			</div> : null }
		</>
	);
};

export default App;
