import React, { FC, useState } from "react";
import { OptionsProps } from "../../types";

import styles from "./Options.module.scss";

interface Props {
    options: OptionsProps,
    setOptions: any
}

const Options: FC<Props> = ({ options, setOptions }: Props) => {
	const [open, setOpen] = useState(false);

	function toggleOption(key: string) {
		setOptions({
			...options,
			[key]: !options[key]
		});
	}

	return (
		<div className={ styles.options }>
			<h2 onClick={ (e) => setOpen(!open) } style={open ? {border: "2px solid transparent"} : {border: "2px solid white"}}>Settings</h2>
			{
				open
					? Object.keys(options).map((key) => {
						return (
							<p key={ key }><b>{ key }:</b> { options[key] ? <span className={ styles.on } onClick={ (e) => toggleOption(key) }><i className="far fa-check-square" /></span> : <span className={ styles.off } onClick={ (e) => toggleOption(key) }><i className="far fa-square" /></span> }</p>
						);
					})
					: null
			}
		</div>
	);
};

export default Options;