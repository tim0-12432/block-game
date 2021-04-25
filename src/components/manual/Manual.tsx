
import React, { FC } from "react";

import styles from "./Manual.module.scss";

const Manual: FC = () => {
	return (
		<div className={ styles.manual }>
			<p><kbd><i className="fas fa-mouse" /></kbd>, <kbd>Space</kbd> or <kbd>Enter</kbd> to place a block</p>
			<p><kbd>R</kbd> to try again or reload the page</p>
		</div>
	);
};

export default Manual;