import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import http from "../config/axios";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";

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

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignUp = () => {
  const [loged, setLoged] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const login = async () => {
  //   await http.get("/sanctum/csrf-cookie");
  //   http
  //     .post("/api/login", {
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       setLoged(true);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  if (loged) {
    return <Navigate to="/dashboard" replace={true} />;
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
