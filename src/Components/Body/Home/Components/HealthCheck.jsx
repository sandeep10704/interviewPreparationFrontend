import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthCheck = () => {
  const [status, setStatus] = useState('Checking...');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get('https://aiinterviewpreparation.onrender.com/');
        if (response.status === 200) {
          setStatus('Cloud Neural Network: ACTIVE');
          setIsOnline(true);
        } else {
          setStatus('Cloud Neural Network: UNSTABLE');
          setIsOnline(false);
        }
      } catch (error) {
        setStatus('Cloud Neural Network: OFFLINE');
        setIsOnline(false);
      }
    };

    checkHealth();
  }, []);

  return null;
};

export default HealthCheck;
