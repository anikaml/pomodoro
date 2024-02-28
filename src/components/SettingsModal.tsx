import Modal from "react-modal";
import { SettingsInterface } from "../../lib/interfaces";
import { MIN_TIME_LENGTH, MAX_TIME_LENGTH } from "../../lib/constants";
import SelectMusic from "./SelectMusic";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 4,
    backdropFilter: "blur(4px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255)",
    color: "rgb(30, 30, 30)",
    width: 300,
    borderRadius: "25px",
  },
};

Modal.setAppElement("#root");

type Props = {
  modalIsOpen: boolean;
  closeModal: () => void;
  settings: SettingsInterface;
  setSettings: React.Dispatch<React.SetStateAction<SettingsInterface>>;
};

const SettingsModal = ({
  modalIsOpen,
  closeModal,
  settings,
  setSettings,
}: Props) => {
  customStyles.overlay.backgroundColor = settings.darkMode
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.2)";
  customStyles.content.backgroundColor = settings.darkMode
    ? "rgb(30, 30, 30)"
    : "rgba(255, 255, 255)";
  customStyles.content.color = settings.darkMode ? "white" : "black";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value;
    if (e.target.name === "darkMode") {
      value = e.target.checked;
    } else {
      value = Number(e.target.value);
    }
    setSettings({ ...settings, [e.target.name]: value });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Settings Modal"
    >
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button onClick={closeModal}>close</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Pomodoro</label>
        <input
          type="number"
          min={MIN_TIME_LENGTH}
          max={MAX_TIME_LENGTH}
          step="1"
          value={settings.pomodoroValue}
          name="pomodoroValue"
          onChange={handleOnChangeInput}
        />
        <label>Short Break</label>
        <input
          type="number"
          min={MIN_TIME_LENGTH}
          max={MAX_TIME_LENGTH}
          step="1"
          value={settings.shortBreakValue}
          name="shortBreakValue"
          onChange={handleOnChangeInput}
        />
        <label>Long Break</label>
        <input
          type="number"
          min={MIN_TIME_LENGTH}
          max={MAX_TIME_LENGTH}
          step="1"
          value={settings.longBreakValue}
          name="longBreakValue"
          onChange={handleOnChangeInput}
        />
        <label>Dark Mode</label>
        <input
          type="checkbox"
          checked={settings.darkMode}
          name="darkMode"
          onChange={handleOnChangeInput}
          style={{ width: "auto" }}
        />
        <SelectMusic
          handleOnChange={handleOnChangeSelect}
          value={settings.music}
        />
      </form>
    </Modal>
  );
};

export default SettingsModal;
