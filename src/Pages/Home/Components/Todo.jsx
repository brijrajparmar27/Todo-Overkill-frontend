import { GoCheckCircleFill } from "react-icons/go";
import { GoCircle } from "react-icons/go";
import { RiCloseCircleFill } from "react-icons/ri";
import axios from "../../../Axios/axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  deleteTodos,
  fetchTodos,
  toogleTodos,
} from "../../../redux/features/todoSlice";
import { STATUS_ALL } from "../../../utils/constants";
import { backdropVariant } from "../Variants/TodoVariants";

const Todo = ({ each }) => {
  const dispach = useDispatch();
  const handleToogle = async () => {
    await dispach(toogleTodos({ id: each._id, status: !each.completed }));
    dispach(fetchTodos({ status: STATUS_ALL }));
  };
  const handleDelete = () => {
    dispach(deleteTodos({ id: each._id }));
  };
  return (
    <motion.div
      className="flex items-center w-full justify-between px-3 h-12 flex-shrink-0"
      variants={backdropVariant}
      initial="hide"
      animate="show"
      exit="close"
    >
      <div className="flex items-center gap-2">
        {each.completed ? (
          <GoCheckCircleFill
            className="text-title text-green cursor-pointer"
            onClick={handleToogle}
          />
        ) : (
          <GoCircle
            className="text-title text-green cursor-pointer"
            onClick={handleToogle}
          />
        )}

        <p className="text-subititle cursor-default">{each.text}</p>
      </div>
      <RiCloseCircleFill
        className="text-title text-gray cursor-pointer"
        onClick={handleDelete}
      />
    </motion.div>
  );
};

export default Todo;