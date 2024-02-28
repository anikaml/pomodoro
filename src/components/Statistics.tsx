import { TaskInterface } from "../../lib/interfaces";
import { getStatistics } from "./helpers";

type Props = {
  allTasks: TaskInterface[];
};

const Statistics = ({ allTasks }: Props) => {
  const stats = getStatistics(allTasks);

  return (
    <>
      <h2>Stats:</h2>
      <ul>
        <li>Remaining tasks: {stats.tasksRemaining}</li>
        <li>Completed tasks: {stats.tasksCompleted}</li>
        <li>Remaining pomodoros: {stats.remainingPomodoros}</li>
        <li>Completed pomodoros: {stats.completedPomodoros}</li>
      </ul>
    </>
  );
};

export default Statistics;
