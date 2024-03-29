import { useEffect } from "react";
import AppRoutes from "./routes";
import { generateUserId } from "./utils/generateUserId";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEffect(() => {
    // assign userId in the localstorage if not found
    const userId = localStorage.getItem("userId");
    if (!userId) {
      const userId = generateUserId(8);
      localStorage.setItem("userId", userId);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={5}
      />
      <AppRoutes />
    </>
  );
}

export default App;
