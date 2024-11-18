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
  FormControl,
  FormHelperText,
} from "@mui/material";
import EnterOTPForm from "../EnterOTPForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HMTModal = ({
  OTPModal,
  HMTOrder,
  HMTModalopen,
  handleCloseOTPModal,
  handleChangeHMTOder,
  handleHMTModalClose,
  handleHMTOrderSubmit,
  handleChangeorderOder,
  submitOtp,
  sendOtp,
  oTPStatus,
  errors,
  orderError,
  otpError,
}) => {
  const field = [
    {
      seasons: ["Kharif", "Rabi", "Zaid"],
    },
  ];

  return (
    <React.Fragment>
      <Dialog
        open={HMTModalopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleHMTModalClose}
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
          <span>Form</span>
          <IconButton
            aria-label="close"
            onClick={handleHMTModalClose}
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
          <Grid container spacing={2} mt={0.1}>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Name
              </Typography>
              <FormControl fullWidth error={!!otpError.farmer_name}>
                <TextField
                  fullWidth
                  placeholder="Farmer Name"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="farmer_name"
                  value={HMTOrder.farmer_name}
                  onChange={handleChangeorderOder}
                />
                <FormHelperText>{otpError.farmer_name}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Mobile Number
              </Typography>
              <FormControl fullWidth error={!!otpError.mobile_number}>
                <TextField
                  fullWidth
                  placeholder="Mobile Number"
                  size="small"
                  type="number"
                  variant="outlined"
                  className="textfield-form"
                  name="mobile_number"
                  value={HMTOrder.mobile_number}
                  onChange={handleChangeorderOder}
                />
                <FormHelperText>{otpError.mobile_number}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Aadhaar Number
              </Typography>
              <FormControl fullWidth error={!!otpError.aadhaar_number}>
                <TextField
                  fullWidth
                  placeholder="Aadhaar Number"
                  size="small"
                  type="number"
                  variant="outlined"
                  className="textfield-form"
                  name="aadhaar_number"
                  value={HMTOrder.aadhaar_number}
                  onChange={handleChangeorderOder}
                />
                <FormHelperText>{otpError.aadhaar_number}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item textAlign="center" lg={12} sm={12} xs={12}>
              <Button
                onClick={sendOtp}
                // onClick={() => handleApproval(row)}
                // disabled={!row.nearest}
                style={{
                  color: "#fff",
                  // width: "80px",
                  // marginRight: "10px",

                  // height: "30px",
                  background: "#426D52",
                  boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                  borderRadius: "4px",
                }}
              >
                Send OTP
              </Button>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Latitude
              </Typography>
              <FormControl fullWidth error={!!orderError.latitude}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Farmer Latitude"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="latitude"
                  value={HMTOrder.latitude}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.latitude}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Longitude
              </Typography>
              <FormControl fullWidth error={!!orderError.longitude}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Farmer Longitude"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="longitude"
                  value={HMTOrder.longitude}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.longitude}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Address
              </Typography>
              <FormControl fullWidth error={!!orderError.address}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Farmer Address"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="address"
                  value={HMTOrder.address}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.address}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Farmer Pin code
              </Typography>
              <FormControl fullWidth error={!!orderError.pin_code}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Farmer Pin code"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="pin_code"
                  value={HMTOrder.pin_code}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.pin_code}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Season
              </Typography>
              {/* <TextField
                fullWidth
                placeholder="Season"
                size="small"
                variant="outlined"
                className="textfield-form"
                name="season"
                value={HMTOrder.season}
                onChange={handleChangeHMTOder}
              /> */}
              <FormControl fullWidth error={!!orderError.season}>
                <Select
                  fullWidth
                  disabled={oTPStatus}
                  // displayEmpty
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
                  {field[0].seasons.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{orderError.season}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Scheme
              </Typography>
              <FormControl fullWidth error={!!orderError.scheme}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Scheme"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="scheme"
                  value={HMTOrder.scheme}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.scheme}</FormHelperText>
              </FormControl>
              {/* <Select
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
              </Select> */}
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Name
              </Typography>
              <FormControl fullWidth error={!!orderError.plant_name}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Plant Name"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="plant_name"
                  value={HMTOrder.plant_name}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.plant_name}</FormHelperText>
              </FormControl>
              {/* <Select
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
              </Select> */}
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Variety
              </Typography>
              <FormControl fullWidth error={!!orderError.plant_category}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  placeholder="Plant Variety"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="plant_category"
                  value={HMTOrder.plant_category}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.plant_category}</FormHelperText>
              </FormControl>
              {/* <Select
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
              </Select> */}
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Quantity
              </Typography>
              <FormControl fullWidth error={!!orderError.plant_quantity}>
                <TextField
                  fullWidth
                  disabled={oTPStatus}
                  type="number"
                  placeholder="Plant Quantity"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  name="plant_quantity"
                  value={HMTOrder.plant_quantity}
                  onChange={handleChangeHMTOder}
                />
                <FormHelperText>{orderError.plant_quantity}</FormHelperText>
              </FormControl>
              {/* <Select
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
              </Select> */}
            </Grid>
          </Grid>
          <EnterOTPForm
            open={OTPModal}
            onClose={handleCloseOTPModal}
            submitOtp={submitOtp}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleHMTOrderSubmit}
            disabled={oTPStatus}
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

export default HMTModal;
