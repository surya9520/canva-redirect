import React, {useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  let state = null;
try {
  state = JSON.parse(searchParams.get('state'));
} catch (e) {
  console.error('Invalid state');
}  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description') ||'something went wrong';

  useEffect(() => {
    if (code && state) {
      console.log(state)
      if (window.opener) {
          window.opener.postMessage({code, state}, `http://${state.domain}`);
          // window.close();
        } else if (error) {
        // Send the error info to the opener window if OAuth failed
        window.opener.postMessage(
          { error, error_description: errorDescription },
         `http://${state.domain}`
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