import styles from "./page.module.css";
import Form from "./form/form";
import Posts from "./posts/posts";
import { Noto_Nastaliq_Urdu, IBM_Plex_Sans } from "@next/font/google";

const inter = Noto_Nastaliq_Urdu({
	weight: "700",
});

const interText = IBM_Plex_Sans({
	weight: "400",
});

export default function Home() {
	return (
		<div>
			<div className={styles.container}>
				<main className={styles.main}>
					{/* <div className={styles.mantra}>If you know you know</div> */}
					<div className={styles.mantra}>
						<div className={styles.mantraUrdu}>
							<div className={inter.className}>عشق</div>
						</div>
						<div className={styles.mantraEnglish}>
							<div className={interText.className}>ISHQ x SONAR</div>
						</div>
					</div>

					<div className={styles.content}>
						<div className={styles.form}>
							<Form />
						</div>
						<div className={styles.posts}>
							<Posts />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
