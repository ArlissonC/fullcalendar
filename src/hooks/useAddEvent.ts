import { IEvent } from "interfaces/IEvent";
import { eventsList, modalActionState } from "state/atom";
import { useSetRecoilState } from "recoil";
import api from "services/api";

const useAddEvent = () => {
  const setEventsList = useSetRecoilState(eventsList);
  const setOpen = useSetRecoilState(modalActionState);

  const addEvent = async (event: IEvent) => {
    await api.post("events", event);
    setOpen(false);
    loadEvents();
  };

  const loadEvents = async () => {
    const updatedEvents = await api.get("events");
    setEventsList(updatedEvents.data);
  };

  return {
    addEvent,
    loadEvents,
  };
};

export default useAddEvent;
