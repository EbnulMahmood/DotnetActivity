import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useStore } from '../stores/store';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export default observer(function NavBar() {

    const {userStore: {user, logout}} = useStore();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    <Avatar alt="LOGO" src="/assets/logo.png" />
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    <Link to="/activities">
                        <MenuItem key='Activities'>
                            <Typography textAlign="center">Activities</Typography>
                        </MenuItem>
                    </Link>
                    <Link to="/errors">
                        <MenuItem key='Errors'>
                            <Typography textAlign="center">Errors</Typography>
                        </MenuItem>
                    </Link>
                    <Link to="/createActivity">
                        <MenuItem key='Create Activity'>
                            <Typography textAlign="center">Create Activity</Typography>
                        </MenuItem>
                    </Link>
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    <Avatar alt="LOGO" src="/assets/logo.png" />
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Link to="/activities">
                        <Button
                            type='button'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Activities
                        </Button>
                    </Link>
                    <Link to="/createActivity">
                        <Button
                            type='button'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Create Activity
                        </Button>
                    </Link>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt={user?.username}
                            src={user?.image || '/assets/user.png'} />
                    </IconButton>
                    </Tooltip>
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
                    <Link to={`/profile/${user?.username}`}>
                        <MenuItem key='profile'>
                            <Typography textAlign="center">{user?.displayName}</Typography>
                        </MenuItem>
                    </Link>
                    <MenuItem key='logout' onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
})