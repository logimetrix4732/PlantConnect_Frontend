import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid, IconButton, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisitApprovalModal = ({
  open,
  handleClose,
  handleVisitChange,
  handleVisitDateChange,
  visitAprForm,
  handleApprSubmit,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
            position: "relative",
          }}
          id="customized-dialog-title"
        >
          <span>Field Visit Form</span>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={1} mt={1}>
              <Grid item lg={6} sm={6} xs={12}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  className="textfield-form"
                  value={visitAprForm.nurseryVisitDate}
                  onChange={handleVisitDateChange("nurseryQuantityDate")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              {/* <Grid item lg={6} sm={6} xs={12}>
                <TextField
                  label="Visit Status"
                  variant="outlined"
                  className="textfield-form"
                  value={visitStatus}
                  onChange={(e) => setVisitStatus(e.target.value)}
                  fullWidth
                />
              </Grid> */}
              <Grid item lg={6} sm={6} xs={12}>
                <TextField
                  label="Nursery Quantity"
                  variant="outlined"
                  name="nurseryPlantQuantity"
                  className="textfield-form"
                  value={visitAprForm.nurseryPlantQuantity}
                  disabled={true}
                  // defaultValue={visitAprForm.nurseryPlantQuantity}
                  onChange={handleVisitChange}
                  // onChange={(e) => setVisitStatus(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This ensures the label stays shrunk when there is a value
                  }}
                />
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <TextField
                  label="DHO Approved Quantity"
                  name="dhoApprQuan"
                  variant="outlined"
                  className="textfield-form"
                  value={visitAprForm.dhoApprQuan}
                  // onChange={(e) => setDhoApprovedQuantity(e.target.value)}
                  onChange={handleVisitChange}
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <TextField
                  label="Remarks"
                  name="remark"
                  variant="outlined"
                  className="textfield-form"
                  multiline
                  rows={4}
                  value={visitAprForm.remark}
                  // onChange={(e) => setRemarks(e.target.value)}
                  onChange={handleVisitChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            style={{
              width: "130px",
              height: "40px",
              color: "#2f73fa",
              borderRadius: "10px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.11)",
            }}
            onClick={() => handleApprSubmit("Approve")}
          >
            Approve
          </Button>
          <Button
            style={{
              width: "130px",
              height: "40px",
              color: "#2f73fa",
              borderRadius: "10px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.11)",
            }}
            onClick={() => handleApprSubmit("Reject")}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default VisitApprovalModal;
