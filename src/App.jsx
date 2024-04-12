import { useSelector } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Auth } from "./Pages/Authentication/Auth";
import { Home } from "./Pages/Home/Home";
import { NotFound } from "./Pages/NotFound";

export const App = () => {
  const isLoggedIn = !!useSelector((state) => state.userReducer.userObj);
  console.log(isLoggedIn);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Navigate to="/home" /> : <Auth />,
    },
    {
      path: "/home",
      element: !isLoggedIn ? <Navigate to="/" /> : <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};
