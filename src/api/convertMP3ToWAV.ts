// /src/api/convertMP3ToWAV.ts
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { load } from "../utils/fetchFile";

export const convertMP3ToWAV = async (audioBlob: Blob) => {
  const ffmpeg = new FFmpeg();
  load(ffmpeg);

  const audioArrayBuffer = await audioBlob.arrayBuffer();
  await ffmpeg.writeFile("input.mp3", new Uint8Array(audioArrayBuffer));

  await ffmpeg.exec(["-i", "input.mp3", "-ar", "16000", "-ac", "1", "output.wav"]);

  const wavData = await ffmpeg.readFile("output.wav");
  return new Blob([wavData], { type: "audio/wav" });
};
