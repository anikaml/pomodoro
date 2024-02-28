import { AvailableSounds } from "../../lib/interfaces";
import useAudio from "../hooks/useAudio";

type Props = {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

const SelectMusic = ({ handleOnChange, value }: Props) => {
  const toggleAudio = useAudio(value);

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toggleAudio();
    handleOnChange(e);
  };

  return (
    <>
      <label>Select music:</label>
      <select
        name="music"
        id="music-select"
        onChange={handleOnChangeSelect}
        value={value}
      >
        {Object.entries(AvailableSounds).map(([key, val]) => {
          return (
            <option value={key} key={key}>
              {val}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectMusic;
