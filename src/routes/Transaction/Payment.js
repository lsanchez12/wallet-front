import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import http from "../../config/axios";
import {formatCurrency} from "../../utils"
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { debitBalance } from "../../services/slices/walletSlice";

const validate = (values) => {
  const errors = {};

  if (!values.token) {
    errors.token = "Required";
  } else if (values.token.toString().length < 6) {
    errors.token = "The length must be equal to 6";
  } 

  return errors;
};

export default function Payment({ open, handleClose, transactionUuid, total, callbackRefresh }) {
  const balance = useSelector((state) => state.wallet.balance);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validate,
    onSubmit: async (values, helpers) => {
      console.info(values);
      const { data } = await chargeWallet(values);
      dispatch(debitBalance(total));
      if (data.success) {
        formik.resetForm();
      }
      callbackRefresh();
      handleClose();
    },
  });

  const chargeWallet = async (values) => {
    return http.post(`/api/transaction/${transactionUuid}/payment`, {
      ...values,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>Payment transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the token that was sent by email
            <Typography variant="h7" component="div" color="text.primary" gutterBottom>
              {`Total: ${formatCurrency(total)}`}
            </Typography>
            <Typography variant="h7" component="div" color="text.primary" gutterBottom>
              {`Amount avaible: ${formatCurrency(balance)}`}
            </Typography>
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            required
            fullWidth
            id="token"
            label="Token"
            name="token"
            onChange={formik.handleChange}
            value={formik.values.token}
            error={!!formik.errors.token}
            helperText={formik.errors.token}
            type="number"
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
            Pay
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
