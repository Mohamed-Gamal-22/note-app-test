import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound.jsx";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Routers}></RouterProvider>;
}

export default App;
