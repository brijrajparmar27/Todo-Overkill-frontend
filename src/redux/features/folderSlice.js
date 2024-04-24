import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../Axios/axios";
import { toast } from "react-toastify";

const initialState = {
  selectedFolder: null,
  folderList: [],
};

export const createFolder = createAsyncThunk("folder/create", async (name) => {
  const folder = (await Axios.post("folder/add", { name })).data;
  return folder;
});

export const deleteFolder = createAsyncThunk(
  "folder/delete",
  async ({ folderId, searchText }) => {
    const folderList = (
      await Axios.delete(`folder/${folderId}?search=${searchText}`)
    ).data;
    return folderList;
  }
);

export const findFolder = createAsyncThunk(
  "folder/",
  async (searchTerm = "") => {
    const folderList = (await Axios.get(`folder?search=${searchTerm}`)).data;
    return folderList;
  }
);

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setActiveFolder: (state, { payload }) => {
      state.selectedFolder = payload;
    },
    clearFolders: (state, { payload }) => {
      state.selectedFolder = null;
      state.folderList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createFolder.fulfilled, (state, { payload }) => {
      toast.success("Folder Created");
      state.folderList = payload;
    });
    builder.addCase(createFolder.pending, (state, { payload }) => {});
    builder.addCase(createFolder.rejected, (state, { payload }) => {
      toast.error("Failed to add folder");
    });

    builder.addCase(deleteFolder.fulfilled, (state, { payload }) => {
      toast.success("Folder Deleted");
      state.folderList = payload;
    });
    builder.addCase(deleteFolder.pending, (state, { payload }) => {});
    builder.addCase(deleteFolder.rejected, (state, { payload }) => {
      toast.error("Failed to delete folder");
    });

    builder.addCase(findFolder.fulfilled, (state, { payload }) => {
      if (state.selectedFolder === null) {
        state.selectedFolder = payload.find((folder) => folder.isDefault);
      }
      state.folderList = payload;
    });
    builder.addCase(findFolder.pending, (state, { payload }) => {});
    builder.addCase(findFolder.rejected, (state, { payload }) => {
      toast.error("Failed to fetch folders");
    });
  },
});

export const { setActiveFolder, clearFolders } = folderSlice.actions;
export default folderSlice.reducer;
