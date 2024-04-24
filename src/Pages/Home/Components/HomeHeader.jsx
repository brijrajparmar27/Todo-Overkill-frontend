import { GoCheckCircleFill } from "react-icons/go";
import { IoFolderOpen } from "react-icons/io5";
import { motion } from "framer-motion";
import { clearTodos } from "../../../redux/features/todoSlice";
import { clearFolders } from "../../../redux/features/folderSlice";
import { clearUser } from "../../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const HomeHeader = ({ setShowFolderSwitcher }) => {
  const { selectedFolder } = useSelector((state) => state.folderReducer);
  const dispach = useDispatch();
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

  const logout = () => {
    dispach(clearTodos());
    dispach(clearFolders());
    dispach(clearUser());
  };

  const toogleFolderSwitcher = () => {
    setShowFolderSwitcher(true);
  };

  return (
    <motion.div
      className="flex-1 max-h-[30%] gradient flex justify-center"
      initial={{ y: -100 }}
      viewport={{ once: true }}
      animate={{ y: 0 }}
    >
      <div className="w-4/5 h-fit mt-10 flex justify-between items-center">
        <div className="flex gap-8 ">
          <div
            className="font-bold text-title flex justify-center items-center gap-[1px] text-white"
            onClick={logout}
          >
            <h1>TOD</h1>
            <GoCheckCircleFill className="text-subititle" />
          </div>
          <div
            className="bg-blackglass flex justify-center items-center rounded-md p-2 gap-5 cursor-pointer text-white"
            onClick={toogleFolderSwitcher}
          >
            <p className="text-content">{selectedFolder?.name}</p>
            <IoFolderOpen className="text-subititle" />
          </div>
        </div>
        <div className="text-content text-white">{getCurrentDate()}</div>
      </div>
    </motion.div>
  );
};
