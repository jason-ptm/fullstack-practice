import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { logout } from '../../../modules/auth/auth.slice';
import { useAppDispatch } from '../../../redux/hooks';


export default function MenuLogoutItem() {
  const dispatch = useAppDispatch()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(logout())
  };

  return (
    <>
      <ListItemButton
        href='#'
        sx={{ paddingLeft: 2, backgroundColor: '#fff3' }}
        onClick={handleClick}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Cerrar sesión' />
      </ListItemButton>
    </>
  );
}
