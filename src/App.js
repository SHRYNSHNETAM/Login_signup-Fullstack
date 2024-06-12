import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Errorpage from './pages/Errorpage';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
       <Routes>
          <Route path="*" element={<Errorpage />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
       </Routes>
    </>
  );
}

export default App;
