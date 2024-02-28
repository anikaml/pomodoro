import { getStatistics } from "../helpers";

describe("getStatistics", () => {
  it("Should return object with correct properties", () => {
    const allTasks = [
      {
        description: "",
        estimated: 10,
        completed: 3,
        finished: true,
        id: "123a",
      },
      {
        description: "test",
        estimated: 40,
        completed: 333,
        finished: true,
        id: "123b",
      },
      {
        description: "abc",
        estimated: 4,
        completed: 1,
        finished: false,
        id: "123c",
      },
    ];
    const result = getStatistics(allTasks);
    const expected = {
      completedPomodoros: 337,
      remainingPomodoros: 3,
      tasksCompleted: 2,
      tasksRemaining: 1,
    };
    expect(result).toEqual(expected);
  });
});
