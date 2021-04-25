import React, { FC, useEffect, useState } from "react";
import { OptionsProps } from "../../types";

import styles from "./Options.module.scss";

interface Props {
    options: OptionsProps,
    setOptions: any
}

const Options: FC<Props> = ({ options, setOptions }: Props) => {
	const [settings, setSettings] = useState(options);

	useEffect(() => {
		setOptions(settings);
	}, [settings]);
	useEffect(() => {
		setSettings(options);
	}, [options]);

	function toggleOption(key: string) {
		setSettings({
			...settings,
			[key]: !settings[key]
		});
	}

	return (
		<div className={ styles.options }>
			<h2>Settings</h2>
			{
				Object.keys(settings).map((key) => {
					return (
						<p><b>{key}:</b> {settings[key] ? <p className={ styles.on } onClick={ (e) => toggleOption(key) }><i className="far fa-check-square" /></p> : <p className={ styles.off } onClick={ (e) => toggleOption(key) }><i className="far fa-square" /></p>}</p>
					);
				})
			}
		</div>
	);
};

export default Options;