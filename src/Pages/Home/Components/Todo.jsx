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

const Todo = ({ each }) => {
  const backdropVariant = {
    hide: {
      x: -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    close: {
      x: -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const dispach = useDispatch();
  const handleToogle = async () => {
    await dispach(toogleTodos({ id: each._id, status: !each.completed }));
    dispach(fetchTodos({ completed: true }));
    dispach(fetchTodos({ completed: false }));
  };
  const handleDelete = () => {
    dispach(deleteTodos({ id: each._id }));
  };
  return (
    <motion.div
      className="flex items-center w-full justify-between px-3 h-12"
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

export default Todo