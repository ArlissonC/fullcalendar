// FullCalendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

// Components
import Modal from "components/Modal";

// Hooks
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useUpdateEvent } from "hooks/useUpdateEvent";

// Atoms
import {
  descriptionState,
  eventsList,
  isEditable,
  modalActionState,
  titleState,
} from "state/atom";

const Calendar = () => {
  const [eventParams, setEventParams] = useState();
  const update = useUpdateEvent();
  const events = useRecoilValue(eventsList);
  const setOpen = useSetRecoilState(modalActionState);
  const setDescription = useSetRecoilState(descriptionState);
  const setTitle = useSetRecoilState(titleState);
  const setIsEdition = useSetRecoilState(isEditable);

  const openModalInclude = (eventInfo: any) => {
    setTitle("");
    setDescription("");
    setEventParams(eventInfo);
    setOpen(true);
    setIsEdition(false);
  };

  const openModalEdit = async (eventInfo: any) => {
    setEventParams(eventInfo);
    setIsEdition(true);
    update.updateModalInputs(eventInfo);
  };

  return (
    <div className="p-4 md:p-16">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="pt-br"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        allDaySlot={false}
        selectable={true}
        eventClick={openModalEdit}
        select={openModalInclude}
        editable={true}
        events={events}
        eventStartEditable={true}
        eventChange={(eventInfo) => update.updateEventDragged(eventInfo)}
        height={800}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
      />
      <Modal eventParams={eventParams} />
    </div>
  );
};
export default Calendar;
