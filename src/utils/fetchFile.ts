import { FFmpeg } from "@ffmpeg/ffmpeg";
export const fetchFile = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsArrayBuffer(file);
  });
};

export const load = async (ffmpeg: FFmpeg) => {
  const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
  await ffmpeg.load({
    coreURL: `${baseURL}/ffmpeg-core.js`,
    wasmURL: `${baseURL}/ffmpeg-core.wasm`,
    workerURL: `${baseURL}/ffmpeg-core.worker.js`,
  });
};
