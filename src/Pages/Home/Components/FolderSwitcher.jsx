import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { createFolder, findFolder } from "../../../redux/features/folderSlice";
import { useEffect, useState } from "react";
import { FolderList } from "./FolderList";
import {
  FolderpopupVariant,
  backdropVariant,
  createPromptVariant,
} from "../Variants/FolderVariants";

export const FolderSwitcher = ({ toogleShow }) => {
  const [folderText, setFolderText] = useState("");
  const dispatch = useDispatch();
  const [createPromptVisible, setCreatePromptVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(findFolder(folderText));
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, [folderText]);

  const handleClose = () => {
    toogleShow(false);
  };

  const handleFolderText = (e) => {
    let testInput = e.target.value.trim();
    if (testInput.length > 0) {
      setCreatePromptVisible(true);
    } else {
      setCreatePromptVisible(false);
    }
    setFolderText(testInput);
  };

  const handleAddFolder = async () => {
    await dispatch(createFolder(folderText));
    setCreatePromptVisible(false);
  };

  return (
    <motion.div
      variants={backdropVariant}
      initial="hide"
      animate="show"
      exit="close"
      className="fixed top-0 left-0 FitPage bg-blackglass flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <motion.div
        variants={FolderpopupVariant}
        initial="hide"
        animate="show"
        exit="close"
        className="bg-white h-4/5 w-2/4 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex w-full p-5 h-[90px] justify-center items-center gap-3 border-b border-gray">
          <h3 className="text-title font-bold">Folders</h3>
          <input
            type="text"
            className="bg-gray-50 w-full h-full border border-gray text-black text-subititle rounded-lg focus:ring-green focus:border-green outline-none block p-2.5"
            placeholder="Type to add a new task."
            required
            onChange={handleFolderText}
          />
        </div>
        <div className="min-h-[300px] p-5">
          <motion.div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {createPromptVisible && (
                <motion.div
                  variants={createPromptVariant}
                  initial="hide"
                  animate="show"
                  exit="close"
                  className="forest-gradient rounded-xl h-[70px] flex justify-start align-middle cursor-pointer mb-3"
                  onClick={handleAddFolder}
                >
                  <p className="flex justify-start items-center w-full pl-5 text-white font-medium text-subititle">
                    Create a folder named '{folderText}'
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <FolderList folderText={folderText} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
