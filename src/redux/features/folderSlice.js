import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../Axios/axios";

const initialState = {
  selectedFolder: null,
  folderList: [],
};

export const createFolder = createAsyncThunk("folder/create", async (name) => {
  const folder = (await Axios.post("folder/add", { name })).data;
  console.log(folder);
  return folder;
});

export const deleteFolder = createAsyncThunk(
  "folder/delete",
  async ({ folderId, searchText }) => {
    console.log({ folderId, searchText });
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
      state.folderList = payload;
    });
    builder.addCase(createFolder.pending, (state, { payload }) => {
      console.log("loading");
    });
    builder.addCase(createFolder.rejected, (state, { payload }) => {
      console.log("failed");
    });

    builder.addCase(deleteFolder.fulfilled, (state, { payload }) => {
      state.folderList = payload;
    });
    builder.addCase(deleteFolder.pending, (state, { payload }) => {
      console.log("loading");
    });
    builder.addCase(deleteFolder.rejected, (state, { payload }) => {
      console.log("failed");
    });

    builder.addCase(findFolder.fulfilled, (state, { payload }) => {
      if (state.selectedFolder === null) {
        state.selectedFolder = payload.find((folder) => folder.isDefault);
      }
      state.folderList = payload;
    });
    builder.addCase(findFolder.pending, (state, { payload }) => {
      console.log("loading");
    });
    builder.addCase(findFolder.rejected, (state, { payload }) => {
      console.log("failed");
    });
  },
});

export const { setActiveFolder, clearFolders } = folderSlice.actions;
export default folderSlice.reducer;
