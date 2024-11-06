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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { plantOptions as externalPlantOptions } from "./StaticPlantStock";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NurseryModal = ({
  HMTModalopen,
  handleHMTModalClose,
  nurseryFormData = [],
  setNurseryFormData,
  onSubmit,
  nurseryId,
}) => {
  const [plantOptions, setPlantOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a timeout
    setLoading(true);
    setTimeout(() => {
      setPlantOptions(externalPlantOptions);
      setLoading(false);
    }, 2000); // Simulate a delay
  }, []);

  const handlePlantNameChange = (index, event, value) => {
    const updatedData = [...nurseryFormData];
    updatedData[index] = {
      ...updatedData[index],
      plant_name: value,
      category: "",
    };
    setNurseryFormData(updatedData);
  };

  const handleCategoryChange = (index, event, value) => {
    const updatedData = [...nurseryFormData];
    updatedData[index] = { ...updatedData[index], category: value };
    setNurseryFormData(updatedData);
  };

  const handleQuantityAndPriceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...nurseryFormData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setNurseryFormData(updatedData);
  };

  const handleAddRow = () => {
    setNurseryFormData([
      ...nurseryFormData,
      {
        plant_name: "",
        category: "",
        quantity: "",
        unit_price: "",
        nursery_id: nurseryId,
      },
    ]);
  };

  const handleSubmit = () => {
    onSubmit();
  };

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
        {nurseryFormData.map((data, index) => {
          const selectedPlant = plantOptions.find(
            (plant) => plant.name === data.plant_name
          );
          return (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{ display: "flex", alignItems: "end" }}
            >
              <Grid item lg={3} sm={4} xs={12}>
                <Typography component="div" className="label-Form">
                  Plant Name
                </Typography>
                <Autocomplete
                  freeSolo
                  options={plantOptions.map((option) => option.name)}
                  value={data.plant_name || ""}
                  onChange={(event, value) =>
                    handlePlantNameChange(index, event, value)
                  }
                  onInputChange={(event, value) =>
                    handlePlantNameChange(index, event, value)
                  }
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
              <Grid item lg={3} sm={4} xs={12}>
                <Typography component="div" className="label-Form">
                  Variety of Plant
                </Typography>
                <Autocomplete
                  freeSolo
                  options={selectedPlant ? selectedPlant.varieties : []}
                  value={data.category || ""}
                  onChange={(event, value) =>
                    handleCategoryChange(index, event, value)
                  }
                  onInputChange={(event, value) =>
                    handleCategoryChange(index, event, value)
                  }
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
              <Grid item lg={3} sm={4} xs={12}>
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
                  value={data.quantity}
                  onChange={(e) => handleQuantityAndPriceChange(index, e)}
                  className="textfield-form"
                />
              </Grid>
              <Grid item lg={2} sm={4} xs={12}>
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
                  value={data.unit_price}
                  onChange={(e) => handleQuantityAndPriceChange(index, e)}
                  className="textfield-form"
                />
              </Grid>
              <Grid item lg={1} sm={1} xs={12}>
                <IconButton onClick={handleAddRow} color="primary">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
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
