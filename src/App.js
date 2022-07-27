import Login from "./Views/Login";
import Dashboard from "./Views/Dashboard";
import SharepointSettings from "./Views/SharepointSettings";
import SuperofficeSettings from "./Views/SuperofficeSettings";
import ProtectedRoute from "Routes/ProtectedRoute";
import './App.css';
import Navbar from 'Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { updateUserDetails } from 'store/userDetailsSlice'
import { useEffect } from "react";
import Cookies from 'js-cookie'


function Profile() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Profile View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}
function MyProfile() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}
function OthersProfile() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}
const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (Cookies.get(process.env.REACT_APP_USER)) dispatch(updateUserDetails(JSON.parse(Cookies.get(process.env.REACT_APP_USER))))
  },[])

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/sp365-callback" element={<Login />} />
          <Route exact path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route exact path="/sharepoint" element={
            <ProtectedRoute>
              <SharepointSettings />
            </ProtectedRoute>} />
          <Route exact path="/superoffice" element={
            <ProtectedRoute>
              <SuperofficeSettings />
            </ProtectedRoute>} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>}>
            <Route path=":id" element={<MyProfile />} />
            <Route path="me" element={<OthersProfile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
