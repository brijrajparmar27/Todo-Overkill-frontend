import { motion, AnimatePresence } from "framer-motion";
import Todo from "./Todo";
import { sectionVariant } from "../Variants/TodoVariants";

export const TodoContainer = ({ list, title }) => {
  return (
    <AnimatePresence mode="popLayout">
      {list?.length > 0 && (
        <motion.div
          layout
          variants={sectionVariant}
          initial="hide"
          animate="show"
          exit="close"
        >
          <p className="text-content">{title}</p>
          <motion.div
            className="flex flex-col max-h-[27vh] overflow-y-auto scrollbar"
            layout
          >
            <AnimatePresence mode="popLayout">
              {list.map((each) => {
                return <Todo each={each} key={each._id} />;
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
