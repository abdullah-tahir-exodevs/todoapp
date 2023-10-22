import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Create from "./pages/create/Create";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AllUser from "./pages/AllUser/AllUser";
import EditUserpage from "./pages/update/Update";
import Detailpage from "./pages/Detailpage/Detailpage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/getuser",
      element: <AllUser />,
    },
    {
      path: "/edituserpage/:id",
      element: <EditUserpage />,
    },
    {
      path: "/detailpage/:id",
      element: <Detailpage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
