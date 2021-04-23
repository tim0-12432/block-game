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
				
			</div>
		</>
	);
};

export default App;
