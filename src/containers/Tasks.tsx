import Task from "../components/Task";
import AddTask from "../components/AddTask";
import { TaskInterface } from "../../lib/interfaces";
import Statistics from "../components/Statistics";

type Props = {
  allTasks: TaskInterface[];
  addNewTask: (description: string, estimated: number) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: TaskInterface) => void;
  activeTask: TaskInterface | null;
};

const Tasks = ({
  allTasks,
  addNewTask,
  deleteTask,
  setActiveTask,
  activeTask,
}: Props) => {
  return (
    <>
      {allTasks.length ? (
        <div className="card">
          <h1>Tasks:</h1>
          <ul>
            {allTasks.map((eachTask) => (
              <li key={eachTask.id}>
                <Task
                  task={eachTask}
                  deleteTask={deleteTask}
                  setActiveTask={setActiveTask}
                  activeTask={activeTask}
                />
              </li>
            ))}
          </ul>
          <Statistics allTasks={allTasks} />
        </div>
      ) : null}
      <AddTask addNewTask={addNewTask} />
    </>
  );
};

export default Tasks;
