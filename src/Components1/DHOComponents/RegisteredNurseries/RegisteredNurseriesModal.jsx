import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid, IconButton, TextField, MenuItem } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegisteredNurseriesModal = ({ open, handleClose }) => {
  const [selectedDropdown1, setSelectedDropdown1] = useState("");
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");
  const [remarks, setRemarks] = useState("");

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
          <span></span>
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
          <Grid container spacing={1} mt={1}>
            <Grid item lg={6}>
              <TextField
                select
                label="Plant Name"
                variant="outlined"
                className="textfield-form"
                value={selectedDropdown1}
                onChange={(e) => setSelectedDropdown1(e.target.value)}
                fullWidth
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </TextField>
            </Grid>
            <Grid item lg={6}>
              <TextField
                select
                label="Plant Varity"
                variant="outlined"
                className="textfield-form"
                value={selectedDropdown2}
                onChange={(e) => setSelectedDropdown2(e.target.value)}
                fullWidth
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </TextField>
            </Grid>
            <Grid item lg={6}>
              <TextField
                label="Plant Quantity"
                variant="outlined"
                className="textfield-form"
                value={textFieldValue}
                onChange={(e) => setTextFieldValue(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                label="Remarks"
                variant="outlined"
                className="textfield-form"
                multiline
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
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
            onClick={handleClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RegisteredNurseriesModal;
