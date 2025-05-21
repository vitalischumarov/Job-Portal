import "./App.scss";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
