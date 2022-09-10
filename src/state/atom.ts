import { IEvent } from "./../interfaces/IEvent";
import { atom } from "recoil";
import { eventsAsync } from "./selectors";

export const eventsList = atom<IEvent[]>({
  key: "eventsList",
  default: eventsAsync,
});

export const modalActionState = atom<boolean>({
  key: "modalActionState",
  default: false,
});

export const titleState = atom<string>({
  key: "titleState",
  default: "",
});

export const descriptionState = atom<string>({
  key: "descriptionState",
  default: "",
});

export const isEditable = atom<boolean>({
  key: "isEditable",
  default: false,
});
