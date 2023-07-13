import Onboarding from "./pages/Onboarding";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Viewpost from "./pages/Viewpost";
import Viewprofile from "./pages/Viewprofile";
import Viewprofileuser from "./pages/Viewprofileuser";
import Createpost from "./pages/Createpost";
import Viewpostuser from "./pages/Viewpostuser";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/' element={<Onboarding />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/createpost' element={<Createpost />} />
        <Route path='/viewpost/:postid' element={<Viewpost />} />
        <Route path='/viewpost/:postid/edit' element={<Viewpostuser />} />
        <Route path='/viewprofile/:username' element={<Viewprofile />} />
        <Route path='/viewprofile/:username/edit' element={<Viewprofileuser />} />
      </Routes>
    </div>
  );
}

export default App;
