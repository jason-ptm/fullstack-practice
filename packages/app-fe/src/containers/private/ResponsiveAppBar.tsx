import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { routes } from '../../constants/routes';
import { stringAvatar } from '../../helpers/string.helper';
import { getAuthenticated, logout } from '../../modules/auth/auth.slice';
import { changeSearchFilterAction, findAllAction, initialState } from '../../modules/post/post.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SideBar from './SideBar';
import { MenuListItem } from './SideBar/MenuList';

const drawerWidth = 240;

interface Props {
    menuListItems: MenuListItem[]
}

export default function ResponsiveAppBar(props: Props) {
    const dispatch = useAppDispatch()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const authenticatedUser = useAppSelector(state => state.authenticator.authenticate.user)

    React.useEffect(() => {
        dispatch(getAuthenticated())
        dispatch(findAllAction({
            pagination: {
                page: initialState.list.meta.page,
                take: initialState.list.meta.take,
                order: 'DESC',
            },
            mine: false
        }))
    }, [])

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        dispatch(logout())
    }

    const handleInputSearchChange = (value?: string) => {
        dispatch(changeSearchFilterAction(value))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: '100%',
                }}
            >
                <Toolbar>

                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <SearchInput handleChange={handleInputSearchChange} handleVoidInput={() => { }} />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {
                                authenticatedUser.user.fullName && <Avatar {...stringAvatar(authenticatedUser?.user.fullName)} />
                            }
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='profile'>
                                <Link to={routes.profile.absoluteRoute} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" >Perfil</Typography>
                                </Link>
                            </MenuItem>

                            <MenuItem key='logout' onClick={handleLogoutClick}>
                                <Typography textAlign="center">Salir</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={contentBoxStyle}>
                <Box
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, p: 3, pr: 0 }}
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                    <SideBar menuListItems={props.menuListItems} />
                </Box>
                <Box
                    component="main"
                    sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ...mainBoxStyle }}
                >
                    <Outlet></Outlet>
                </Box>
            </Box>
        </Box>
    );
}

const mainBoxStyle = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '100%',
    overflow: 'auto',
    p: 3,
    pl: 0
}

const contentBoxStyle = {
    height: 'calc(100vh - 64px)',
    mt: '64px',
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    backgroundColor: '#e5e5f7',
    backgroundSize: '20px 20px',
    backgroundImage: 'radial-gradient(#eaeaea 1px, #fdfdfd 1px)',
    overflow: 'hidden'
}