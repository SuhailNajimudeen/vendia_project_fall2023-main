import * as React from 'react'
import { Box, Button, CssBaseline, styled, useTheme, Toolbar, Typography, 
  IconButton, List } from '@mui/material'
import python from './python.png'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DevicesIcon from '@mui/icons-material/Devices'
import AddToQueueIcon from '@mui/icons-material/AddToQueue'
import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase'
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  background: '#2E3B55',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background: '#2E3B55',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)


export default function Header (){

    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user)
        } else {
          setCurrentUser(null)
        }
      });
  
      return () => unsubscribe()
    }, [])

    const handleSignOut = async () => {
      try {
        await signOut(auth)
          setCurrentUser(null)
      } catch (error) {
        console.error('Sign out error:', error)
      }
    }
  

    const handleDrawerOpen = () => {
      setOpen(true)
    }
    const handleDrawerClose = () => {
      setOpen(false)
    }
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" position="fixed" open={open} >
  
        <Toolbar >
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
        >
          <ChevronRightIcon />
        </IconButton>

        <Typography
          align='left'
          variant="h5"
          style={{fontWeight: "bold"}}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <img src={python} width={30} height={30} alt='pythonLogo'/>
          {"   Monty Pythons"}
        </Typography>
            
            {currentUser && (
              <>
                  <Typography variant="h6">Current User: {currentUser.email}</Typography>
                  <Button onClick={handleSignOut} color="inherit">
                    Sign Out
                  </Button>
              </>
            )}
            {!currentUser && (
              <Button component={RouterLink} to="/Sign_in" color="inherit">
                Sign In
              </Button>
            )}
        </Toolbar>
  
        </AppBar>
        <Drawer variant="permanent" open={open} PaperProps={{ sx: {backgroundColor: '#778196'}}}>
  
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} >
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
            </IconButton>
          </DrawerHeader>
  
          <List>
            <ListItemButton component={RouterLink} to='/Home'> 
              <ListItemIcon> 
                {<HomeIcon />} 
              </ListItemIcon> 
              <ListItemText primary={"Home"} /> 
            </ListItemButton> 
            <ListItemButton component={RouterLink} to='/DeviceList'> 
              <ListItemIcon> 
                {<DevicesIcon />} 
              </ListItemIcon> 
              <ListItemText primary={"View Devices"} /> 
            </ListItemButton> 
            <ListItemButton component={RouterLink} to='/AddDevice'> 
              <ListItemIcon> 
                {<AddToQueueIcon />} 
              </ListItemIcon> 
              <ListItemText primary={"Add Device"} /> 
            </ListItemButton> 
            <ListItemButton component={RouterLink} to='#'> 
              <ListItemIcon> 
                {<AccountBoxIcon />} 
              </ListItemIcon> 
              <ListItemText primary={"View Users"} /> 
            </ListItemButton> 
          </List>

          </Drawer>
      </Box>
    )
  }