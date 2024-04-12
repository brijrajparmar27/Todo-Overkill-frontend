import { IoFolderOpen } from "react-icons/io5";
import { Todo } from "./Components/Todo";
import { FolderSwitcher } from "./Components/FolderSwitcher";
import { GoCheckCircleFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ghost from "../../assets/ghost.json";
import { motion, AnimatePresence } from "framer-motion";

import {
  createTodos,
  fetchTodos,
  getCompletedTodos,
  getPendingTodos,
} from "../../redux/features/todoSlice";
import { LottiePlayer } from "../../Common/LottiePlayer";
import { logoutUser } from "../../redux/features/userSlice";

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

  const sectionVariant = {
    hide: {
      y: -100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
    close: {
      y: -100,
      opacity: 0,
    },
  };

  const logout = ()=>{
    dispach(logoutUser())
  }

  return (
    <div className="FitPage bg-gray flex flex-col overflow-hidden">
      <AnimatePresence>
        {showFolderSwitcher && (
          <FolderSwitcher toogleShow={setShowFolderSwitcher} />
        )}
      </AnimatePresence>
      <motion.div
        className="flex-1 max-h-[30%] gradient flex justify-center"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        onClick={logout}
      >
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
      </motion.div>

      <motion.div
        layout
        className="flex-1 flex w-full justify-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <motion.div
          className="w-4/5 bg-white h-fit rounded-xl m-[-90px]"
          layout
        >
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

          <motion.div
            className="min-h-[300px] p-5 flex flex-col overflow-x-hidden"
            layout
          >
            <AnimatePresence mode="wait">
              {pending?.length > 0 && (
                <motion.div
                  layout
                  className=""
                  variants={sectionVariant}
                  initial="hide"
                  animate="show"
                  exit="close"
                >
                  <p className="text-content">to do</p>
                  <motion.div className="flex flex-col" layout>
                    <AnimatePresence mode="popLayout">
                      {pending.map((each) => {
                        return <Todo each={each} key={each._id} />;
                      })}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {completed?.length > 0 && (
                <motion.div
                  layout
                  variants={sectionVariant}
                  initial="hide"
                  animate="show"
                  exit="close"
                >
                  <p className="text-content">done</p>
                  <motion.div layout>
                    <AnimatePresence mode="popLayout">
                      {completed.map((each) => {
                        return <Todo each={each} key={each._id} />;
                      })}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {completed?.length == 0 && pending?.length == 0 && (
                <LottiePlayer animationData={ghost} />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
