import React from 'react';
import { Redirect } from 'react-router';

const ToHome: React.FC = () => {
  return (
    <>
      <Redirect to="/app/home" />
    </>
  );
};

export default ToHome;
