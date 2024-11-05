import { Button, Grid } from "@mui/material";
import MapBox from "./MapContent/MapBox";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import HMTModal from "../Components1/PlantModals/HMTModal";
import { getFetch, postFetch } from "../Components/API/Api";
import React, { useContext, useEffect, useState } from "react";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import PlantTableContainer from "../Components1/PlantTables/PlantTableContainer";
import PlanttblContainerNur from "../Components1/PlantTables/PlanttblContainerNur";
import NurseryRegistrationModal from "../Components1/PlantModals/NurseryRegistrationModal";

const Home = () => {
  const {
    tokenData,
    selectedState,
    selectedDistrict,
    NurseryRegistrationModalopen,
    handleNurseryRegistrationModalClose,
  } = useContext(UserContext);
  const [level, setLevel] = useState(0);
  const [mainMapCard, setMainMapCard] = useState({});
  const [plantWiseData, setPlantWiseData] = useState([]);
  const [stateDropDown, SetStateDropDown] = useState([]);
  const [HMTModalopen, setHMTModalOpen] = useState(false);
  const [divisionDropdown, setDivisionDropdown] = useState([]);
  const [nurseryWiseData, setNurseryWiseData] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [plantVarietiesData, setPlantVarietiesData] = useState([]);
  const [districtWisePlantData, setDistrictWisePlantData] = useState([]);
  const [PlantNurseryTableLoder, setPlantNurseryTableLoder] = useState(false);
  const [PlantVarietyTableLoder, setPlantVarietyTableLoder] = useState(false);
  const [PlantDistrictTableLoder, setPlantDistrictTableLoder] = useState(false);
  const [nurseryRegistration, setNurseryRegistration] = useState({
    nursery_name: "",
    license_no: "",
    latitude: "",
    longitude: "",
    state: "",
    division: "",
    pin_code: "",
    address: "",
    area: "",
    owner_name: "",
    owner_mobile: "",
    district: "",
    plant_category: "",
  });
  const [breadcrumbData, setBreadcrumbData] = useState(
    tokenData?.data?.user_role === "HMT" ? ["Nurseries"] : ["District"]
  );
  const [selectedValue, setSelectedValue] = useState({
    year: "2024",
    state: "Uttarakhand",
    division: "Kumaon",
    district: "All",
  });

  //HMT Form Modal
  const handleClickHMTModalOpen = () => {
    setHMTModalOpen(true);
  };
  const handleHMTModalClose = () => {
    setHMTModalOpen(false);
  };
  //handlechange Dropdowns
  const handleStates = (newValue, key) => {
    setLevel(0);
    setBreadcrumbData(["District"]);
    setSelectedValue((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };
  //state Dropdowns Api
  useEffect(() => {
    const fetchStateDropdownData = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/states`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          SetStateDropDown(response?.data?.states);
        }
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message || "Server Error", {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }
    };

    fetchStateDropdownData();
  }, []);
  //Division Dropdowns Api
  useEffect(() => {
    const fetchDivisionDropdownData = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/divisions?state=${selectedValue.state}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          setDivisionDropdown(response?.data?.divisions);
        }
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message || "Server Error", {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }
    };
    if (nurseryRegistration?.state?.length || selectedValue?.state) {
      fetchDivisionDropdownData();
    }
  }, [nurseryRegistration.state.length, selectedValue?.state]);
  //Fetch table data according to state and division dropdown
  useEffect(() => {
    const fetchUser = async () => {
      setPlantDistrictTableLoder(true);
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/states/Uttarakhand/divisions/Garhwal/hmt-count?state=${selectedValue.state}&division=${selectedValue.division}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          console.log(response.data.data);
          setPlantDistrictTableLoder(false);
          setMainMapCard(response?.data?.data);
          setDistrictWisePlantData(response?.data?.data?.collectiveData);
        }
      } catch (error) {
        setPlantDistrictTableLoder(false);
        enqueueSnackbar(error?.response?.data?.message || "Server Error", {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }
    };

    fetchUser();
  }, [selectedValue.division]);

  //district according nursery table data comes.
  const fetchNurserys = async (district) => {
    setPlantNurseryTableLoder(true);
    let data = {
      district: district,
    };
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nurseries/by-district`;
    try {
      const response = await postFetch(url, data);
      setPlantNurseryTableLoder(false);
      console.log(response);
      setNurseryWiseData(response);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
    }
  };
  useEffect(()=>{
    fetchNurserys("All")
  },[])
  //nursery according Plants comes
  const fetchPlants = async (nurseryId) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/plantName?nurseryId=${nurseryId}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        setPlantWiseData(response.data.data);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
    }
  };
  //Plant Name according Plant Variety comes
  const fetchPlantVariety = async (plantName) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/plantName/plntVariety?plantName=${plantName}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        setPlantVarietiesData(response.data.data);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Server Error", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  //nursery registration
  const [errors, setErrors] = useState({});

  const handleChangeNurseryRegistration = (event) => {
    const { name, value } = event.target;
    setNurseryRegistration((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const validateNurseryRegistration = () => {
    const newErrors = {};
    const requiredFields = [
      "nursery_name",
      "license_no",
      "latitude",
      "longitude",
      "state",
      "division",
      "pin_code",
      "address",
      "area",
      "owner_name",
      "owner_mobile",
      "district",
    ];
    requiredFields.forEach((field) => {
      if (!nurseryRegistration[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });
    
    console.log(newErrors,"=newErrors")
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNurseryRegistrationSubmit = async () => {
    console.log("testwrok")
    if (!validateNurseryRegistration()) {
      return;
    }

    try {
      const response = await postFetch(
        `${process.env.REACT_APP_API_URL_LOCAL}/nurseries/register`,
        nurseryRegistration
      );

      handleNurseryRegistrationModalClose()
        enqueueSnackbar("Nursery Registration successful", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      if (response && response.status === 404) {
        enqueueSnackbar(response?.data?.message, {
          variant: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }

    } catch (error) {
      enqueueSnackbar("Nursery Registration failed", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  //HMT Place Order
  const [OTPModal, setOTPModal] = useState(false);
  const [HMTOrder, setHMTOder] = useState({
    farmer_name: "",
    mobile_number: "",
    aadhaar_number: "",
    latitude: "",
    longitude: "",
    address: "",
    pin_code: "",
    plant_category: "",
    plant_name: "",
    plant_quantity: "",
    season: "",
    scheme: "",
  });
  const handleOpenOTPModal = () => {
    setOTPModal(true);
  };

  const handleCloseOTPModal = () => {
    setOTPModal(false);
  };
  const handleChangeHMTOder = (event) => {
    const { name, value } = event.target;
    setHMTOder((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const validateHMTOrder = () => {
    const newErrors = {};
    const requiredFields = [
      "farmer_name",
      "mobile_number",
      "aadhaar_number",
      "latitude",
      "longitude",
      "address",
      "pin_code",
      "plant_category",
      "plant_name",
      "plant_quantity",
      "season",
      "scheme",
    ];

    requiredFields.forEach((field) => {
      if (!HMTOrder[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleHMTOrderSubmit = async () => {
    handleOpenOTPModal();
    if (!validateHMTOrder()) {
      return;
    }

    try {
      const response = await postFetch(
        `${process.env.REACT_APP_API_URL_LOCAL}/hmt/submit-demand`,
        nurseryRegistration
      );

      if (response && response.status === 200) {
        enqueueSnackbar("Nursery Registration successful", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("Nursery Registration failed", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <React.Fragment>
      <HMTModal
        OTPModal={OTPModal}
        HMTOrder={HMTOrder}
        HMTModalopen={HMTModalopen}
        handleCloseOTPModal={handleCloseOTPModal}
        handleChangeHMTOder={handleChangeHMTOder}
        handleHMTModalClose={handleHMTModalClose}
        handleHMTOrderSubmit={handleHMTOrderSubmit}
      />
      <NurseryRegistrationModal
        errors={errors}
        stateDropDown={stateDropDown}
        divisionDropdown={divisionDropdown}
        nurseryRegistration={nurseryRegistration}
        NurseryRegistrationModalopen={NurseryRegistrationModalopen}
        handleChangeNurseryRegistration={handleChangeNurseryRegistration}
        handleNurseryRegistrationSubmit={handleNurseryRegistrationSubmit}
        handleNurseryRegistrationModalClose={
          handleNurseryRegistrationModalClose
        }
      />
      <Grid
        style={{
          marginTop: "3rem",
          position: "sticky",
          top: -0.1,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#426d52",
          height: "3rem",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "33px",
            marginTop: "-3rem",
          }}
          spacing={2}
        >
          <Grid item>
            <AutocompleteSelect
              label={"Select Year"}
              items={["2024", "2025", "2026"]}
              handleChange={(newValue) => handleStates(newValue, "year")}
              selectedItem={selectedValue.year}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select State"}
              items={stateDropDown}
              handleChange={(newValue) => handleStates(newValue, "state")}
              selectedItem={selectedValue.state}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select Division"}
              items={divisionDropdown}
              handleChange={(newValue) => handleStates(newValue, "division")}
              selectedItem={selectedValue.division}
            />
          </Grid>
        </Grid>
      </Grid>
      <MapBox
        // userRole={userRole}
        mainMapCard={mainMapCard}
        districtList={stateDropDown}
        LegendList={uniqueDistricts}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
      />
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          padding: "20px 33px 20px 33px",
        }}
      >
        {tokenData?.data?.user_role === "HMT" && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "-60px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                borderRadius: "20px",
                color: "white",
                backgroundColor: "#426d52",
              }}
              onClick={handleClickHMTModalOpen}
            >
              Place Order
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {tokenData?.data?.user_role === "HMT" ? (
            <PlanttblContainerNur
              level={level}
              setLevel={setLevel}
              tokenData={tokenData}
              fetchPlants={fetchPlants}
              plantWiseData={plantWiseData}
              fetchNurserys={fetchNurserys}
              breadcrumbData={breadcrumbData}
              nurseryWiseData={nurseryWiseData}
              setBreadcrumbData={setBreadcrumbData}
              fetchPlantVariety={fetchPlantVariety}
              plantVarietiesData={plantVarietiesData}
              districtWisePlantData={districtWisePlantData}
              PlantDistrictTableLoder={PlantDistrictTableLoder}
            />
          ) : (
            <PlantTableContainer
              level={level}
              setLevel={setLevel}
              tokenData={tokenData}
              fetchPlants={fetchPlants}
              plantWiseData={plantWiseData}
              fetchNurserys={fetchNurserys}
              breadcrumbData={breadcrumbData}
              nurseryWiseData={nurseryWiseData}
              setBreadcrumbData={setBreadcrumbData}
              fetchPlantVariety={fetchPlantVariety}
              plantVarietiesData={plantVarietiesData}
              districtWisePlantData={districtWisePlantData}
              PlantDistrictTableLoder={PlantDistrictTableLoder}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Home;
