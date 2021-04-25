import React, { FC, useEffect, useState } from "react";
import { OptionsProps } from "../../types";

import styles from "./Options.module.scss";

interface Props {
    options: OptionsProps,
    setOptions: any
}

const Options: FC<Props> = ({ options, setOptions }: Props) => {

	function toggleOption(key: string) {
		setOptions({
			...options,
			[key]: !options[key]
		});
	}

	return (
		<div className={ styles.options }>
			<h2>Settings</h2>
			{
				Object.keys(options).map((key) => {
					return (
						<p key={ key }><b>{ key }:</b> { options[key] ? <span className={ styles.on } onClick={ (e) => toggleOption(key) }><i className="far fa-check-square" /></span> : <span className={ styles.off } onClick={ (e) => toggleOption(key) }><i className="far fa-square" /></span> }</p>
					);
				})
			}
		</div>
	);
};

export default Options;