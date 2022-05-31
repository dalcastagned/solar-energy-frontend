import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PieChartIcon from '@mui/icons-material/PieChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Menu } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuth } from 'hooks/auth';
import { useHistory } from 'react-router-dom';

import * as S from './styles';

type LayoutProps = {
  children?: React.ReactNode;
  Title?: string;
};

const Layout = ({ children, Title }: LayoutProps): JSX.Element => {
  const { signOut, user } = useAuth();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = (): void => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleLogout = (): void => {
    signOut();
    history.push('/');
  };

  const routes = [
    {
      id: '1',
      path: '/dashboard',
      title: 'Dashboard',
      icon: PieChartIcon,
    },
    {
      id: '2',
      path: '/plants',
      title: 'Unidade Consumidora',
      icon: ShowChartIcon,
    },
    {
      id: '3',
      path: '/generation',
      title: 'Cadastro de Energia Gerada',
      icon: SettingsIcon,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <S.AppBar position="fixed" open={open}>
        <Toolbar>
          <S.IconButtonStyled
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            open={open}
          >
            <MenuIcon />
          </S.IconButtonStyled>
          <S.ContainerAppBar>
            <Typography variant="h4" noWrap component="div">
              {Title}
            </Typography>
            <IconButton
              onClick={handleClickAvatar}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={anchorEl ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
            >
              <S.AvatarStyled>
                {user?.user.substring(0, 1).toUpperCase()}
              </S.AvatarStyled>
            </IconButton>
          </S.ContainerAppBar>
        </Toolbar>
      </S.AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleCloseAvatar}
        onClick={handleCloseAvatar}
        PaperProps={{
          elevation: 0,
          sx: { ...S.PaperStyles },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <S.MenuItemStyled sx={{ fontSize: '1.6rem' }} onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </S.MenuItemStyled>
      </Menu>
      <S.DrawerStyled variant="persistent" anchor="left" open={open}>
        <S.DrawerHeader>
          <S.Logo>
            <img src="/img/mini-logo.png" alt="Logo" />
          </S.Logo>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </S.DrawerHeader>
        <List sx={{ paddingTop: '2rem' }}>
          {routes.map(item => (
            <S.ItemList key={item.id}>
              <ListItemButton
                onClick={() => history.push(item.path)}
                selected={history.location.pathname.search(item.path) !== -1}
              >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </S.ItemList>
          ))}
        </List>
      </S.DrawerStyled>
      <S.Main open={open}>
        <S.DrawerHeader />
        {children}
      </S.Main>
    </Box>
  );
};

export default Layout;
