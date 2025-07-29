import React, {useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  let state = null;
try {
  state = JSON.parse(searchParams.get('state'));
  console.log(state,"State")
} catch (e) {
  console.error('Invalid state');
}  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description') ||'something went wrong';

  useEffect(() => {
    if (code && state) {
      console.log(state)
      if (window.opener) {
        console.log(window.opener);               // Should not be null
        console.log(window.opener.location.href); // Throws error if cross-origin

        console.log(state.domain)
          window.opener.postMessage({code, state}, `${state.domain}`);
          console.log("message has been sended")
          window.close();
        } else if (error) {
        // Send the error info to the opener window if OAuth failed
        window.opener.postMessage(
          { error, error_description: errorDescription },
         `${state.domain}`
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