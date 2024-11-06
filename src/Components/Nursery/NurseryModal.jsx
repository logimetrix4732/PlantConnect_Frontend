import React, { useState, useEffect } from "react";
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
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { plantOptions as externalPlantOptions } from "./StaticPlantStock";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NurseryModal = ({
  HMTModalopen,
  handleHMTModalClose,
  nurseryFormData,
  setNurseryFormData,
  onSubmit,
}) => {
  const [plantOptions, setPlantOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a timeout
    setLoading(true);
    setTimeout(() => {
      //   const fetchedPlantOptions = [
      //     { name: "Wheat", varieties: ["Hard Red", "Soft Red", "Durum"] },
      //     { name: "Rice", varieties: ["Basmati", "Jasmine", "Arborio"] },
      //     { name: "Corn", varieties: ["Dent Corn", "Flint Corn", "Sweet Corn"] },
      //   ];
      setPlantOptions(externalPlantOptions);
      setLoading(false);
    }, 5000); // Simulate a delay
  }, []);

  const handlePlantNameChange = (event, value) => {
    setNurseryFormData((prevData) => ({
      ...prevData,
      plant_name: value,
      category: "", // Reset category on plant name change
    }));
  };

  const handleCategoryChange = (event, value) => {
    setNurseryFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleQuantityAndPriceChange = (e) => {
    const { name, value } = e.target;
    setNurseryFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // const data = {
    //   ...nurseryFormData,
    //   nursery_id: 69,
    //   quantity: parseInt(nurseryFormData.quantity),
    //   unit_price: parseFloat(nurseryFormData.unit_price),
    // };
    onSubmit();
  };

  const selectedPlant = plantOptions.find(
    (plant) => plant.name === nurseryFormData.plant_name
  );

  return (
    <Dialog
      open={HMTModalopen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleHMTModalClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <span>Nursery Plant Form</span>
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
        <Grid container spacing={2}>
          <Grid item lg={4} sm={6} xs={12}>
            <Typography component="div" className="label-Form">
              Plant Name
            </Typography>
            <Autocomplete
              options={plantOptions.map((option) => option.name)}
              value={nurseryFormData.plant_name || ""}
              onChange={handlePlantNameChange}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Select Plant Name"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Typography component="div" className="label-Form">
              Variety of Plant
            </Typography>
            <Autocomplete
              options={selectedPlant ? selectedPlant.varieties : []}
              value={nurseryFormData.category || ""}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Select Variety"
                  size="small"
                  variant="outlined"
                  className="textfield-form"
                />
              )}
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Typography component="div" className="label-Form">
              Quantity
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Quantity"
              name="quantity"
              type="number"
              size="small"
              variant="outlined"
              value={nurseryFormData.quantity}
              onChange={handleQuantityAndPriceChange}
              className="textfield-form"
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Typography component="div" className="label-Form">
              Price
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Enter Price"
              name="unit_price"
              size="small"
              variant="outlined"
              value={nurseryFormData.unit_price}
              onChange={handleQuantityAndPriceChange}
              className="textfield-form"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={handleSubmit}
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
  );
};

export default NurseryModal;
