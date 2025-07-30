import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ReturnNav = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const correlationJwt = searchParams.get('correlation_jwt');

  useEffect(() => {
    let domain;
    try {
      const domainParam = searchParams.get('domain');
      if (domainParam) {
        domain = JSON.parse(domainParam);
      }
    } catch (e) {
      // ignore
    }

    try {
      if (!correlationJwt) throw new Error('Missing correlation_jwt');
      if (!window.opener) throw new Error('No opener window');

      const decoded = jwtDecode(correlationJwt);
      const { correlation_state, design_id: designId } = decoded || {}; // eslint-disable-line camelcase
      const correlationStateDecoded = jwtDecode(correlation_state); // eslint-disable-line camelcase
      const { domain: decodedDomain, type, tab, category } =
        correlationStateDecoded || {};

      domain = decodedDomain;

      if (domain && designId) {
        window.opener.postMessage({ designId, type, tab, category }, domain);
        console.log('Message sent to opener.');
      } else {
        throw new Error('Missing domain or designId');
      }
    } catch (err) {
      console.error('Error:', err.message);
      window.opener?.postMessage({ errorMessage: err.message }, domain);
    } finally {
      window.close();
    }
  }, []);

  return <div>ReturnNav</div>;
};

export default ReturnNav;
