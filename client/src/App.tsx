import { useState, useEffect } from 'react';
import { socket } from './socket';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Control from './pages/Control';
import Member from './pages/Member';
import Register from './pages/Register';

axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const handleReceivedLockStatus = (status: string) => {
      console.log(status);
      if (status.trim() === 'lock') {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    };
    const handleReceivedAccess = (access: string) => {
      console.log(access);
      if (access.trim() === 'granted') {
        setIsLocked(false);
      }
    };

    socket.on('received-lock-status', handleReceivedLockStatus);
    socket.on('received-access', handleReceivedAccess);

    return () => {
      socket.off('received-lock-status', handleReceivedLockStatus);
      socket.off('received-access', handleReceivedAccess);
    };
  }, [socket]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Control isLocked={isLocked} />} />
          <Route path="/members" element={<Member />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
