import { RiCloseCircleFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  deleteFolder,
  findFolder,
  setActiveFolder,
} from "../../../redux/features/folderSlice";
import { fetchTodos } from "../../../redux/features/todoSlice";
import { STATUS_ALL } from "../../../utils/constants";
import { useEffect, useState } from "react";

export const FolderSwitcher = ({ toogleShow }) => {
  const [folderText, setFolderText] = useState("");
  const dispatch = useDispatch();
  const [createPromptVisible, setCreatePromptVisible] = useState(false);

  const { folderList, selectedFolder } = useSelector(
    (state) => state.folderReducer
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(findFolder(folderText));
    }, 250);
    return () => {
      console.log("destructor");
      clearTimeout(timer);
    };
  }, [folderText]);

  const backdropVariant = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  };
  const popupVariant = {
    hide: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
    },
    close: {
      scale: 0,
      opacity: 0,
    },
  };

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

  const handleSelect = async (folder) => {
    if (selectedFolder._id !== folder._id) {
      await dispatch(setActiveFolder(folder));
      dispatch(fetchTodos({ status: STATUS_ALL }));
    }
  };

  const handleAddFolder = async () => {
    await dispatch(createFolder(folderText));
    setCreatePromptVisible(false);
  };

  const handleDelete = async (folderId) => {
    const searchText = folderText;
    console.log(searchText);
    dispatch(deleteFolder({ folderId, searchText }));
  };

  const createPromptVariant = {
    hide: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
      },
    },
    close: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
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
        variants={popupVariant}
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
            {folderList?.map((each) => {
              return (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    className="flex items-center w-full justify-between px-3 h-12 cursor-pointer"
                    key={each._id}
                    onClick={() => {
                      handleSelect(each);
                    }}
                  >
                    <p>{each?.name}</p>
                    <div className="flex gap-1">
                      <AnimatePresence mode="popLayout">
                        {selectedFolder?._id === each._id && (
                          <motion.div
                            className="bg-green px-3 rounded-3xl"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                          >
                            <p className="text-white text-content">Selected</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence mode="popLayout">
                        {!(
                          each.isDefault || selectedFolder?._id === each._id
                        ) && (
                          <motion.div>
                            <RiCloseCircleFill
                              className="text-title text-gray cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(each._id);
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
