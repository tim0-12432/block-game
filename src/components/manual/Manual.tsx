
import React, { FC } from "react";
import { OptionsProps } from "../../types";

import styles from "./Manual.module.scss";

interface ManualProps {
	options: OptionsProps
}


const Manual: FC<ManualProps> = ({ options }: ManualProps) => {
	return (
		<div className={ styles.manual }>
			<p><kbd><i className="fas fa-mouse" /></kbd>, <kbd>Space</kbd> or <kbd>Enter</kbd> to place a block</p>
			{
				options.faceCon 
					? <p>or just open your mouth!</p>
					: null
			}
			<p><kbd>R</kbd> to try again or reload the page</p>
		</div>
	);
};

export default Manual;