import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import "./output.css";
import router from "./routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
