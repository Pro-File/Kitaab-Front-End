import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { IconButton } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { logout } from '../../redux/slices/auth';

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    useEffect(() => {
      const token = user?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()){
          handleLogOut()
        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
  const handleLogOut = () => {
    dispatch(logout())
    setUser(null);
    history.push('/')
  }

  return (
      <AppBar className={classes.appBar} position='static' color="inherit">
          <Typography className={classes.heading} variant="h5" align="center"> Kitaab </Typography>
      <Toolbar className= {classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
              {/* <Link to="/addBook">
              <Button variant='outlined'>Add Book</Button>
              </Link> */}
              <div className={classes.brandContainer}>
                 <Avatar className={classes.purple} alt={user.data.name} src={user.data.imageUrl}>{user.data.name.charAt(0)}</Avatar>
              </div>
                <Typography className={classes.userName} variant="subtitle1">{user.data.name}</Typography>
                <IconButton className={classes.logout} color="primary" onClick={handleLogOut}><PowerSettingsNewIcon/></IconButton>
                {/* <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogOut}>Logout</Button> */}
            </div>
        ): (
            <div>
            <Button component={Link} to="/" variant="contained" color="primary">Sign Up</Button>
            </div>
        )}
      </Toolbar>
      </AppBar>
  );

};

export default NavBar;
