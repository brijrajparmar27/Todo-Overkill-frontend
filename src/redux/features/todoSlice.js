import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Axios/axios";

const initialState = {
  completed: [],
  pending: [],
  folder: {
    id: null,
    name: null,
  },
};

export const fetchTodos = createAsyncThunk(
  "todo/get",
  async ({ completed }) => {
    try {
      let { data } = await axios.get(`/${completed ? "completed" : "pending"}`);
      return { data, completed };
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteTodos = createAsyncThunk("todo/delete", async ({ id }) => {
  try {
    let { data } = await axios.delete(`/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const toogleTodos = createAsyncThunk(
  "todo/toogle",
  async ({ id, status }) => {
    try {
      let { data } = await axios.patch(`/${id}`, { completed: status });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createTodos = createAsyncThunk("todo/create", async ({ text }) => {
  try {
    let { data } = await axios.post(`/`, { text });
    return data;
  } catch (err) {
    console.log(err);
  }
});

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      let updatedState = { ...state };
      let { data, completed } = payload;
      if (completed) {
        updatedState.completed = data;
      } else {
        updatedState.pending = data;
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
      console.log("fulfilled");
    });

    builder.addCase(createTodos.pending, (state, { payload }) => {
      console.log("pending");
    });

    builder.addCase(deleteTodos.fulfilled, (state, { payload }) => {
      console.log("fulfilled");
      console.log({ state, payload });
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

export const { setCompletedTodos, setPendingTodos } = todoSlice.actions;
export default todoSlice.reducer;
export const getCompletedTodos = (state) => state.todoReducer.completed;
export const getPendingTodos = (state) => state.todoReducer.pending;
