import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StorageService } from '../../services/StorageService';
import { routes } from '../../constants/routes';

const AuthContainer: React.FC = () => {

  const accessToken = StorageService.getAccessToken()

  return accessToken ? <Navigate to={routes.social.absoluteRoute} /> : <Outlet />;
};

export default AuthContainer
