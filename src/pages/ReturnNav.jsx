import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReturnNav = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const correlation_jwt = searchParams.get('correlation_jwt');

  const fetchUrls = async (token) => {
    const response = await fetch(`https://40klr9s0-4000.inc1.devtunnels.ms/navReturn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correlation_jwt: token }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const sendUrls = async () => {
      try {
          const { imageUrl, videoUrl } = await fetchUrls(correlation_jwt);

     
        let urlToSend = '';
        let type = '';

        if (imageUrl) {
          urlToSend = decodeURIComponent(imageUrl);
          type = 'image';
        } else if (videoUrl) {
          urlToSend = decodeURIComponent(videoUrl);
          type = 'video';
        } else {
          throw new Error('Neither imageUrl nor videoUrl found.');
        }
        // Send to opener window if available
        if (window.opener) {
          window.opener.postMessage({ urls: urlToSend, type }, 'https://canva-testing-frontend.vercel.app');
          window.close();
        } else {
          console.warn('No opener window to post message to.');
        }
      } catch (error) {
        console.error('Error fetching or posting URLs:', error);
      }
    };

    if (correlation_jwt) {
      sendUrls();
    }
  }, [correlation_jwt]);

  return <div>ReturnNav</div>;
};

export default ReturnNav;
