import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth } from "./Pages/Authentication/Auth.jsx";
import { Home } from "./Pages/Home/Home.jsx";
import { NotFound } from "./Pages/NotFound.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
