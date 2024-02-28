import { useMemo, useEffect, useState } from "react";

const useAudio = (fileName: string) => {
  const audioUrl = new URL(`../assets/audio/${fileName}.mp3`, import.meta.url)
    .href;
  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return toggle;
};

export default useAudio;
