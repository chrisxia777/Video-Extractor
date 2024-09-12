// /src/api/processImages.ts
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, load } from "../utils/fetchFile";

export const processImages = async (videoFile: File) => {
  const ffmpeg = new FFmpeg();
  load(ffmpeg);

  const videoData = await fetchFile(videoFile);
  await ffmpeg.writeFile("input.mp4", videoData);

  await ffmpeg.exec(["-i", "input.mp4", "-vf", "fps=1", "frame_%04d.png"]);

  const images = [];
  for (let i = 1; i <= 10; i++) {
    const frameFileName = `frame_${String(i).padStart(4, "0")}.png`;
    try {
      const frameData = await ffmpeg.readFile(frameFileName);
      images.push(new Blob([frameData], { type: "image/png" }));
    } catch {
      break;
    }
  }
  return images;
};
