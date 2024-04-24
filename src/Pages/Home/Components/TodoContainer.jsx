import { motion, AnimatePresence } from "framer-motion";
import Todo from "./Todo";

export const TodoContainer = ({ list, title }) => {
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
