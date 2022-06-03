import { Drawer, IconButton, ListItem, Avatar, MenuItem } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { styled } from '@mui/material/styles';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const Main = styled('main')<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: '2rem',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-26rem`,
  '@media screen and (max-width: 680px)': {
    marginLeft: 0,
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
  backgroundColor: '#fff',
  color: '#374557',
  fontWeight: 'bold',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 26rem)`,
    marginLeft: `26rem`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const IconButtonStyled = styled(IconButton)<{
  open?: boolean;
}>(({ open }) => ({
  mr: 2,
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
  ...(open && { display: 'none' }),
}));

export const DrawerStyled = styled(Drawer)(() => ({
  width: '26rem',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '26rem',
    boxSizing: 'border-box',
  },
  '& .MuiSvgIcon-root': { fontSize: '2.25rem' },
  '& .MuiTypography-root': { fontSize: '1.6rem' },

  '@media screen and (max-width: 680px)': {
    position: 'absolute',
  },
}));

export const Logo = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '3.85rem',

  '& img': {
    height: '5.5rem',
  },
}));

export const ItemList = styled(ListItem)(() => ({
  '& .MuiListItemButton-root': {
    borderRadius: '0.8rem',
  },
  '& .Mui-selected': {
    background: '#4CBC9A !important',
    color: '#fff',
    ':hover': { background: '#4CBC9AEE' },
    '& .MuiListItemIcon-root': { color: '#fff' },
  },
}));

export const ContainerAppBar = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const PaperStyles = {
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: '4rem',
    height: '4rem',
    ml: -0.5,
    mr: 1,
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 18,
    width: 10,
    height: 10,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

export const AvatarStyled = styled(Avatar)(() => ({
  width: '4rem',
  height: '4rem',
  backgroundColor: '#374557',
  fontSize: '1.6rem',
}));

export const MenuItemStyled = styled(MenuItem)(() => ({
  fontSize: '1.6rem',
  '& .MuiSvgIcon-root': { fontSize: '2rem' },
}));
