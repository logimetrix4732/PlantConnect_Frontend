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
  FormHelperText,
  FormControl,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NurseryRegistrationModal = ({
  errors,
  stateDropDown,
  divisionDropdown,
  nurseryRegistration,
  NurseryRegistrationModalopen,
  handleChangeNurseryRegistration,
  handleNurseryRegistrationSubmit,
  handleNurseryRegistrationModalClose,
}) => {
  console.log(stateDropDown, "==stateDropDown");
  const field = {
    name: "fieldName",
    options: stateDropDown,
    options1: divisionDropdown,
    options2: stateDropDown,
  };

  return (
    <React.Fragment>
      <Dialog
        open={NurseryRegistrationModalopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleNurseryRegistrationModalClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
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
          <span>Nursery Registration</span>
          <IconButton
            aria-label="close"
            onClick={handleNurseryRegistrationModalClose}
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
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Name
              </Typography>
              <FormControl fullWidth error={!!errors.nursery_name}>
                <TextField
                  placeholder="Nursery Name"
                  size="small"
                  name="nursery_name"
                  variant="outlined"
                  className="textfield-form"
                  value={nurseryRegistration.nursery_name}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Name"
                />
                <FormHelperText>{errors.nursery_name}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery License No.
              </Typography>
              <FormControl fullWidth error={!!errors.license_no}>
                <TextField
                  fullWidth
                  placeholder="Nursery License No."
                  size="small"
                  name="license_no"
                  variant="outlined"
                  className="textfield-form"
                  value={nurseryRegistration.license_no}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery License No."
                />
                <FormHelperText>{errors.license_no}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Address
              </Typography>
              <FormControl fullWidth error={!!errors.address}>
                <TextField
                  fullWidth
                  placeholder="Nursery Address"
                  size="small"
                  name="address"
                  variant="outlined"
                  className="textfield-form"
                  value={nurseryRegistration.address}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Address"
                />
                <FormHelperText>{errors.address}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Latitude
              </Typography>
              <FormControl fullWidth error={!!errors.latitude}>
                <TextField
                  fullWidth
                  placeholder="Nursery Latitude"
                  size="small"
                  variant="outlined"
                  name="latitude"
                  className="textfield-form"
                  value={nurseryRegistration.latitude}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Latitude"
                />
                <FormHelperText>{errors.latitude}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Longitude
              </Typography>
              <FormControl fullWidth error={!!errors.longitude}>
                <TextField
                  fullWidth
                  placeholder="Nursery Longitude"
                  size="small"
                  variant="outlined"
                  name="longitude"
                  className="textfield-form"
                  value={nurseryRegistration.longitude}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Longitude"
                />
                <FormHelperText>{errors.longitude}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Area
              </Typography>
              <FormControl fullWidth error={!!errors.area}>
                <TextField
                  fullWidth
                  placeholder="Nursery Area"
                  size="small"
                  variant="outlined"
                  name="area"
                  className="textfield-form"
                  value={nurseryRegistration.area}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Area"
                />
                <FormHelperText>{errors.area}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Pin Code
              </Typography>
              <FormControl fullWidth error={!!errors.pin_code}>
                <TextField
                  fullWidth
                  placeholder="Pin Code"
                  size="small"
                  variant="outlined"
                  name="pin_code"
                  className="textfield-form"
                  value={nurseryRegistration.pin_code}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Pin Code"
                />
                <FormHelperText>{errors.pin_code}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Owner Name
              </Typography>
              <FormControl fullWidth error={!!errors.owner_name}>
                <TextField
                  fullWidth
                  placeholder="Nursery Owner Name"
                  size="small"
                  variant="outlined"
                  name="owner_name"
                  className="textfield-form"
                  value={nurseryRegistration.owner_name}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Owner Name"
                />
                <FormHelperText>{errors.owner_name}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Nursery Owner Mobile No.
              </Typography>
              <FormControl fullWidth error={!!errors.owner_mobile}>
                <TextField
                  fullWidth
                  placeholder="Nursery Owner Mobile No."
                  size="small"
                  variant="outlined"
                  name="owner_mobile"
                  className="textfield-form"
                  value={nurseryRegistration.owner_mobile}
                  onChange={handleChangeNurseryRegistration}
                  aria-label="Nursery Owner Mobile No."
                />
                <FormHelperText>{errors.owner_mobile}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                State
              </Typography>
              <FormControl fullWidth error={!!errors.division}>
                <Select
                  displayEmpty
                  className="textfield-form"
                  variant="outlined"
                  name="state"
                  placeholder="State"
                  size="small"
                  value={nurseryRegistration.state}
                  onChange={handleChangeNurseryRegistration}
                  sx={{ color: "#000000" }}
                >
                  {field.options.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      sx={{ color: "#808080" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.state}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                Division
              </Typography>
              <FormControl fullWidth error={!!errors.division}>
                <Select
                  displayEmpty
                  className="textfield-form"
                  variant="outlined"
                  name="division"
                  placeholder="Division"
                  size="small"
                  value={nurseryRegistration.division}
                  onChange={handleChangeNurseryRegistration}
                  sx={{ color: "#000000" }}
                >
                  {field.options1.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      sx={{ color: "#808080" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.division}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Typography component="div" className="label-Form">
                District
              </Typography>
              <FormControl fullWidth error={!!errors.district}>
                <Select
                  displayEmpty
                  className="textfield-form"
                  variant="outlined"
                  name="district"
                  placeholder="Select District"
                  size="small"
                  value={nurseryRegistration.district}
                  onChange={handleChangeNurseryRegistration}
                  sx={{ color: "#000000" }}
                >
                  {field.options2.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      sx={{ color: "#808080" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.district}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            style={{
              width: "130px",
              height: "40px",
              color: "#2f73fa",
              borderRadius: "8px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.11)",
            }}
            onClick={handleNurseryRegistrationSubmit}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NurseryRegistrationModal;
