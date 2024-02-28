export interface SettingsInterface {
  pomodoroValue: number;
  shortBreakValue: number;
  longBreakValue: number;
  darkMode: boolean;
  music: string;
}

export interface TaskInterface {
  description: string;
  estimated: number;
  completed: number;
  finished: boolean;
  id: string;
}

export enum AvailableSounds {
  level_up = "Level Up",
  record_rewind = "Record Rewind",
  water_drop = "Water Drop",
}
