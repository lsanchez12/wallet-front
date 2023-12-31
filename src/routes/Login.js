import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import http from "../config/axios";
import { Navigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { customToast } from "../utils/";
import { setUser } from "../services/slices/userSlice";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "The length must be greater than or equal to 8";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      login(values);
    },
  });

  const login = async (values) => {
    http
      .post("/api/login", {
        ...values,
      })
      .then((response) => {
        if (!response.data.success) {
          customToast("Error", response.data.message);
        } else {
          customToast("Success", response.data.message);
          dispatch(setUser(response.data.data));
        }
      })
      .catch((error) => {
        console.error(error);
        customToast("Error", error.response.data.message);
      });
  };
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to={"/signUp"}>
            <Button
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
