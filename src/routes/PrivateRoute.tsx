import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to={'/signin'} replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
