import { FolderSwitcher } from "./Components/FolderSwitcher";
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
import { findFolder } from "../../redux/features/folderSlice";
import { STATUS_ALL } from "../../utils/constants";
import { TodoContainer } from "./Components/TodoContainer";
import { HomeHeader } from "./Components/HomeHeader";

export const Home = () => {
  const [showFolderSwitcher, setShowFolderSwitcher] = useState(false);
  const dispach = useDispatch();
  const completed = useSelector(getCompletedTodos);
  const pending = useSelector(getPendingTodos);

  const fetchAllTodos = async () => {
    dispach(fetchTodos({ status: STATUS_ALL }));
  };

  const fetchFolders = async () => {
    return dispach(findFolder());
  };

  const initiateHome = async () => {
    await fetchFolders();
    fetchAllTodos();
  };

  useEffect(() => {
    initiateHome();
  }, []);

  const handleNoteAdd = async (e) => {
    e.preventDefault();
    let text = e.target.newNote.value.trim();
    e.target.reset();
    dispach(createTodos({ text }));
  };

  return (
    <div className="FitPage bg-gray flex flex-col overflow-hidden">
      <AnimatePresence>
        {showFolderSwitcher && (
          <FolderSwitcher toogleShow={setShowFolderSwitcher} />
        )}
      </AnimatePresence>

      <HomeHeader setShowFolderSwitcher={setShowFolderSwitcher} />

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
            <TodoContainer list={pending} title={"To do"} />

            <TodoContainer list={completed} title={"Done"} />

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
