import { Avatar, Box, Button, Checkbox, FormControlLabel, FormHelperText, Grid, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Field, Form, withFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Copyright from '../Copyright/Copyright';
import ThemeSwitchIcon from '../ThemeSwitchIcon/ThemeSwitchIcon';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axiosJsonServer } from '../../ultils/api';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import DialpadTwoToneIcon from '@material-ui/icons/DialpadTwoTone';
import * as Yup from 'yup';
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

const LoginForm = (props) => {
  const classes = useStyles();
  const {values} = props;
  const currentUser = useSelector(state => state.user);
  const [currentWay, setCurrentWay] = useState('email');

  const handleSubmit = (e) => {
    logIn(values, currentWay);
    //window.location.reload();
    //e.preventDefault();
  }
  const handleSwitchLoginWay = (e) => {
    setCurrentWay(currentWay === 'email' ? 'phone' : 'email');
  }
  function logIn(loginInfo, loginWay) {
    let statement = loginWay === 'email' ?
      `email=${loginInfo.email}&password=${loginInfo.password}` :
      `phone_number=${loginInfo.phone_number}&password=${loginInfo.password}`;
    
    axiosJsonServer.get(`/seller_account?${statement}`)
      .then((res) => {
        let user = res.data[0];
        if (Boolean(user)) {
          if (loginInfo.rememberMe) {
            console.log(user);
            localStorage.setItem('seller-account', JSON.stringify(user))
          }
          localStorage.setItem('seller-account', JSON.stringify(user))
          window.location.reload(true);
        } else {
          console.log('unlogged')
        }
      }).catch(e => {});
  }

  return (
    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item>
          <ThemeSwitchIcon />
        </Grid>
      </Grid>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
            </Typography>
        <Form className={classes.form} noValidate action="/">
          <IconButton style={{ paddingBottom: 0 }} aria-label="switch-login-button" color="primary" onClick={handleSwitchLoginWay}>
            {currentWay === 'email' ? <EmailTwoToneIcon /> : <DialpadTwoToneIcon />}
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
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox checked={props.values.rememberMe} color="primary" {...field} />
                }
                label="Remember me"
              />
            )} />
          <Button
            onClick={handleSubmit}
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
  )
}
export default compose(withFormik(formikForm))(LoginForm);