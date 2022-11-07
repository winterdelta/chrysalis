import styles from "./page.module.css";
import Form from "./form/form";
import Posts from "./posts/posts";

export default function Home() {
	return (
		<div>
			<div className={styles.container}>
				<main className={styles.main}>
					{/* <div className={styles.mantra}>If you know you know</div> */}
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
