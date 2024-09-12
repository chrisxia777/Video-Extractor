// /src/api/transcribeAudio.ts
import { SpeechClient } from "@google-cloud/speech";
import { protos } from '@google-cloud/speech';

type IRecognitionConfig = protos.google.cloud.speech.v1.IRecognitionConfig

export const transcribeAudio = async (audioBlob: Blob) => {
  const client = new SpeechClient();

  const audioArrayBuffer = await audioBlob.arrayBuffer();
  const audioBase64 = Buffer.from(audioArrayBuffer).toString("base64");
    const iRConfig: IRecognitionConfig = {encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "en-US"};
  const request = {
    audio: { content: audioBase64 },
    config: iRConfig,
  };

  const [response] = await client.recognize(request);
  return response.results?.map(result => result.alternatives && result.alternatives[0].transcript).join("\n");
};
