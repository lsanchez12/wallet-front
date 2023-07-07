import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import PaymentIcon from "@mui/icons-material/Payment";
import PaidIcon from "@mui/icons-material/Paid";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/";
import FormPayment from "./Payment";

export default function Transactions({ callbackRefresh }) {
  const transaction = useSelector((state) => state.transaction.transaction);
  const [openPayment, setOpenPayment] = useState(false);
  const [transactionUuid, setTransactionUuid] = useState(null);
  const [total, setTotal] = useState(null);

  const handleOpenPayment = (uuid, amount) => {
    setOpenPayment(true);
    setTransactionUuid(uuid);
    setTotal(amount);
  };
  const handleClosePayment = () => {
    setOpenPayment(false);
    setTransactionUuid(null);
  };

  return (
    <>
      {transaction.length
        ? transaction.map((item) => (
            <>
              <ListItem
                secondaryAction={
                  <>
                    <Tooltip
                      title={
                        item.status === "PAID" ? "Paid" : "Pending payment"
                      }
                    >
                      <IconButton
                        edge="end"
                        aria-label="payment"
                        onClick={() =>
                          handleOpenPayment(item.transaction_uuid, item.amount)
                        }
                        color="error"
                        disabled={item.status === "PAID" ? true : false}
                      >
                        {item.status === "PAID" ? (
                          <PaidIcon />
                        ) : (
                          <PaymentIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>{item.id}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.transaction_uuid}
                  secondary={`Date:${new Date(
                    item.created_transaction
                  ).toLocaleString()} ${formatCurrency(item.amount)}`}
                />
              </ListItem>
              <Divider />
            </>
          ))
        : Array.from({ length: 12 }, (x, i) => i).map((item) => (
            <Skeleton animation="wave" />
          ))}
      <FormPayment
        open={openPayment}
        handleClose={handleClosePayment}
        transactionUuid={transactionUuid}
        total={total}
        callbackRefresh={callbackRefresh}
      />
    </>
  );
}
