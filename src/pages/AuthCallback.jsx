import React, {useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription =
    searchParams.get('error_description') ||
    'Connect canva account to continue';

  let state = null;
  try {
    const stateParam = searchParams.get('state');
    if (stateParam) {
      state = JSON.parse(stateParam);
      console.log('State:', state);
    }
  } catch (e) {
    console.error('Invalid state JSON');
  }

  useEffect(() => {
    if (!state) {
      if(window.opener)
       window.opener.postMessage(
          { error, errorMessage: "something went wrong" },
          state.domain,
        );
      window.close();
      return;
    }

    if (window.opener) {
      console.log("window.opener");
      if (code) {
        console.log({code, state,domain:state.domain});
        window.opener.postMessage({ code, state }, state.domain);
      } else if (error) {
        window.opener.postMessage(
          { error, errorMessage: errorDescription },
          state.domain,
        );
      }
    }
    console.log()
    // window.close();
  }, []);

  return (
    <div>AuthCallback</div>
  )
}

export default AuthCallback