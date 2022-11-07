"use client";

import { PauseFilled, PlayFilledAlt } from "@carbon/icons-react";
import { useState } from "react";
import styles from "./play-btn.module.css";

export default function Play() {
	const [play, setPlay] = useState(true);

	const togglePlay = () => {
		setPlay(!play);
	};

	return (
		<div>
			<button className={styles.button} onClick={togglePlay}>
				{play ? <PlayFilledAlt size='16' /> : <PauseFilled size='16' />}
			</button>
		</div>
	);
}
