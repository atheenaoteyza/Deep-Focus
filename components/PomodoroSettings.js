import TomatoSVG from "@/assets/Tomato";
import { useEffect, useRef, useState } from "react";

export default function PomodoroSettings({ state, dispatch }) {
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);
  const iconRef = useRef(null);

  function handleSubmitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSettings = {
      workDuration: Number(formData.get("workDuration")),
      shortBreak: Number(formData.get("shortBreak")),
      longBreak: Number(formData.get("longBreak")),
      intervalsBeforeLong: Number(formData.get("intervalsBeforeLong")),
    };
    dispatch({
      type: "BULK_UPDATE_SETTINGS",
      payload: newSettings,
    });
    dispatch({ type: "RESET" });
    setModal(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modal &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  return (
    <>
      {/* Trigger */}
      {/* TRIGGER: The transition happens HERE */}
      <div
        ref={iconRef}
        onClick={() => setModal((prev) => !prev)}
        className={`cursor-pointer bg-[rgba(20,20,20,0.7)] hover:bg-[rgba(20,20,20,1)] 
    transition-all duration-500 ease-in-out flex items-center justify-center
    ${
      state.isPomodoroOn
        ? "max-w-[100px] opacity-100 scale-100 p-3 border border-gray-600 rounded-2xl"
        : "max-w-0 opacity-0 scale-50 pointer-events-none p-0 border-0 m-0 overflow-hidden"
    }`}
      >
        {/* Add min-width to the icon so it doesn't squish during the slide */}
        <div className="min-w-[32px] flex items-center justify-center">
          <TomatoSVG className="h-8 w-8" />
        </div>
      </div>
      {/* MODAL: Stays fixed and outside the transition div */}
      {modal && (
        <section
          ref={modalRef}
          className="fixed left-1/2 top-1/2 z-[9999] max-h-[90vh] w-[90vw] sm:w-[450px] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2
             p-6 border border-gray-600 rounded-2xl 
             bg-[rgba(15,15,15,0.98)] shadow-2xl backdrop-blur-lg text-white"
        >
          <h1 className="font-bold text-xl text-center">
            Pomodoro Timer Settings
          </h1>
          <h2 className="text-center">
            Customize your Pomodoro timer intervals
          </h2>
          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col m-2 items-center"
          >
            <label>Work Duration</label>
            <input
              name="workDuration"
              className="border border-gray-600 mb-[1rem]"
              type="number"
              placeholder="15"
              defaultValue={state.settings.workDuration}
            />

            <label>Short Break</label>
            <input
              name="shortBreak"
              className="border border-gray-600 mb-[1rem]"
              type="number"
              placeholder="5"
              defaultValue={state.settings.shortBreak}
            />

            <label>Long Break</label>
            <input
              name="longBreak"
              className="border border-gray-600 mb-[1rem]"
              type="number"
              placeholder="15"
              defaultValue={state.settings.longBreak}
            />

            <label>Work Interval</label>
            <input
              className="border border-gray-600"
              name="intervalsBeforeLong"
              type="number"
              placeholder="1"
              defaultValue={state.settings.intervalsBeforeLong}
            />

            <button
              type="submit"
              className="mt-4 text-center border rounded-2xl w-[5rem] hover:bg-green-800"
            >
              Submit
            </button>
          </form>
        </section>
      )}
    </>
  );
}
