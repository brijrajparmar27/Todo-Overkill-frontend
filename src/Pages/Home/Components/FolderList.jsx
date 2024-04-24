import { AnimatePresence, motion } from "framer-motion";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolder, setActiveFolder } from "../../../redux/features/folderSlice";
import { fetchTodos } from "../../../redux/features/todoSlice";
import { STATUS_ALL } from "../../../utils/constants";

export const FolderList = ({ folderText }) => {
  const dispatch = useDispatch();
  const { folderList, selectedFolder } = useSelector(
    (state) => state.folderReducer
  );

  const handleDelete = async (folderId) => {
    const searchText = folderText;
    dispatch(deleteFolder({ folderId, searchText }));
  };

  const handleSelect = async (folder) => {
    if (selectedFolder._id !== folder._id) {
      await dispatch(setActiveFolder(folder));
      dispatch(fetchTodos({ status: STATUS_ALL }));
    }
  };
  return (
    <>
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
                  {!(each.isDefault || selectedFolder?._id === each._id) && (
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
    </>
  );
};
