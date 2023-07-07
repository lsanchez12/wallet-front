import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import http from "../config/axios";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { chargeBalance } from "../services/slices/walletSlice";
import { customToast } from "../utils";

const validate = (values) => {
  const errors = {};

  if (!values.amount) {
    errors.amount = "Required";
  } else if (isNaN(values.amount)) {
    errors.amount = "Invalid amount, is a numeric";
  } else if (values.amount < 1) {
    errors.amount = "Minimum recharge is 1";
  }

  return errors;
};

export default function ChargeWallet({ open, handleClose }) {
  const wallet = useSelector((state) => state.wallet.wallet);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validate,
    onSubmit: async (values, helpers) => {
      const { data } = await chargeWallet(values);
      if (data.success) {
        dispatch(chargeBalance(values.amount));
        formik.resetForm();
        handleClose();
        customToast("Success", data.message);
      } else {
        customToast("Error", data.message);
      }
    },
  });

  const chargeWallet = async (values) => {
    return http.post(`/api/wallet/${wallet}/charge`, {
      ...values,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>Recharge wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To load the wallet enter the amount
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            error={!!formik.errors.amount}
            helperText={formik.errors.amount}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!formik.dirty}>
            Charge
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
