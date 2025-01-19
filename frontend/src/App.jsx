import { ToastContainer } from "react-toastify";
import Router from "./Router";

function App() {
   return (
      <>
         <Router />
         <ToastContainer position="bottom-left" />
      </>
   );
}

export default App;
