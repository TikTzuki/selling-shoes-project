import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';
import Copyright from '../../components/Copyright';
import themeMap from '../../ultils/themes/base';
import ThemeSwitchIcon from '../../components/ThemeSwitchIcon/ThemeSwitchIcon';
import { Link as RouterLink } from 'react-router-dom';
import { Field, Form, withFormik } from 'formik';
import { compose } from 'recompose';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import DialpadTwoToneIcon from '@material-ui/icons/DialpadTwoTone';
import { axiosJsonServer } from '../../ultils/api';
import { actionLogin } from '../../actions/user';

const formikForm = {
  mapPropsToValues() {
    return {
      email: '',
      phone_number: '',
      password: '',
      rememberMe: true
    }
  },
  validationSchema: Yup.object().shape({
    phone_number: Yup.string()
      .required('Phone number is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),

    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must have min 8 character'),
    rememberMe: Yup.boolean()
  })
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: '0'
  },
  themeButton: {
    zIndex: '10'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function LoginPage(props) {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user);
  const { multiTheme, values } = props;
  const [currentWay, setCurrentWay] = useState('email');
  const handleSubmit = (e) => {
    logIn(values,currentWay);
  }
  const handleSwitchLoginWay = (e)=>{
    setCurrentWay(currentWay==='email'? 'phone' : 'email');
  }
  async function logIn(loginInfo, loginWay){
    let statement = loginWay==='email' ? 
      `email=${loginInfo.email}&password=${loginInfo.password}` :
      `phone_number=${loginInfo.phone_number}&password=${loginInfo.password}`;
    
    await axiosJsonServer.get(`/seller_account?${statement}`)
      .then((res)=>{
        let user = res.data[0];
        if(Boolean(user)){
          if(loginInfo.rememberMe){
            console.log(user);
            localStorage.setItem('seller-account', JSON.stringify(user))
          }
          //window.location.reload(true);
        } else {
          console.log('unlogged')
        }
      }).catch(e=>{});
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
      </Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Grid item>
            <ThemeSwitchIcon multiTheme={multiTheme} />
          </Grid>
        </Grid>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
            </Typography>
          <Form className={classes.form} onSubmit={handleSubmit} noValidate>
            <IconButton style={{paddingBottom: 0}} aria-label="switch-login-button" color="primary" onClick={handleSwitchLoginWay}>
              {currentWay==='email' ? <EmailTwoToneIcon/> : <DialpadTwoToneIcon/>}
            </IconButton>
            {currentWay === 'email' ?
              <><Field
                id='email'
                name='email'
                render={({ field }) =>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    label="Email Address"
                    autoComplete="email"
                    fullWidth
                    autoFocus
                    {...field} />
                } />
                {<FormHelperText error>{props.errors.email}</FormHelperText>}</>
              :
              <><Field
                id='phone_number'
                name='phone_number'
                render={({ field }) =>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    label="Phone number"
                    fullWidth
                    autoFocus
                    {...field} />
                } />
                {<FormHelperText error>{props.errors.phone_number}</FormHelperText>}</>
            }
            <Field
              name='password'
              render={({ field }) =>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  {...field} />
              } />
              {<FormHelperText error>{props.errors.password}</FormHelperText>}
            <Field
              name="rememberMe"
              render={({field}) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={props.values.rememberMe} color="primary" {...field}/>
                  }
                  label="Remember me"
                />
              )} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
              </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" component={RouterLink} variant="body2">
                  Forgot password?
                  </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
}

export default compose(withFormik(formikForm))(LoginPage);

