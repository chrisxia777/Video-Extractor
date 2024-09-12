// /src/api/processAudio.ts
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, load } from "../utils/fetchFile";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: "Audio processed successfully!" });
}

export const processAudio = async (videoFile: File) => {
  const ffmpeg = new FFmpeg();
  load(ffmpeg);

  const videoData = await fetchFile(videoFile);
  await ffmpeg.writeFile("input.mp4", videoData);

  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-q:a",
    "0",
    "-map",
    "a",
    "output.mp3",
  ]);

  const audioData = await ffmpeg.readFile("output.mp3");
  return new Blob([audioData], { type: "audio/mpeg" });
};
