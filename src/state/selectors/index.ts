import { selector } from "recoil";
import api from "services/api";

export const eventsAsync = selector({
  key: "eventsAsync",
  get: async () => {
    const response = await api.get("events");

    return response.data;
  },
});
