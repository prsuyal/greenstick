import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ApplyPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Apply - Greenstick</title>
        <style type="text/css">{`
          html, body { margin: 0; height: 100%; overflow: hidden; }
          #tally-iframe { position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: 0; width: 100%; height: 100%; }
        `}</style>
      </Helmet>
      <iframe 
        data-tally-src="https://tally.so/r/n9vx4Q?transparentBackground=1" 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        marginHeight="0" 
        marginWidth="0" 
        id="tally-iframe"
        title="Greenstick Application Form"
      ></iframe>
    </>
  );
};

export default ApplyPage;