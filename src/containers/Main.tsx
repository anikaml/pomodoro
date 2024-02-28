import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import TimerSwitcher from "../components/TimerSwitcher";
import Timer from "../components/Timer";
import { SettingsContext } from "../../lib/contextLib";
import { SettingsInterface, TaskInterface } from "../../lib/interfaces";
import SettingsModal from "../components/SettingsModal";
import {
  deleteDBData,
  getDBData,
  initDB,
  saveDBData,
  Stores,
} from "../../lib/db";
import Tasks from "./Tasks";

const Main = () => {
  const [type, setType] = useState<string>("pomodoro");
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsInterface>({
    pomodoroValue: 25,
    shortBreakValue: 5,
    longBreakValue: 10,
    darkMode: false,
    music: "level_up",
  });
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);
  const [activeTask, setActiveTask] = useState<TaskInterface | null>(null);

  const getSettingsFromDB = async () => {
    await initDB();
    const settingsRes: SettingsInterface = await getDBData(
      Stores.Config,
      "appSettings",
    );
    if (settingsRes) {
      setSettings(settingsRes);
    }
    const tasksRes: TaskInterface[] = await getDBData(Stores.Tasks);
    setAllTasks(tasksRes);
    if (tasksRes.length) {
      setActiveTask(tasksRes[0]);
    }
    setDbLoaded(true);
  };

  useEffect(() => {
    getSettingsFromDB();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    saveDBData(Stores.Config, "appSettings", settings);
    setModalIsOpen(false);
  };

  const addNewTask = (description: string, estimated: number) => {
    const taskId = uuid();
    const newTask: TaskInterface = {
      description,
      estimated,
      completed: 0,
      finished: false,
      id: taskId,
    };
    setAllTasks([...allTasks, newTask]);
    saveDBData(Stores.Tasks, taskId, newTask);
    if (!activeTask) {
      setActiveTask(newTask);
    }
  };

  const deleteTask = (id: string) => {
    const filteredTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(filteredTasks);
    deleteDBData(Stores.Tasks, id);
    setActiveTask(filteredTasks[0] || null);
  };

  const updateTaskCounter = () => {
    if (!activeTask) {
      return;
    }
    activeTask.completed += 1;
    if (activeTask.completed >= activeTask.estimated) {
      activeTask.finished = true;
    }
    saveDBData(Stores.Tasks, activeTask.id, activeTask);
  };

  const onTimerFinish = () => {
    if (type === "pomodoro") {
      updateTaskCounter();
      setType("shortBreak");
    } else {
      setType("pomodoro");
    }
  };

  const loading = <div>LOADING</div>;

  return dbLoaded ? (
    <SettingsContext.Provider value={settings}>
      <button onClick={openModal} className="settingsButton">
        Settings
      </button>
      <div className="main" data-theme={settings.darkMode}>
        <SettingsModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          settings={settings}
          setSettings={setSettings}
        />
        <div className="card">
          <TimerSwitcher setType={setType} type={type} />
          <Timer
            type={type}
            onTimerFinish={onTimerFinish}
            shouldBeDisabled={!activeTask}
          />
          {activeTask && <h2>Current task: {activeTask.description}</h2>}
        </div>
        <Tasks
          allTasks={allTasks}
          addNewTask={addNewTask}
          deleteTask={deleteTask}
          setActiveTask={setActiveTask}
          activeTask={activeTask}
        />
      </div>
    </SettingsContext.Provider>
  ) : (
    loading
  );
};

export default Main;
