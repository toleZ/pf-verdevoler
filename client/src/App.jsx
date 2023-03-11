import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LogedUser } from './redux/actions/acountActions';
import { fetchEntities } from './redux/actions/entitiesActions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Map from './pages/Map';
import Entities from './pages/Entities';
import EntitieDetail from '../src/pages/EntitieDetail';
import SingUpEntitie from './pages/SignUpEntities/SingUpEntitie';
import Login from './Components/Login';
import UserProfile from './pages/userProfile/UserProfile';
import EntityProfile from './pages/entityProfile/EntityProfile';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact/Contact';
import Navbar from './Components/NavBar';
import SingUp from './pages/SingUp';
import ColorModeSwitcher from './Components/ColorModeSwitcher';
import Footer from './Components/Footer';
import ChatBox from './Components/ChatBox';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/ProtectedRoute';

import axios from 'axios';
axios.defaults.baseURL = 'https://verdevolver-pf-production.up.railway.app/';
//axios.defaults.baseURL = 'http://localhost:3001/'

const App = () => {
  const { acount } = useSelector((state) => state.acountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    !Object.keys(acount).length && dispatch(LogedUser());
    dispatch(fetchEntities());
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/entities" element={<Entities />} />
          <Route path="/entitie/:id" element={<EntitieDetail />} />
          <Route path="/beVdV" element={<SingUpEntitie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute cond={acount?.RoleId !== 4}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entityprofile"
            element={
              <ProtectedRoute cond={acount?.RoleId === 4}>
                <EntityProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                cond={acount?.RoleId === 2 || acount?.RoleId === 3}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatBox />
        <ColorModeSwitcher />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
