type Props = {
  setType: React.Dispatch<React.SetStateAction<string>>;
  type: string;
};

const TIMER_TYPES = {
  pomodoro: "Pomodoro",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const TimerSwitcher = ({ setType, type }: Props) => {
  return (
    <div className="card">
      {Object.keys(TIMER_TYPES).map((buttonType) => {
        return (
          <button
            key={buttonType}
            onClick={() => setType(buttonType)}
            className={type === buttonType ? ".button" : "buttonOutlined"}
          >
            {TIMER_TYPES[buttonType as keyof typeof TIMER_TYPES]}
          </button>
        );
      })}
    </div>
  );
};

export default TimerSwitcher;
