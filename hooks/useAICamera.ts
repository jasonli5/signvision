import {
  DrawingUtils,
  FilesetResolver,
  GestureRecognizer,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

export const useAICamera = (on: boolean, model: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);

  useEffect(() => {
    let gestureRecognizer: GestureRecognizer;

    const initializeHandDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks("/wasm");

        gestureRecognizer = await GestureRecognizer.createFromModelPath(
          vision,
          `/models/gesture_recognizer_${model}.task`
        );

        await gestureRecognizer.setOptions({
          runningMode: "VIDEO",
          numHands: 2,
          baseOptions: {
            delegate: "GPU",
          },
        });

        detectHands();
      } catch (error) {
        console.error("Error initializing hand detection:", error);
      }
    };

    const detectHands = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const detections = gestureRecognizer.recognizeForVideo(
          videoRef.current,
          new Date().getTime()
        );

        if (detections.gestures.length > 0) {
          console.log(
            detections.gestures[0][0].categoryName,
            detections.gestures[0][0].score
          );
          setLabel(detections.gestures[0][0].categoryName);
          setConfidence(detections.gestures[0][0].score);
        }

        if (detections.landmarks) {
          drawCanvasOverlays(detections.landmarks);
        }
      }

      window.requestAnimationFrame(detectHands);
    };

    const drawCanvasOverlays = (landmarksArray: NormalizedLandmark[][]) => {
      const canvas = canvasRef.current;
      if (!canvas || !videoRef.current) return;
      canvas.width = videoRef.current?.videoWidth || 0;
      canvas.height = videoRef.current?.videoHeight || 0;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawingUtils = new DrawingUtils(ctx);

      landmarksArray.forEach((landmarks) => {
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#FF0000",
            lineWidth: 2,
          }
        );
      });
      ctx.restore();
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        await initializeHandDetection();
      } catch (error) {
        console.error("Error starting camera:", error);
      }
    };

    if (on) {
      startCamera();
    }
  }, [on]);

  return { label, confidence, videoRef, canvasRef };
};

export default useAICamera;
