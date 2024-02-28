import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../lib/contextLib";
import { AvailableSounds } from "../../lib/interfaces";
import useAudio from "../hooks/useAudio";
import { MIN_IN_MS } from "../../lib/constants";
import { getTimeDiff } from "./helpers";

type Props = {
  type: string;
  onTimerFinish: () => void;
  shouldBeDisabled: boolean;
};

const Timer = ({ type, onTimerFinish, shouldBeDisabled }: Props) => {
  const settings = useContext(SettingsContext);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const selectedType = `${type}Value`;
  const selectedTime =
    Number(settings[selectedType as keyof typeof settings]) || 25;
  const maxTimeLeft = selectedTime * MIN_IN_MS;
  const toggleAudio = useAudio(settings.music || AvailableSounds.level_up);

  useEffect(() => {
    //restart timers on type change
    setTimeLeft(maxTimeLeft);
    setStarted(false);
  }, [maxTimeLeft, settings]);

  const toggleTimer = () => {
    setStarted(!started);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (started) {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 200);
        } else {
          toggleAudio();
          onTimerFinish();
          clearInterval(interval);
        }
      }
    }, 200);
    return () => clearInterval(interval);
  }, [started, timeLeft, onTimerFinish, toggleAudio]);

  const diff = getTimeDiff(timeLeft);

  return (
    <>
      <h1 className="time">
        {diff.minutes}:{diff.seconds}
      </h1>
      <progress value={maxTimeLeft - timeLeft} max={maxTimeLeft} />
      <div style={{ marginTop: "0.5em" }}>
        <button onClick={toggleTimer} disabled={shouldBeDisabled}>
          {started ? "Pause" : "Start"}
        </button>
      </div>
    </>
  );
};

export default Timer;
