import { Avatar, Button, List, ListItem, Popover, Link } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom'
import { logout } from '../../actions/user';

const styles = (theme) => {
  console.log(theme);
  return {
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%",
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    userAvatar: {
      flex: "2 2 100% "
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 'small',
      textTransform: 'uppercase',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }
};

const AvatarComp = (props) => {
  const {classes} = props
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

  const handleLogout = ()=>{
    localStorage.removeItem("seller-account");
    dispatch(logout());
    window.location.reload();
  }
	const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  return (
    <div>
       <Avatar onClick={handleClick} className={`${classes.purple} ${classes.small}`}>
         {user.first_name.slice(0,1)}
        </Avatar>
       <Popover
				id={id}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
			>
				<List>
					<ListItem className={classes.listItem} style={{padding: 0}}>
						<Link
            className={classes.buttonAccount}
            style={{padding: '.5rem 2rem', textTransform: 'none', textDecoration: 'none'}}
            to={'/my-account'}
            color="secondary"
            fullWidth component={RouteLink}>
							Tài khoản
						</Link>
					</ListItem>
					<ListItem className={classes.listItem} style={{padding: 0}}>
						<Link
            className={classes.buttonLogout}
            style={{padding: '.5rem 2rem', textTransform: 'none', textDecoration: 'none'}}
            to='/'
            color="secondary"
            fullWidth
            component={RouteLink}
            onClick={handleLogout}>
							Đăng xuất
						</Link>
					</ListItem>
				</List>
			</Popover>
    </div>
  )
}

export default withStyles(styles)(AvatarComp)
