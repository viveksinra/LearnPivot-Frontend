"use client";
import "./policyStyle.css";
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
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material/";
import { FcFullTrash, FcSearch, FcPrint } from "react-icons/fc";
import { MdDoneAll, MdClearAll } from "react-icons/md";
import { accessService, payReceiveService } from "@/app/services";
import NoResult from "@/app/Components/NoResult/NoResult";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";

function Policies({ policy }) {
  const [_id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [allPage, setAllPage] = useState([
    {
      page: "dashboard",
      actions: [
        { label: "create", value: true },
        { label: "edit", value: true },
        { label: "delete", value: true },
        { label: "find", value: true },
        { label: "get", value: true },
      ],
    },
    {
      page: "prospect",
      actions: [
        { label: "create", value: true },
        { label: "edit", value: true },
        { label: "delete", value: true },
        { label: "find", value: true },
        { label: "get", value: true },
      ],
    },
    {
      page: "resident",
      actions: [
        { label: "create", value: true },
        { label: "edit", value: true },
        { label: "delete", value: true },
        { label: "find", value: true },
        { label: "get", value: true },
      ],
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [result, setResult] = useState([]);
  const snackRef = useRef();

  const handleSubmit = async () => {
    let rolePolicyPayload = {
      role,
      permissions: allPage.map((p) => ({
        resource: p.page,
        actions: p.actions
          .map((a) => (a.value ? a.label : null))
          .filter((a) => a),
        specialPolicies: [],
      })),
    };

    let res = await accessService.saveAccess(_id, rolePolicyPayload);
    
    if (res.variant === "success") {
      snackRef.current.handleSnack(res);
      handleClear();
      // await getResult();
    } else {
      snackRef.current.handleSnack(res);
      console.log(res);
    }
  };

  const handleClear = (d) => {
    setId(d ? d?._id : "");
    setRole(d ? d?.role : "");
    setRole(d ? d?.role : "");
  };

  function toggleAccessPermission(pageIndex, actionIndex) {
    let pages = [...allPage];
    const p = pages[pageIndex];
    p.actions[actionIndex].value = !p.actions[actionIndex].value;
    setAllPage(pages);
    console.log(allPage);
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
                Policy
              </Typography>
              <Typography
                color="darkslateblue"
                style={{ fontFamily: "Courgette" }}
                variant="subtitle2"
                align="center"
              >
                Configure Access permissions for different roles
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={role}
                sx={{ maxWidth: "130px" }}
                onChange={(e) => setRole(e.target.value)}
                label={"Role Name"}
                size="small"
                focused
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                color="secondary"
                style={{ fontFamily: "Courgette" }}
                variant="h6"
                align="center"
              >
                Permissions
              </Typography>
              {allPage.map((p, pageIndex) => (
                <Grid container key={pageIndex}>
                  <Typography
                    color="secondary"
                    style={{ fontFamily: "Courgette", marginRight: "10px" }}
                    variant="h6"
                    align="center"
                  >
                    {p.page}
                  </Typography>
                  <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                    {p.actions.map((a, actionIndex) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={a.value}
                            onChange={() =>
                              toggleAccessPermission(pageIndex, actionIndex)
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label={a.label}
                        key={actionIndex}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              ))}
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
                placeholder="Search By: Party Name / Voucher No."
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: "10px 0px" }}>
                Search Result ({totalCount})
              </Divider>
              {loading ? (
                <div className="center">
                  <CircularProgress size={30} />
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

export default Policies;
