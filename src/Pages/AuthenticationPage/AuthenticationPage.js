import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Grid,
  Container,
  Snackbar,
} from "@material-ui/core";
import useStyles from "./styles.js";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Input from "../../components/Input/Input.js";
import { GoogleLogin } from "react-google-login";
import authServices from "../../services/auth/authServices";
import { useDispatch } from "react-redux";
import { googleLogin, signin, signup } from "../../redux/slices/auth.js";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function ErrorAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AuthenticationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  var [formError, setFormError] = useState({
    message: "",
    open: false,
    status: "success",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const isSignUp = true;
  const onLoginSuccess = () => {
    history.push("/home");
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        const res = await authServices.SignUp(formData);
        dispatch(signup(res.data));
        onLoginSuccess();
        setFormError({
          message: res.data.message,
          open: true,
          status: "success",
        });
      } catch (error) {
        setFormError({
          message: "Kindly, Fill all fields correctly!",
          open: true,
          status: "error",
        });
      }
    } else {
      delete formData.firstName;
      delete formData.lastName;
      delete formData.confirmPassword;
      try {
        const res = await authServices.SignIn(formData);
        dispatch(signin(res.data));
        onLoginSuccess();
        setFormError({
          message: res.data.message,
          open: true,
          status: "success",
        });
      } catch (error) {
        setFormError({
          message: "Invalid Credentials!",
          open: true,
          status: "error",
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchMode = () => {
    setIsSignUp((prevValue) => !prevValue);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccess = async (res) => {
    const userData = {
      data: res?.profileObj,
      token: res?.tokenId,
    };
    try {
      dispatch(googleLogin(userData));
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Authentication Failed!");
  };

  const Icon = () => {
    return (
      <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
        />
      </svg>
    );
  };

  return (
    <Container component="main" maxWidth="sm">
      <Snackbar
        open={formError.open}
        autoHideDuration={3000}
        onClose={() => setFormError({ ...formError, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <ErrorAlert
          onClose={() => setFormError({ ...formError, open: false })}
          severity={formError.status}
        >
          {formError.message}
        </ErrorAlert>
      </Snackbar>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleAuthSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  type="text"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  type="text"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                <LockOpenIcon style={{ margin: "0px 8px" }} />
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </Grid>

            {/* <Grid item xs={12} sm={6} lg={6}>
                <GoogleLogin
                clientId="225525843782-dh5m8ics7gaoqt871srdiha2q2514p6t.apps.googleusercontent.com"
                render={(renderProps) => (
                    <Button className={classes.submit} color="primary" fullWidth 
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled} 
                    startIcon={<Icon/>} 
                    variant="contained">
                        Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
                />
            </Grid> */}
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={handleSwitchMode} className={classes.submit}>
                {isSignUp ? `Already have` : `Don't have`} an account ?{" "}
                {isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthenticationPage;
