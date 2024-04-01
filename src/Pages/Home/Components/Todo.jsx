import { GoCheckCircleFill } from "react-icons/go";
import { GoCircle } from "react-icons/go";
import { RiCloseCircleFill } from "react-icons/ri";
import axios from "../../../Axios/axios";
import { useDispatch } from "react-redux";
import {
  deleteTodos,
  fetchTodos,
  toogleTodos,
} from "../../../redux/features/todoSlice";

export const Todo = ({ each }) => {
  const dispach = useDispatch();
  const handleToogle = async () => {
    console.log(each);
    await dispach(toogleTodos({ id: each._id, status: !each.completed }));
    dispach(fetchTodos({ completed: true }));
    dispach(fetchTodos({ completed: false }));
  };
  const handleDelete = () => {
    dispach(deleteTodos({ id: each._id }));
  };
  return (
    <div className="flex items-center w-full justify-between px-3 h-12">
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
    </div>
  );
};
