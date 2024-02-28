import { TaskInterface } from "../../lib/interfaces";

type Props = {
  task: TaskInterface;
  deleteTask: (id: string) => void;
  setActiveTask: (task: TaskInterface) => void;
  activeTask: TaskInterface | null;
};

const Task = ({ task, deleteTask, setActiveTask, activeTask }: Props) => {
  return (
    <div
      className="task"
      style={{
        border:
          activeTask && activeTask.id === task.id
            ? "4px solid #f13346"
            : "1px solid lightgray",
      }}
    >
      <div className="taskDetails" onClick={() => setActiveTask(task)}>
        <p style={{ textDecoration: task.finished ? "line-through" : "none" }}>
          {task.description}
        </p>
        <p>
          {task.completed}/{task.estimated}
        </p>
      </div>
      <button onClick={() => deleteTask(task.id)} className="deleteButton">
        X
      </button>
    </div>
  );
};

export default Task;
