
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Manual.module.scss";

const Manual: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={ styles.manual }>
			<p><kbd><i className="fas fa-mouse" /></kbd>, <kbd>Space</kbd> { t("manual.placing.or") } <kbd>Enter</kbd> { t("manual.placing.part2") }</p>
			<p><kbd>R</kbd> { t("manual.refresh") }</p>
		</div>
	);
};

export default Manual;