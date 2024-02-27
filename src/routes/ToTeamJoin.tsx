import React from 'react';
import { Redirect } from 'react-router';

const ToTeamJoin: React.FC = () => {
  return (
    <>
      <Redirect to="/app/team/join" />
    </>
  );
};

export default ToTeamJoin;
