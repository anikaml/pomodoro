import { createContext } from "react";
import { SettingsInterface } from "./interfaces";

export const SettingsContext = createContext<Partial<SettingsInterface>>({});
