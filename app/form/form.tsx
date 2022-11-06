import Image from "next/image";
import { ImageSearchAlt, MicrophoneFilled } from "@carbon/icons-react";
import styles from "./form.module.css";
import { IBM_Plex_Mono } from "@next/font/google";

const inter = IBM_Plex_Mono({
	weight: "100",
});

export default function Form() {
	return (
		<div className={styles.form}>
			<button className={styles.imageSearch}>
				<ImageSearchAlt size='24' />
			</button>
			<div className={styles.microphone}>
				<MicrophoneFilled size='32' />
			</div>
			<div className={inter.className}>
				<div className={styles.time}>00:00</div>
			</div>
		</div>
	);
}
