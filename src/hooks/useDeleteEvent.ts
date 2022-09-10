import { useSetRecoilState } from "recoil";
import { modalActionState } from "state/atom";
import useAddEvent from "./useAddEvent";
import api from "services/api";

const useDeleteEvent = () => {
  const addEvent = useAddEvent();
  const setOpen = useSetRecoilState(modalActionState);

  return async (id: number) => {
    await api.delete(`events/${id}`);
    addEvent.loadEvents();
    setOpen(false);
  };
};

export default useDeleteEvent;
