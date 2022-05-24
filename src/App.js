import Login from "./Views/Login";
import ProtectedRoute from "Routes/ProtectedRoute";
import './App.css';
import Navbar from 'Components/Navbar'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function MyButton() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/profile');
  };
  return <button onClick={handleClick}>Go Profile</button>;
};

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <MyButton />
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

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
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sp365-callback" element={<Login />} />
          <Route exact path="/about" element={<About />} />
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
