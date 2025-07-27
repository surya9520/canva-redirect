import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ReturnNav = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const correlation_jwt = searchParams.get('correlation_jwt');


useEffect(() => {
    if (correlation_jwt) {
      if (window.opener) {
        let decoded=jwtDecode(correlation_jwt);
        let {correlation_state,design_id:designId}=decoded || {};
          const{domain,type,tab}= jwtDecode(correlation_state) ||{};
          window.opener.postMessage({designId, type,tab}, `${domain}`);
          console.log(domain,type,tab)
          // window.close();
        } else {
          alert('No opener window to post message to.');
          // window.close();
        }
    }else{
      alert('No correlation_jwt found.');
      // window.close();
    }
  }, []);



  return <div>ReturnNav</div>;
};

export default ReturnNav;
