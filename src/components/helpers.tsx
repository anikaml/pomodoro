import { TaskInterface } from "../../lib/interfaces";
import { MIN_IN_MS, SEC_IN_MS } from "../../lib/constants";

type TTimer = {
  minutes: string;
  seconds: string;
};

export const getStatistics = (allTasks: TaskInterface[]) => {
  return allTasks.reduce(
    (acc, task) => {
      if (task.finished) {
        acc.tasksCompleted += 1;
      } else {
        acc.tasksRemaining += 1;
        acc.remainingPomodoros += task.estimated - task.completed;
      }
      acc.completedPomodoros += task.completed;
      return acc;
    },
    {
      tasksRemaining: 0,
      tasksCompleted: 0,
      completedPomodoros: 0,
      remainingPomodoros: 0,
    },
  );
};

export const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const getTimeDiff = (diffInMSec: number): TTimer => {
  let diff = diffInMSec;
  const minutes = Math.floor(diff / MIN_IN_MS); // Give remaining minutes
  diff -= minutes * MIN_IN_MS; // Subtract minutes
  const seconds = Math.floor(diff / SEC_IN_MS); // Give remaining seconds

  return {
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};
