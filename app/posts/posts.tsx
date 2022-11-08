"use client";

import Image from "next/image";
import styles from "./posts.module.css";
import PlayBtn from "./play-btn";
import { IBM_Plex_Sans } from "@next/font/google";
import { useRef, useState, useEffect } from "react";
import { PlayFilledAlt, PauseFilled } from "@carbon/icons-react";
import useSWR from "swr";

const fetcher = async (
	input: RequestInfo,
	init: RequestInit,
	...args: any[]
) => {
	const res = await fetch(input, init);
	return res.json();
};

const inter = IBM_Plex_Sans({
	weight: "600",
	subsets: ["latin"],
});

const interText = IBM_Plex_Sans({
	weight: "400",
	subsets: ["latin"],
});

export default function Posts() {
	const [playing, setPlaying] = useState<boolean>(false);

	const audioPlayer = useRef<any>(null);

	const [trackPlaying, setTrackPlaying] = useState<string>("");

	const { data } = useSWR("/api/posts", fetcher);

	useEffect(() => {
		if (playing) {
			audioPlayer.current.play();
		} else {
			audioPlayer.current.pause();
		}
	}, [playing, trackPlaying, audioPlayer]);

	return (
		<div className={styles.posts}>
			{/* {data
				? data.map((d: any, index: any) => (
						<div key={index}>{d.data.datetime}</div>
				  ))
				: null} */}

			{/* {!data ? <div>loading...</div> : <div>DATA LOADED</div>} */}

			{data
				? data?.map((d: any, index: any) => (
						<div
							// style={{backgroundImage: `url("${d.data.image}")`,}}
							className={styles.post}
							key={index}
						>
							{/* <div className={styles.frostedLayer}> */}
							<div
								style={{ backgroundImage: `url("${d.data?.image}")` }}
								className={styles.imageContainer}
							>
								{/* <Image
									className={styles.image}
									style={{ objectFit: "cover" }}
									alt=''
									src={`/${d.data?.image}`}
									fill={true}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/> */}
							</div>
							<div className={styles.playBtn}>
								{playing && trackPlaying === d.data?.audio ? (
									<button
										className={styles.button}
										onClick={() => {
											setPlaying(false);
										}}
									>
										<PauseFilled size='16' />
									</button>
								) : (
									<button
										className={styles.button}
										onClick={() => {
											setTrackPlaying(d.data?.audio);
											setPlaying(true);
										}}
									>
										<PlayFilledAlt size='16' />
									</button>
								)}
							</div>
							<div className={styles.dateTime}>
								<div className={inter.className}>
									{new Date(d.data?.datetime).toString()}
								</div>
							</div>
							<div className={styles.textContainer}>
								<div className={styles.text}>
									<div className={interText.className}>
										{d.data?.transcript}
									</div>
								</div>
							</div>
							{/* </div> */}
						</div>
				  ))
				: null}
			<div
				// style={{backgroundImage: `url("/cat.png")`,}}
				className={styles.post}
			>
				{/* <div className={styles.frostedLayer}> */}
				<div className={styles.imageContainer}>
					<Image
						className={styles.image}
						style={{ objectFit: "cover" }}
						alt=''
						src='/cat.png'
						// width={250}
						// height={250}
						fill={true}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>
				<div className={styles.playBtn}>
					{/* <PlayBtn trackName={trackPlaying} /> */}
					{playing &&
					trackPlaying ===
						"http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3" ? (
						<button
							className={styles.button}
							onClick={() => {
								setPlaying(false);
							}}
						>
							<PauseFilled size='16' />
						</button>
					) : (
						<button
							className={styles.button}
							onClick={() => {
								setTrackPlaying(
									"http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
								);
								setPlaying(true);
							}}
						>
							<PlayFilledAlt size='16' />
						</button>
					)}
				</div>
				<div className={styles.dateTime}>
					<div className={inter.className}>21:53 5 Nov 2022</div>
				</div>
				<div className={styles.textContainer}>
					<div className={styles.text}>
						<div className={interText.className}>1MIN to go and counting.</div>
					</div>
				</div>
				{/* </div> */}
			</div>
			<audio
				// onLoadedMetadata={onLoadedMetadata}
				// preload='auto'
				ref={audioPlayer}
				src={trackPlaying}
				// onEnded={playNextTrack}
			/>
		</div>
	);
}
