import { Locked, PlayFilledAlt } from "@carbon/icons-react";
import Image from "next/image";
import styles from "./posts.module.css";
import PlayBtn from "./PlayBtn";
import { IBM_Plex_Sans } from "@next/font/google";

const inter = IBM_Plex_Sans({
	weight: "600",
});

const interText = IBM_Plex_Sans({
	weight: "400",
});

export default function Posts() {
	return (
		<div className={styles.posts}>
			<div className={styles.post}>
				<div className={styles.imageContainer}>
					<Image
						className={styles.image}
						style={{ objectFit: "cover" }}
						alt=''
						src='/krewella.jpg'
						// width={250}
						// height={250}
						fill={true}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>
				<div className={styles.playBtn}>
					<PlayBtn />
				</div>
				{/* <div className={styles.lock}>
                    <Locked size='16' />
                </div> */}
				<div className={styles.dateTime}>
					<div className={inter.className}>21:53 5 Nov 2022</div>
				</div>
				<div className={styles.textContainer}>
					<div className={styles.text}>
						<div className={interText.className}>1MIN to go and counting.</div>
					</div>
				</div>
			</div>
			<div className={styles.post}>
				<div className={styles.imageContainer}>
					<Image
						className={styles.image}
						style={{ objectFit: "cover" }}
						alt=''
						src='/krewella.jpg'
						// width={250}
						// height={250}
						fill={true}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>
				<div className={styles.playBtn}>
					<PlayBtn />
				</div>
				{/* <div className={styles.lock}>
                    <Locked size='16' />
                </div> */}
				<div className={styles.dateTime}>
					<div className={inter.className}>21:53 5 Nov 2022</div>
				</div>
				<div className={styles.textContainer}>
					<div className={styles.text}>
						<div className={interText.className}>1MIN to go and counting.</div>
					</div>
				</div>
			</div>
			<div className={styles.post}>
				<div className={styles.imageContainer}>
					<Image
						className={styles.image}
						style={{ objectFit: "cover" }}
						alt=''
						src='/krewella.jpg'
						// width={250}
						// height={250}
						fill={true}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>
				<div className={styles.playBtn}>
					<PlayBtn />
				</div>
				<div className={styles.dateTime}>
					<div className={inter.className}>21:53 5 Nov 2022</div>
				</div>
				<div className={styles.textContainer}>
					<div className={styles.text}>
						<div className={interText.className}>1MIN to go and counting.</div>
					</div>
				</div>
			</div>
		</div>
	);
}
