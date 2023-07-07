import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import http from "../config/axios";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { customToast } from "../utils/";

const validate = (values) => {
  const errors = {};

  if (!values.document) {
    errors.document = "Required";
  }

  if (!values.first_name) {
    errors.first_name = "Required";
  }

  if (!values.last_name) {
    errors.last_name = "Required";
  }

  if (!values.phone_number) {
    errors.phone_number = "Required";
  } else if (
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      values.phone_number
    )
  ) {
    errors.phone_number = "Invalid phone number";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "The length must be greater than or equal to 8";
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = "Required";
  } else if (values.password_confirmation != values.password) {
    errors.password_confirmation = "Password does match";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignUp = () => {
  const user = useSelector((state) => state.user.user);
  const [register, setRegister] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      document: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
    validate,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  const signUp = async (values) => {
    http
      .post("/api/user", {
        ...values,
      })
      .then((response) => {
        if (response.data.success) {
          setRegister(true);
          customToast("Success", response.data.message);
        } else {
          customToast("Error", response.data.message);
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
        customToast("Error", error.response.data.message);
      });
  };
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  if (register) {
    return <Navigate to="/login" replace={true} />;
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
          Sign Up
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
            id="first_name"
            label="First name"
            name="first_name"
            autoComplete="first_name"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.first_name}
            error={!!formik.errors.first_name}
            helperText={formik.errors.first_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last name"
            name="last_name"
            autoComplete="last_name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            error={!!formik.errors.last_name}
            helperText={formik.errors.last_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="document"
            label="Document"
            name="document"
            autoComplete="document"
            onChange={formik.handleChange}
            value={formik.values.document}
            error={!!formik.errors.document}
            helperText={formik.errors.document}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone_number"
            label="Phone number"
            name="phone_number"
            autoComplete="phone_number"
            onChange={formik.handleChange}
            value={formik.values.phone_number}
            error={!!formik.errors.phone_number}
            helperText={formik.errors.phone_number}
            type={"tel"}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password confirmation"
            id="password_confirmation"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password_confirmation}
            error={!!formik.errors.password_confirmation}
            helperText={formik.errors.password_confirmation}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link to={"/login"}>
            <Button
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
