"use client";
import "./paymentStyle.css";
import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Button,
  Input,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  TablePagination,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material/";
import { todayDate } from "../../Components/StaticData";
import Autocomplete from "@mui/material/Autocomplete";
import { FcFullTrash, FcSearch, FcPrint } from "react-icons/fc";
import { MdDoneAll, MdClearAll } from "react-icons/md";
import { useImgUpload } from "@/app/hooks/auth/useImgUpload";
import { payReceiveService } from "@/app/services";
import NoResult from "@/app/Components/NoResult/NoResult";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";

function Payment({ receipt, paymentVoucher, receiptVoucher }) {
  const [_id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [tranDate, setDate] = useState("");
  const [voucher, setVoucher] = useState("");
  const [cb, setCb] = useState("");
  const [ledger, setLedger] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState(null);
  const [remark, setRemark] = useState("");
  const [reminderDate, setRemind] = useState("");
  const [url, setDocUrl] = useState("");
  const [loadingDoc, setLoadingDoc] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [allLedgers, setAllLed] = useState([]);
  const [allModes, setModes] = useState([]);
  const [result, setResult] = useState([]);
  const snackRef = useRef();

  useEffect(() => {
    // Getting date from Voucher in URL
    async function getVoucher() {
      let voucherUrl = "";
      if (paymentVoucher) {
        voucherUrl = `api/v1/account/payment/getPayment/getByVoucher/payment/${paymentVoucher}`;
      } else if (receiptVoucher) {
        voucherUrl = `api/v1/account/payment/getPayment/getByVoucher/receipt/${receiptVoucher}`;
      }
      let res = await payReceiveService.getPayRec(voucherUrl);
      if (res.variant === "success") {
        handleClear(res.data);
        snackRef.current.handleSnack(res);
      } else {
        snackRef.current.handleSnack(res);
        console.log(res);
      }
    }
    if (paymentVoucher || receiptVoucher) {
      getVoucher();
    }
  }, [paymentVoucher, receiptVoucher]);

  const getResult = async () => {
    setLoading(true);
    let baseUrl;
    if (receipt) {
      baseUrl = `api/v1/account/receipt/getReceipt/getDataWithPage/${rowsPerPage}/${page}/${searchText}`;
    } else
      baseUrl = `api/v1/account/payment/getPayment/getDataWithPage/${rowsPerPage}/${page}/${searchText}`;
    let res = await payReceiveService.getPayRec(baseUrl);
    if (res.variant === "success") {
      setLoading(false);
      setResult(res.data);
      setTotalCount(res.totalCount);
    } else {
      snackRef.current.handleSnack(res);
      setLoading(false);
      console.log(res);
    }
  };
  useEffect(() => {
    getResult();
    return () => {
      setResult([]);
    };
  }, [searchText, page, rowsPerPage]);

  useEffect(() => {
    // Getting all the Ledgers
    async function getLedger() {
      let res = await payReceiveService.getPayRec(
        `api/v1/account/payment/getPayment/dropdown/getLedger`
      );
      if (res.variant === "success") {
        setAllLed(res.data);
        let payMode = res.data.filter(
          (f) => f.group === "Cash in Hand" || f.group === "Bank Accounts"
        );
        setModes(payMode);
      } else {
        snackRef.current.handleSnack(res);
        console.log(res);
      }
    }
    getLedger();
  }, []);

  const imgUpload = async (e) => {
    setLoadingDoc(true);
    let url = await useImgUpload(e);
    if (url) {
      setDocUrl(url);
      setLoadingDoc(false);
    } else {
      snackRef.current.handleSnack({
        message: "Image Not Selected",
        info: "warning",
      });
      setLoadingDoc(false);
    }
  };

  useEffect(() => {
    setDate(todayDate());
  }, []);
  const handleSubmit = async () => {
    let myData = {
      _id,
      tranDate,
      voucher,
      ledger,
      amount,
      mode,
      remark,
      reminderDate,
      url,
    };
    let baseUrl;
    if (receipt) {
      baseUrl = `api/v1/account/receipt/addReceipt/${_id}`;
    } else baseUrl = `api/v1/account/payment/addPayment/${_id}`;
    let res = await payReceiveService.savePayRec(baseUrl, myData);
    if (res.variant === "success") {
      snackRef.current.handleSnack(res);
      handleClear();
      await getResult();
    } else {
      snackRef.current.handleSnack(res);
      console.log(res);
    }
  };
  const handleClear = (d) => {
    setId(d ? d?._id : "");
    setDate(d ? d?.tranDate : todayDate());
    setVoucher(d ? d?.voucher : "");
    setLedger(d ? d?.ledger : null);
    setAmount(d ? d?.amount : "");
    setMode(d ? d?.mode : null);
    setRemark(d ? d?.remark : "");
    setRemind(d ? d?.reminderDate : "");
    setDocUrl(d ? d?.url : "");
  };
  async function deleteData() {
    let y = confirm(
      `Are you sure, you want to delete: ${ledger?.label}, Amount: $ ${amount} ?`
    );
    if (y) {
      let baseUrl;
      if (receipt) {
        baseUrl = `api/v1/account/receipt/addReceipt/deleteOne/${_id}`;
      } else baseUrl = `/api/v1/account/payment/addPayment/deleteOne/${_id}`;
      let res = await payReceiveService.deletePayRec(baseUrl);
      if (res.variant === "success") {
        getResult();
        snackRef.current.handleSnack(res);
        handleClear();
      } else {
        snackRef.current.handleSnack(res);
        console.log(res);
      }
    }
  }
  return (
    <main>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            background: "#fff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                color="secondary"
                style={{ fontFamily: "Courgette" }}
                variant="h6"
                align="center"
              >
                {receipt ? "Receipt" : "Payment"} Voucher
              </Typography>
              <Typography
                color="darkslateblue"
                style={{ fontFamily: "Courgette" }}
                variant="subtitle2"
                align="center"
              >
                {receipt
                  ? "Someone is Giving Money to the Company"
                  : "Company is Giving Money to Someone"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={tranDate}
                sx={{ maxWidth: "130px" }}
                onChange={(e) => setDate(e.target.value)}
                label={receipt ? "Receipt Date" : "Payment Date"}
                size="small"
                type="date"
                focused
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                {voucher && (
                  <Grid sx={{ display: { xs: "block", md: "none" } }}>
                    {" "}
                    <a
                      target="_blank"
                      href={`/print/${
                        receipt ? "receipt" : "payment"
                      }/${voucher}`}
                      rel="noopener noreferrer"
                    >
                      <Tooltip title="Print" arrow>
                        <IconButton color="secondary" aria-label="Print-Out">
                          <FcPrint />
                        </IconButton>
                      </Tooltip>
                    </a>{" "}
                  </Grid>
                )}
                <Divider
                  flexItem
                  light
                  orientation="vertical"
                  sx={{
                    margin: "0px 5px",
                    display: { xs: "block", md: "none" },
                  }}
                />

                {voucher && (
                  <Typography
                    color="teal"
                    sx={{
                      fontSize: { xs: "12px", md: "16px" },
                      marginTop: "10px",
                      fontFamily: "Courgette",
                    }}
                    align="right"
                  >
                    Voucher : {voucher}
                  </Typography>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                options={allLedgers}
                onChange={(e, v) => {
                  setLedger(v);
                }}
                value={ledger}
                groupBy={(option) => option.group}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option._id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    fullWidth
                    label={
                      receipt
                        ? "Select Ledger for Receipt"
                        : "Select Ledger for Payment"
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label="Amount ($)"
                size="small"
                type="number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                options={allModes}
                onChange={(e, v) => {
                  setMode(v);
                }}
                value={mode}
                groupBy={(option) => option.group}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option._id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    helperText="Ledger Under Group Cash-in-Hand or Bank"
                    fullWidth
                    label={
                      receipt ? "Select Receipt Mode" : "Select Payment Mode"
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={remark}
                multiline
                onChange={(e) => setRemark(e.target.value)}
                label="Narration / Remark"
                placeholder="Type any Remark here..."
                size="small"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Document (If Any)"
                size="small"
                disabled={loadingDoc}
                helperText="PDF and Image Files are allowed"
                inputProps={{ accept: "image/*, application/pdf" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {loadingDoc && <CircularProgress size={25} />}{" "}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => imgUpload(e.target.files[0])}
                type="file"
                focused
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4} className="center">
              <TextField
                value={reminderDate}
                helperText="If you want to be reminded  in future"
                onChange={(e) => setRemind(e.target.value)}
                label="Reminder Date"
                size="small"
                type="date"
                focused
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: { xs: "10px", md: "100px" } }}>
              <Grid container justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() => handleClear()}
                  size="small"
                  startIcon={<MdClearAll />}
                >
                  Clear
                </Button>
                {voucher && (
                  <Grid sx={{ display: { xs: "none", md: "block" } }}>
                    {" "}
                    <a
                      target="_blank"
                      href={`/print/${
                        receipt ? "receipt" : "payment"
                      }/${voucher}`}
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<FcPrint />}
                        sx={{
                          color: "#fff",
                          borderRadius: "20px",
                          padding: "5px 20px",
                        }}
                      >
                        Print
                      </Button>
                    </a>
                  </Grid>
                )}
                <Button
                  variant="contained"
                  onClick={() => handleSubmit()}
                  size="small"
                  startIcon={<MdDoneAll />}
                  sx={{
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "0px 20px",
                  }}
                >
                  {_id ? "Update" : "Save"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => deleteData()}
                  size="small"
                  disabled={!_id}
                  startIcon={<FcFullTrash />}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} md={0.2} className="center">
          <Divider variant="fullWidth" orientation="vertical" />
        </Grid>

        <Grid
          item
          xs={12}
          md={3.5}
          sx={{ marginTop: { xs: "20px", md: "0px" } }}
          className="boxEffect"
        >
          <Grid container>
            <Grid item xs={12} sx={{ padding: "10px" }}>
              <Input
                autoFocus
                disableUnderline
                sx={{ padding: "10px" }}
                onChange={(e) => setSearchText(e.target.value)}
                className="boxEffect"
                startAdornment={
                  <FcSearch style={{ fontSize: "24px", marginRight: "10px" }} />
                }
                fullWidth
                placeholder="Search By : Party Name / Voucher No."
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: "10px 0px" }}>
                Search Result ({totalCount})
              </Divider>
              {loading ? (
                <div className="center">
                  <CircularProgress size={30} />{" "}
                </div>
              ) : loading === false && result.length === 0 ? (
                <NoResult label="No Result Available" />
              ) : null}
              <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
                {result.map((r, i) => (
                  <ListItem key={i} divider disableGutters>
                    <ListItemButton
                      alignItems="flex-start"
                      onClick={() => handleClear(r)}
                    >
                      <ListItemAvatar>
                        <Avatar alt={r?.ledgerLabel} src={r?.ledgerImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {" "}
                            <Typography color="darkgreen" variant="body2">
                              {r?.ledgerLabel}
                            </Typography>{" "}
                            <Typography
                              color="darkcyan"
                              align="right"
                              variant="body2"
                            >
                              SL {page * rowsPerPage + (i + 1)}
                            </Typography>
                          </div>
                        }
                        secondary={`Amount : $ ${r?.amount}, On : ${r?.tranDate}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={result.length}
                sx={{ overflowX: "hidden" }}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, v) => setPage(v)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MySnackbar ref={snackRef} />
    </main>
  );
}

export default Payment;
