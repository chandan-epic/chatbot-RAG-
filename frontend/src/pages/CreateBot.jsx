import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const CreateBot = () => {

  const { loginWithRedirect, logout, getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const [data, setData] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await fetch('http://localhost:3000/createbot', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [isAuthenticated]);


  return (
    <div>CreateBot</div>
  )
}

export default CreateBot;