"use client";

import {
	ImageSearchAlt,
	MicrophoneFilled,
	Locked,
	StopFilled,
	Fire,
} from "@carbon/icons-react";
import styles from "./form.module.css";
import { IBM_Plex_Mono } from "@next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
// import MicRecorder from "";
import Router from "next/router";
import { useRouter } from "next/router";
// import { DateTime } from "luxon";
import Image from "next/image";
const MicRecorder = require("mic-recorder-to-mp3");

const inter = IBM_Plex_Mono({
	weight: "100",
	subsets: ["latin"],
});

type Inputs = {
	image: React.FormEvent<HTMLInputElement>;
	transcription: string;
};

export default function Form() {
	// 2 prototype state hooks
	const [recording, setRecording] = useState<boolean>(false);
	const [transcript, setTranscript] = useState<boolean>(false);

	const [uploadedImage, setImage] = useState<string>();
	const [imageName, setImageName] = useState<string>();

	const [timer, setTimer] = useState<boolean>(false);
	const [countdown, setCountdown] = useState<number>(59);

	const [audioBlob, setAudioBlob] = useState(null);
	const [blobURL, setBlobUrl] = useState<string>("");
	const [audioFile, setAudioFile] = useState<any>(null);

	const [isRecording, setIsRecording] = useState<boolean>(false);

	const [isPlaying, setIsPlaying] = useState(false);
	const [transcription, setTranscription] = useState<string>("");
	const [audioURLFromS3, setAudioURL] = useState(null);

	const [recordingTime, setRecordingTime] = useState<number>();

	const recorder = useRef<any>(null); //Recorder

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		//Declares the recorder object and stores it inside of ref
		recorder.current = new MicRecorder({ bitRate: 128 });
	}, []);

	const startRecording = () => {
		// Check if recording isn't blocked by browser
		recorder.current.start().then(() => {
			setIsRecording(true);
		});
	};

	const stopRecording = () => {
		recorder.current
			.stop()
			.getMp3()
			.then(([Buffer, Blob]) => {
				const file = new File(Buffer, "audio.mp3", {
					type: Blob.type,
					lastModified: Date.now(),
				});
				setAudioBlob(Blob);
				const newBlobUrl = URL.createObjectURL(Blob);
				setBlobUrl(newBlobUrl);
				setIsRecording(false);
				setAudioFile(file);
				// console.log(DateTime.fromSeconds(file.lastModified));
				// console.log(new Date(file.lastModified).toString());
				setRecordingTime(file.lastModified);
			});
	};

	const toggle = () => {
		setRecording(!recording);
		setTranscript(!transcript);
		setTimer(!timer);
	};

	useEffect(() => {
		if (timer) {
			if (countdown > 0) {
				setTimeout(() => setCountdown(countdown - 1), 1000);
			} else {
				setCountdown(0);
				setTranscript(true);
			}
		} else {
			setCountdown(59);
			setTimer(false);
		}
	}, [countdown, timer]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (audioBlob) {
			submitVoiceMemo();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audioBlob]);

	const submitVoiceMemo = async () => {
		const response = await fetch("/api/download-audio", {
			method: "POST",
			body: audioBlob,
		});
		const data = await response.json();
		setTranscription(data.DString);
		setAudioURL(data.audioURL);
		// console.log(data.DString);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const uploadPhoto = async (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const file = target.files![0] as File;

		setImage(URL.createObjectURL(file));

		const filename = uuidv4();
		setImageName(filename);

		const fileType = encodeURIComponent(file.type);
		const res = await fetch(
			`/api/upload-url?file=${filename}&fileType=${fileType}`
		);
		const { url, fields } = await res.json();
		const formData = new FormData();

		Object.entries({ ...fields, file }).forEach(([key, value]) => {
			formData.append(key, value as string | Blob);
		});

		const upload = await fetch(url, {
			method: "POST",
			body: formData,
		});

		if (upload.ok) {
			console.log("");
		} else {
			console.error("Upload failed.");
		}
	};

	const handleTextAreaChange = (event: any) => {
		setTranscription(event.target.value);
	};

	const router = useRouter();

	const onSubmit: any = handleSubmit(async (formData) => {
		try {
			const res = await fetch("/api/appendPost", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					audioURLFromS3,
					formData,
					imageName,
					recordingTime,
				}),
			});
			if (res.status === 200) {
				await setTranscription("");
			} else {
				throw new Error(await res.text());
			}
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{uploadedImage && (
				<Image height={100} width={100} src={uploadedImage} alt='' />
			)}

			<label className={styles.imageUploader}>
				<input
					// @ts-ignore
					{...register("image")}
					className={styles.fileInput}
					onChange={uploadPhoto}
					type='file'
					accept='image/png, image/jpeg'
				/>
				<ImageSearchAlt size='24' />
			</label>
			<div
				onClick={isRecording ? stopRecording : startRecording}
				className={styles.microphone}
			>
				{isRecording ? (
					<button className={styles.stopGlow}>
						<StopFilled size='32' />
					</button>
				) : (
					<button className={styles.microphoneButton}>
						<MicrophoneFilled size='32' />
					</button>
				)}
			</div>
			{/* {blobURL && <audio controls src={blobURL} />} */}
			{/* <div className={inter.className}>
				{recording ? (
					<div className={styles.time}>
						{countdown == 0 ? null : "00:"}
						{countdown}
					</div>
				) : (
					<div className={styles.time}>
						00<span className={styles.blinkingColon}>:</span>00
					</div>
				)}
			</div> */}

			{transcription && (
				<>
					<textarea
						value={transcription}
						className={styles.transcript}
						// @ts-ignore
						{...register("transcription", {
							maxLength: 1000,
						})}
						onChange={handleTextAreaChange}
					></textarea>

					<button className={styles.sendBtn} type='submit'>
						<div className={inter.className}>
							<Fire size='24' />
						</div>
					</button>
				</>
			)}

			{/* <div className={styles.lock}>
				<Locked size='16' />
			</div> */}
		</form>
	);
}
