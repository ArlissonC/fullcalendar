import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// Hooks
import useAddEvent from "hooks/useAddEvent";
import { useUpdateEvent } from "hooks/useUpdateEvent";
import { useRecoilValue, useSetRecoilState } from "recoil";

// Atoms
import {
  descriptionState,
  isEditable,
  modalActionState,
  titleState,
} from "state/atom";
import useDeleteEvent from "hooks/useDeleteEvent";
import uuid from "react-uuid";

const Modal = ({ eventParams }: any) => {
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const open = useRecoilValue(modalActionState);
  const setOpen = useSetRecoilState(modalActionState);
  const title = useRecoilValue(titleState);
  const setTitle = useSetRecoilState(titleState);
  const description = useRecoilValue(descriptionState);
  const setDescription = useSetRecoilState(descriptionState);
  const isEdition = useRecoilValue(isEditable);

  const disabledButton = title.length < 1;

  const handleSubmit = () => {
    const event = {
      id: String(uuid()),
      title: title,
      description: description,
      start: eventParams.startStr,
    };

    addEvent.addEvent(event);
  };

  const handleEdit = () => {
    const data = {
      title,
      description,
      start: eventParams.event.startStr,
    };

    updateEvent.updateEvent(data, eventParams.event.id);
  };

  const handleDelete = () => {
    deleteEvent(eventParams.event.id);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Cadastrar Evento
                    </Dialog.Title>
                    <div className="mt-5 flex flex-col space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label>
                          Título <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="p-2 rounded-lg bg-slate-300 placeholder:text-slate-500 outline-none"
                          type="text"
                          placeholder="Título do evento"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label>Descrição</label>
                        <input
                          className="p-2 rounded-lg bg-slate-300 placeholder:text-slate-500 outline-none"
                          type="text"
                          placeholder="Descrição do evento"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {!isEdition && (
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={handleSubmit}
                      disabled={disabledButton}
                    >
                      Adicionar evento
                    </button>
                  )}
                  {isEdition && (
                    <>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                        onClick={handleEdit}
                      >
                        Editar evento
                      </button>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm mt-2"
                        onClick={handleDelete}
                      >
                        Excluir evento
                      </button>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
