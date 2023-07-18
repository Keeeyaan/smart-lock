import { useState, useEffect } from 'react';
import { socket } from './socket';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import { Control, Member, Logs, Register } from './pages';

axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [rfidAccess, setRfidAccess] = useState([]);

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

    const handleReceivedId = async (id: string) => {
      const response = await axios.get(`/api/members/${id}`);
      setRfidAccess(response.data);

      if (response.data.length !== 0) {
        await axios.post('/api/logs', {
          date: new Date,
          message: `[${response.data[0].uid}]: ${response.data[0].name} has opened the lock.`,
        });
      } else {
        await axios.post('/api/logs', {
          date: new Date,
          message: `[${response.data[0].uid}]: unknown rfid tried to open the lock.`,
        });
      }
    };

    socket.on('received-id', handleReceivedId);
    socket.on('received-lock-status', handleReceivedLockStatus);
    socket.on('received-access', handleReceivedAccess);

    return () => {
      socket.off('received-lock-status', handleReceivedLockStatus);
      socket.off('received-access', handleReceivedAccess);
      socket.off('received-id', handleReceivedId);
    };
  }, [socket]);

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Control isLocked={isLocked} rfidAccess={rfidAccess} />}
          />
          <Route path="/logs" element={<Logs />} />
          <Route path="/members" element={<Member />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
