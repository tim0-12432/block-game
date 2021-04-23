import React, { useEffect, useState, FC } from "react";
import { FPSStats } from "fps-react";

import styles from "./App.module.scss";
import Scene from "./components/scene/Scene";

const App: FC = () => {
	const [devEnabled, setDevEnabled] = useState(true);

	useEffect(() => {
		Scene();
	}, []);

	return (
		<>
			{ devEnabled ? <div id={ styles.dev }>
				<FPSStats />
			</div> : null }
			<div id={ styles.app }>
				<div id="count" className={ styles.count }>0</div>
			</div>
		</>
	);
};

export default App;
