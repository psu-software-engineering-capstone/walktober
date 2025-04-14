import React from 'react';
import { Redirect } from 'react-router';

const ToTeamHome: React.FC = () => {
  return (
    <>
      <Redirect to="/app/team" />
    </>
  );
};

export default ToTeamHome;
