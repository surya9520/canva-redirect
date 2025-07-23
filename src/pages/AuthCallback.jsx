import React, { use, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description') ||'something went wrong';

  useEffect(() => {
    if (code && state) {
      if (window.opener) {
          window.opener.postMessage({code, state}, 'http://localhost:3000');
          window.close();
        } else if (error) {
        // Send the error info to the opener window if OAuth failed
        window.opener.postMessage(
          { error, error_description: errorDescription },
          'https://app-dev-main.socialpilot.co'
        );
        window.close();
      } else {
          console.warn('No opener window to post message to.');
        }
    }
  }, []);

  return (
    <div>AuthCallback</div>
  )
}

export default AuthCallback