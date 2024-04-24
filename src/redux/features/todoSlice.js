import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../Axios/axios";

const initialState = {
  completed: [],
  pending: [],
};

export const fetchTodos = createAsyncThunk(
  "todo/get",
  async ({ status }, { getState }) => {
    const { selectedFolder } = getState().folderReducer;
    try {
      let { data } = await Axios.get(
        `todo?status=${status}&&folder=${selectedFolder._id}`
      );
      return { data, status };
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todo/delete",
  async ({ id }, { getState }) => {
    const { selectedFolder } = getState().folderReducer;
    try {
      let { data } = await Axios.delete(`todo/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const toogleTodos = createAsyncThunk(
  "todo/toogle",
  async ({ id, status }, { getState }) => {
    const { selectedFolder } = getState().folderReducer;
    let payload = { completed: status, folderId: selectedFolder._id };
    try {
      let { data } = await Axios.patch(`todo/${id}`, payload);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createTodos = createAsyncThunk(
  "todo/create",
  async (data, { getState }) => {
    const { selectedFolder } = getState().folderReducer;
    let payload = { ...data, folderId: selectedFolder._id };
    try {
      let { data } = await Axios.post(`todo/`, payload);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCompletedTodos: (state, { payload }) => {
      state.completed = payload;
    },
    setPendingTodos: (state, { payload }) => {
      state.pending = payload;
    },
    clearTodos: (state, { payload }) => {
      state.pending = [];
      state.completed = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      let updatedState = { ...state };
      let { data, status } = payload;
      if (["pending", "completed"].includes(status)) {
        updatedState[status] = data[status];
      } else {
        updatedState.pending = data.pending;
        updatedState.completed = data.completed;
      }
      return updatedState;
    });

    builder.addCase(fetchTodos.pending, (state, { payload }) => {
      console.log("pending");
    });

    builder.addCase(toogleTodos.fulfilled, (state, { payload }) => {
      console.log("fulfilled");
    });

    builder.addCase(toogleTodos.pending, (state, { payload }) => {
      console.log("pending");
    });

    builder.addCase(createTodos.fulfilled, (state, { payload }) => {
      state.pending = payload;
    });

    builder.addCase(createTodos.pending, (state, { payload }) => {
      console.log("pending");
    });

    builder.addCase(deleteTodos.fulfilled, (state, { payload }) => {
      console.log("fulfilled");
      if (payload.areCompleted) {
        state.completed = payload.todos;
      } else {
        state.pending = payload.todos;
      }
    });

    builder.addCase(deleteTodos.pending, (state, { payload }) => {
      console.log("pending");
    });
  },
});

export const { setCompletedTodos, setPendingTodos, clearTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
export const getCompletedTodos = (state) => state.todoReducer.completed;
export const getPendingTodos = (state) => state.todoReducer.pending;
