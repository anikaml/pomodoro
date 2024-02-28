import { useState } from "react";

type Props = {
  addNewTask: (description: string, estimated: number) => void;
};

const AddTask = ({ addNewTask }: Props) => {
  const [description, setDescription] = useState("");
  const [estimated, setEstimated] = useState(1);
  const [errorText, setErrorText] = useState("");

  const handleOnClick = () => {
    if (!description) {
      setErrorText("Task description is required");
      return;
    }
    addNewTask(description, estimated);
    setErrorText("");
    setDescription("");
    setEstimated(1);
  };

  return (
    <div className="card">
      <div className="tasksContainer">
        <h2>Add task:</h2>
        <label>Task description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        {errorText && <p className="errorText">{errorText}</p>}
        <label>Est Pomodoros</label>
        <input
          type="number"
          min="1"
          step="1"
          name="estimated"
          value={estimated}
          onChange={(e) => setEstimated(Number(e.target.value))}
        ></input>
      </div>
      <button onClick={handleOnClick}>Add task</button>
    </div>
  );
};

export default AddTask;
