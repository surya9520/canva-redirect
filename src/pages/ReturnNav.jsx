import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ReturnNav = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const correlation_jwt = searchParams.get('correlation_jwt');

useEffect(() => {
    if (correlation_jwt) {
      if (window.opener) {
        
        let decoded=jwt_decode(correlation_jwt);
        let {state}=decoded;
        alert(state.domain)
          window.opener.postMessage({correlation_jwt}, `http://${state.domain}`);
          window.close();
        } else {
          alert('No opener window to post message to.');
          window.close();
        }
    }else{
      alert('No correlation_jwt found.');
      window.close();
    }
  }, []);



  return <div>ReturnNav</div>;
};

export default ReturnNav;
