"use client";

import {
	ImageSearchAlt,
	MicrophoneFilled,
	Locked,
	StopFilled,
	Fire
} from "@carbon/icons-react";
import styles from "./form.module.css";
import { IBM_Plex_Mono } from "@next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const inter = IBM_Plex_Mono({
	weight: "100",
});

type Inputs = {
	example: string;
	imageRequired: React.FormEvent<HTMLInputElement>;
	transcript: string;
};

export default function Form() {
	const [recording, setRecording] = useState<boolean>(false);
	const [transcript, setTranscript] = useState<boolean>(false);

	const [uploadedImage, setImage] = useState<string>();
	const [imageName, setImageName] = useState<string>();

	const [timer, setTimer] = useState<boolean>(false);
	const [countdown, setCountdown] = useState<number>(59);

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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
			console.log("FILE UPLOADED");
		} else {
			console.error("Upload failed.");
		}
	};

	// console.log(watch("imageRequired")); // watch input value by passing the name of it

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<label className={styles.imageUploader}>
				<input
					// @ts-ignore
					{...register("imageRequired", { required: true })}
					className={styles.fileInput}
					onChange={uploadPhoto}
					type='file'
					accept='image/png, image/jpeg'
				/>
				<ImageSearchAlt size='24' />
			</label>
			<button onClick={toggle} className={styles.microphone}>
				{recording ? (
					<span className={styles.stopGlow}>
						<StopFilled size='32' />
					</span>
				) : (
					<MicrophoneFilled size='32' />
				)}
			</button>
			<div className={inter.className}>
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
			</div>
			{transcript && (
				<>
					<textarea
						// value={transcription}
						className={styles.transcript}
						// @ts-ignore
						{...register("transcript", {
							required: true,
							maxLength: 1000,
						})}
						// onChange={handleTextAreaChange}
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
