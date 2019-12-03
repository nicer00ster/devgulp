import React from 'react';
import EnhancedError from '../components/kit/error';

function Error({ statusCode }) {
  return <EnhancedError statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
