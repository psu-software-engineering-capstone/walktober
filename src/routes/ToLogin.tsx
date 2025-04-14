import React from 'react';
import { Redirect } from 'react-router';

const ToLogin: React.FC = () => {
  return (
    <>
      <Redirect to="/login" />
    </>
  );
};

export default ToLogin;
