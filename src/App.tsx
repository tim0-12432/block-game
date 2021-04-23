import React, { useEffect, useState, FC } from "react";
import { FPSStats } from "fps-react";

import styles from "./App.module.scss";
import Scene from "./components/game/Scene";

const App: FC = () => {
	const [devEnabled, setDevEnabled] = useState(true);

	useEffect(() => {
		Scene();
	}, []);

	function reloadPage() {
		window.location.reload();
	}

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
		</>
	);
};

export default App;
