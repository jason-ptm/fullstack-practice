import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { StorageService } from '../../services/StorageService';
import ResponsiveAppBar from './ResponsiveAppBar';
import { MenuListItem } from './SideBar/MenuList';

const menuListItems: MenuListItem[] = [
  {
    label: 'Inicio',
    icon: HomeIcon,
    link: routes.home.absoluteRoute
  },
  {
    label: 'Mis posts',
    icon: DynamicFeedIcon,
    link: routes.myPosts.absoluteRoute
  },
]

const PrivateContainer: React.FC = () => {
  const accessToken = StorageService.getAccessToken()

  return !accessToken ? <Navigate to={routes.auth.absoluteRoute} replace={true} /> : <ResponsiveAppBar menuListItems={menuListItems} />;
};

export default PrivateContainer;
