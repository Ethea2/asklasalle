import Onboarding from "./pages/Onboarding";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Viewpost from "./pages/Viewpost";
import Viewprofile from "./pages/Viewprofile";
import Createpost from "./pages/Createpost";
import Search from "./pages/Search"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLogout } from "./hooks/useLogout";
import About from "./pages/About";
import DoesNotExist from "./pages/DoesNotExist";

function App() {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_URL_PRODUCTION
      : process.env.REACT_APP_URL_DEV
  const stayLogged = localStorage.getItem('staylogged')
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()
  const [retrigger, setRetrigger] = useState(false)

  const remainingWeeks = (givenDate) => {
    const today = new Date();
    const expirationDate = new Date(givenDate);
    const timeDifference = expirationDate.getTime() - today.getTime();

    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingWeeks = Math.floor(remainingDays / 7);

    return remainingWeeks;
  };

  const remainingSeconds = (givenDate) => {
    const today = new Date();
    const expirationDate = new Date(givenDate);
    const timeDifference = expirationDate.getTime() - today.getTime();

    const remainingSeconds = Math.floor(timeDifference / 1000);

    return remainingSeconds;
  };

  useEffect(() => {
    let interval;
    if (user) {
      const expDate = new Date(JSON.parse(localStorage.getItem('user')).expires)
      if (remainingSeconds(expDate) < 5) {
        alert("Your session has expired, you will be logged out automatically")
        logout()
        navigate('/')
      } else {
        interval = setInterval(() => {
          if (remainingSeconds(expDate) < 5) {
            alert('Your session has expired, you will be logged out automatically');
            logout();
            clearInterval(interval);
            navigate('/')
          }
        }, 10000); // 10 seconds
      }
    }

    return () => clearInterval(interval);
  }, [user, logout, retrigger]);

  useEffect(() => {
    if (stayLogged === 'true') {
      const userObject = JSON.parse(localStorage.getItem('user'))
      const token = JSON.parse(localStorage.getItem('user')).token
      if (remainingWeeks(new Date(userObject.expDate)) < 1) { //once the token lasts for less than a week and the user wants to be remembered it will be refreshed.
        axios.post(apiUrl + '/api/user/refresh/', { refreshToken: token }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          userObject.token = res.data.token
          userObject.expires = res.data.expires
          localStorage.setItem('user', JSON.stringify(userObject)) //extends token for 3 more weeks
          setRetrigger(true)
        })
      }
    }
  }, [])


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
        <Route path='/' element={user ? <Homepage /> : <Onboarding />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/createpost' element={<Createpost />} />
        <Route path='/viewpost/:postid' element={<Viewpost />} />
        <Route path='/viewprofile/:username' element={<Viewprofile />} />
        <Route path='/search/:keywords' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/*' element={<DoesNotExist />} />
      </Routes>
    </div>
  );
}

export default App;
