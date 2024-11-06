import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import PlantModalTable from "../PlantTables/PlantModalTable";
// import EnterOTPForm from "../EnterOTPForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JDForwModal = ({
  OTPModal,
  HMTOrder,
  tableData,
  jdModalOpen,
  handleCloseOTPModal,
  handleChangeHMTOder,
  handleJDModalClose,
  handleHMTOrderSubmit,
}) => {
  const field = [
    {
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];

  return (
    <React.Fragment>
      <Dialog
        open={jdModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleJDModalClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            position: "relative",
          }}
          id="customized-dialog-title"
        >
          <span className="colorCodeTable">Near By Nurseries</span>
          <IconButton
            aria-label="close"
            onClick={handleJDModalClose}
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
          {/* <Grid container spacing={2} mt={0.1}>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Name"
                size="small"
                variant="outlined"
                className="textfield-form"
                name="farmer_name"
                value={HMTOrder.farmer_name}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Mobile Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Mobile Number"
                size="small"
                type="number"
                variant="outlined"
                className="textfield-form"
                name="mobile_number"
                value={HMTOrder.mobile_number}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Aadhaar Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Aadhaar Number"
                size="small"
                type="number"
                variant="outlined"
                className="textfield-form"
                name="aadhaar_number"
                value={HMTOrder.aadhaar_number}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Latitude
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Latitude"
                size="small"
                variant="outlined"
                className="textfield-form"
                name="latitude"
                value={HMTOrder.latitude}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Longitude
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Longitude"
                size="small"
                variant="outlined"
                className="textfield-form"
                name="longitude"
                value={HMTOrder.longitude}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Address"
                size="small"
                variant="outlined"
                className="textfield-form"
                name="address"
                value={HMTOrder.address}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Pin code
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Pin code"
                size="small"
                variant="outlined"
                className="textfield-form"
                name="pin_code"
                value={HMTOrder.pin_code}
                onChange={handleChangeHMTOder}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Season
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                name="season"
                value={HMTOrder.season}
                onChange={handleChangeHMTOder}
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Scheme
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                name="scheme"
                value={HMTOrder.scheme}
                onChange={handleChangeHMTOder}
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Category
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                name="plant_category"
                value={HMTOrder.plant_category}
                onChange={handleChangeHMTOder}
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Name
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                name="plant_name"
                value={HMTOrder.plant_name}
                onChange={handleChangeHMTOder}
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Quantity
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                name="plant_quantity"
                value={HMTOrder.plant_quantity}
                onChange={handleChangeHMTOder}
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <EnterOTPForm open={OTPModal} onClose={handleCloseOTPModal} /> */}
          <Grid container spacing={2} mt={0.1}>
            <PlantModalTable tableData={tableData} />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleHMTOrderSubmit}
            style={{
              width: "130px",
              height: "40px",
              color: "#2f73fa",
              borderRadius: "8px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.11)",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default JDForwModal;
