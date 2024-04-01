import { IoFolderOpen } from "react-icons/io5";
import { Todo } from "./Components/Todo";
import { FolderSwitcher } from "./Components/FolderSwitcher";
import { GoCheckCircleFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ghost from "../../assets/ghost.json";
import {
  createTodos,
  fetchTodos,
  getCompletedTodos,
  getPendingTodos,
} from "../../redux/features/todoSlice";
import { LottiePlayer } from "../../Common/LottiePlayer";

export const Home = () => {
  const [showFolderSwitcher, setShowFolderSwitcher] = useState(false);
  const dispach = useDispatch();
  const completed = useSelector(getCompletedTodos);
  const pending = useSelector(getPendingTodos);

  useEffect(() => {
    dispach(fetchTodos({ completed: true }));
    dispach(fetchTodos({ completed: false }));
  }, []);

  const toogleFolderSwitcher = () => {
    setShowFolderSwitcher(true);
  };

  const handleNoteAdd = async (e) => {
    e.preventDefault();
    let text = e.target.newNote.value.trim();
    e.target.reset();
    await dispach(createTodos({ text }));
    dispach(fetchTodos({ completed: false }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = today.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="FitPage bg-gray flex flex-col overflow-hidden">
      {showFolderSwitcher && (
        <FolderSwitcher toogleShow={setShowFolderSwitcher} />
      )}
      <div className="flex-1 max-h-[30%] gradient flex justify-center">
        <div className="w-4/5 h-fit mt-10 flex justify-between items-center">
          <div className="flex gap-8 ">
            <div className="font-bold text-title flex justify-center items-center gap-[1px] text-white">
              <h1>TOD</h1>
              <GoCheckCircleFill className="text-subititle" />
            </div>
            <div
              className="bg-blackglass flex justify-center items-center rounded-md p-2 gap-5 cursor-pointer text-white"
              onClick={toogleFolderSwitcher}
            >
              <p className="text-content">youtube</p>
              <IoFolderOpen className="text-subititle" />
            </div>
          </div>
          <div className="text-content text-white">{getCurrentDate()}</div>
        </div>
      </div>

      <div className="flex-1 flex w-full justify-center">
        <div className="w-4/5 bg-white h-fit rounded-xl m-[-90px]">
          <form
            className="flex w-full p-5 h-[90px] justify-center items-center gap-3 border-b border-gray"
            onSubmit={handleNoteAdd}
          >
            <h3 className="text-title font-bold">Tasks</h3>
            <input
              type="text"
              name="newNote"
              className="bg-gray-50 w-full h-full border border-gray text-black text-subititle rounded-lg focus:ring-green focus:border-green outline-none block p-2.5"
              placeholder="Type to add a new task."
              required
            />
          </form>

          <div className="min-h-[300px] p-5 flex flex-col">
            {pending?.length > 0 && (
              <div className="">
                <p className="text-content">to do</p>
                <div className="flex flex-col">
                  {pending.map((each) => {
                    return <Todo each={each} key={each._id} />;
                  })}
                </div>
              </div>
            )}

            {completed?.length > 0 && (
              <div>
                <p className="text-content">done</p>
                <div>
                  {completed.map((each) => {
                    return <Todo each={each} key={each._id} />;
                  })}
                </div>
              </div>
            )}

            {completed?.length == 0 && pending?.length == 0 && (
              <LottiePlayer animationData={ghost} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
