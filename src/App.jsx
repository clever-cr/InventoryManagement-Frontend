import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { myAuth } from './store/Auth';
import { useDispatch } from 'react-redux';

function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  console.log(
    "userrr",user
  )
  useEffect(()=>{
    if(user){
    dispatch(myAuth.setUser(user));  
    }
  },[user])
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App; 