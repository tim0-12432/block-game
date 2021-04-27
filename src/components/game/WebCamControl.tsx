import React, { FC, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import { OptionsProps } from "../../types";

import styles from "./WebCamControl.module.scss";
import { URL, MODEL_URL } from "../../constants";

interface WebcamProps {
    options: OptionsProps
}

const URI = URL + MODEL_URL;

const WebCamControl: FC<WebcamProps> = ({ options }: WebcamProps) => {
	const webcamRef = useRef(null);

	const [loaded, setLoaded] = useState<boolean>(false);
	const [infoText, setInfoText] = useState("");

	useEffect(() => {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(URI),
			faceapi.nets.faceLandmark68Net.loadFromUri(URI),
			faceapi.nets.faceRecognitionNet.loadFromUri(URI),
			faceapi.nets.faceExpressionNet.loadFromUri(URI)
		]).then(() => setLoaded(true)).catch((error) => console.error("Failed loading models:", error));
	}, []);
	useEffect(() => {
		const video = document.getElementById("video-stream");
		const media = document.querySelector(`.${ styles.media }`);
		if (video !== null && media !== null) {
			video.addEventListener("play", () => {
				const canvas = faceapi.createCanvasFromMedia(video as HTMLVideoElement);
				media.append(canvas);
				const content = video as HTMLVideoElement;
				const displaySize = { width: content.width, height: content.height };
				faceapi.matchDimensions(canvas, displaySize);
				setInterval(async () => {
					const detections = await faceapi.detectSingleFace(
                        video as faceapi.TNetInput,
                        new faceapi.TinyFaceDetectorOptions()
					).withFaceLandmarks().withFaceExpressions();
					if (detections == undefined) {
						options.dev ? console.error("No face found!") : null;
						setInfoText("No face found!");
					} else {
						setInfoText("");
						const resizedDetections = faceapi.resizeResults(detections, displaySize);
						canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
						faceapi.draw.drawFaceLandmarks(canvas, resizedDetections as faceapi.draw.DrawFaceLandmarksInput);
						const expressions = resizedDetections.expressions;
						const surprised = expressions.surprised > 0.8;
						options.dev ? console.log(surprised) : null;
					}
				}, 100);
			});
		}
	}, [loaded]);

	const videoConstraints = {
		width: 720,
		height: 560,
		facingMode: "environment"
	};

	return (
		<>
			{
				loaded ?
					(<div className={ styles.media }>
						<p className={ styles.info } style={{ display: `${ infoText == "" ? "none" : "block" }` }}>{ infoText }</p>
						<Webcam
							id="video-stream"
							audio={ false }
							ref={ webcamRef }
							width={ 720 }
							height={ 560 }
							videoConstraints={ videoConstraints }
				        />
					</div>)
					: null
			}
		</>
	);
};

export default WebCamControl;