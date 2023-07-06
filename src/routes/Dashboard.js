import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import http from "../config/axios";
import { formatCurrency } from "../utils/";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWallet, setBalance } from "../services/slices/walletSlice";

import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 65,
      height: 65,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const wallet = useSelector((state) => state.wallet.wallet);
  const balance = useSelector((state) => state.wallet.balance);

  const [toggleView, setToggleView] = useState(false);

  const dispatch = useDispatch();

  const handleToggleButton = () => {
    setToggleView(!toggleView);
  };

  const getWallet = async () => {
    http
      .get(`/api/wallet/${user.id}`)
      .then((response) => {
        dispatch(setWallet(response.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBalance = async () => {
    http
      .get(`/api/wallet/${wallet}/balance`)
      .then((response) => {
        dispatch(setBalance(response.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (toggleView) getBalance();
  }, [toggleView]);

  return (
    <>
      <Container maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Avatar
                  {...stringAvatar(`${user.first_name} ${user.last_name}`)}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.primary"
                  gutterBottom
                >
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {`ID: ${user.document}`}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {`Phone number:${user.phone_number}`}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Fab
                  color={toggleView ? "error" : "success"}
                  size="small"
                  aria-label="add"
                  onClick={handleToggleButton}
                >
                  {toggleView ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </Fab>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={1} justifyContent="space-around">
              <Grid item xs={9}>
                <Typography variant="h5" component="div">
                  {`Wallet ${wallet}`}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5" component="div">
                  {`${
                    toggleView
                      ? formatCurrency(balance ? balance : 0)
                      : "$ ***,**"
                  }`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button fullWidth>Charge</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
