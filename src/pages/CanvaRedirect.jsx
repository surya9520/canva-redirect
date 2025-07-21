import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CanvaRedirect = () => {
  const { editUrl } = useParams();

  useEffect(() => {
    if (editUrl) {
      const decodedUrl = decodeURIComponent(editUrl);

      // Redirect to the decoded Canva URL
      window.location.href = decodedUrl;
    }
  }, [editUrl]);

  return <h1>Redirecting to Canva...</h1>;
};

export default CanvaRedirect;
