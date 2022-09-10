import { descriptionState, modalActionState, titleState } from "state/atom";
import { useSetRecoilState } from "recoil";
import useAddEvent from "./useAddEvent";
import api from "services/api";

export const useUpdateEvent = () => {
  const setOpen = useSetRecoilState(modalActionState);
  const setTitle = useSetRecoilState(titleState);
  const setDescription = useSetRecoilState(descriptionState);
  const addEvent = useAddEvent();

  const updateModalInputs = async (eventInfo: any) => {
    const response = await api.get(`events/${eventInfo.event.id}`);
    const { title, description } = response.data;
    setTitle(title);
    setDescription(description);
    setOpen(true);
  };

  const updateEvent = async (data: any, id: number) => {
    await api.put(`events/${id}`, data);
    setOpen(false);
    addEvent.loadEvents();
  };

  const updateEventDragged = async (eventInfo: any) => {
    const { title, startStr, id } = eventInfo.event;
    const data = {
      title,
      description: eventInfo.event.extendedProps.description,
      start: startStr,
    };

    await api.put(`events/${id}`, data);
    addEvent.loadEvents();
  };

  return {
    updateModalInputs,
    updateEvent,
    updateEventDragged,
  };
};
