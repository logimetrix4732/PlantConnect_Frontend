import { Button, Grid } from "@mui/material";
// import MapBox from "./MapContent/MapBox";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import HMTModal from "../Components1/PlantModals/HMTModal";
import { getFetch, getFetchWithToken, postFetch } from "../Components/API/Api";
import React, { useContext, useEffect, useState } from "react";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import PlantTableContainer from "../Components1/PlantTables/PlantTableContainer";
import PlanttblContainerNur from "../Components1/PlantTables/PlanttblContainerNur";
import NurseryRegistrationModal from "../Components1/PlantModals/NurseryRegistrationModal";
import MapBox from "../Home/MapContent/MapBox";

const DhoChoPage = () => {
  const {
    tokenData,
    selectedState,
    selectedDistrict,
    NurseryRegistrationModalopen,
    handleNurseryRegistrationModalClose,
  } = useContext(UserContext);
  const [level, setLevel] = useState(0);
  const [farmerId, setFarmerId] = useState();
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
  const [districtDropdown, setDistrictDropdown] = useState([]);

  const [selectedValue, setSelectedValue] = useState({
    year: "2024",
    state: "Uttarakhand",
    division: "Garhwal",
    district: "",
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
  const handleDistrict = (newValue, key) => {
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
        const response = await getFetchWithToken(url);
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
  // District division api
  useEffect(() => {
    const fetchDistrictDropdownData = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/districts?division_name=${selectedValue.division}`;
      try {
        const response = await getFetchWithToken(url);
        if (response.status === 200) {
          let data = response?.data?.districts;
          console.log(data[0].district_name, "REPONSE District");
          if (
            Array.isArray(data) &&
            tokenData?.data?.user_role !== "HMT" &&
            tokenData?.data?.user_role !== "DHO"
          ) {
            data.unshift({ district_name: "All" });
          }
          setDistrictDropdown(data);
          setSelectedValue({
            ...selectedValue,
            district: data[0].district_name,
          });
          // setSelectedDistrict(data[0]);
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
    // fetchDistrictDropdownData();
    if (selectedValue.division !== "") {
      fetchDistrictDropdownData();
    }
  }, [selectedValue.division]);
  //Fetch table data according to state and division dropdown
  useEffect(() => {
    const fetchUser = async () => {
      setPlantDistrictTableLoder(true);
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/states/divisions/hmt-count?state_name=${selectedValue.state}&division_name=${selectedValue.division}&district=${selectedValue.district}`;
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
      console.log(response.data);
      if (district !== "All" && tokenData?.data?.user_role !== "HMT") {
        setBreadcrumbData([...breadcrumbData, district]);
        setLevel(1);
      }

      setNurseryWiseData(response.data);
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
  useEffect(() => {
    if (selectedValue.district !== "" && selectedValue.district !== "All") {
      fetchNurserys(selectedValue.district);
    }
  }, [selectedValue.district]);
  //nursery according Plants comes
  const fetchPlants = async (nurseryId) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/plantName`;
    try {
      const response = await postFetch(url, { nursery_id: nurseryId });
      console.log(response, "FETCH PLANT NAME===>");
      if (response.status === 200) {
        setPlantWiseData(response.data.nursery);
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
  const fetchPlantVariety = async (nurseryId, plantName) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/plantVarieties?nursery_id=${nurseryId}&plant_name=${plantName}`;
    try {
      const response = await getFetch(url);
      console.log(response, "RESPONSE PLANTS VARIETY DATA ");
      if (response.status === 200) {
        setPlantVarietiesData(response.data.plantVarieties);
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

    console.log(newErrors, "=newErrors");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNurseryRegistrationSubmit = async () => {
    console.log("testwrok");
    if (!validateNurseryRegistration()) {
      return;
    }

    try {
      const response = await postFetch(
        `${process.env.REACT_APP_API_URL_LOCAL}/nurseries/register`,
        nurseryRegistration
      );

      handleNurseryRegistrationModalClose();
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
    district: tokenData?.data.district,
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
        HMTOrder
      );
      console.log(response.data, "FARMER IDDD");
      setFarmerId(response.data.demand.farmer_id);
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

  const mapCard = [
    {
      bg: "#FFD7F0",
      highlight: "#FC97D6",
      tag: "Total Number of Nurseries",
      value: mainMapCard.total_no_of_nurseries || 0,
    },
    {
      bg: "#FFF8C1",
      highlight: "#FFE731",
      tag: "Total Plant Variety",
      value: mainMapCard.totalplantNames || 0,
    },
    {
      bg: "#D4ECDE",
      highlight: "#426D52",
      tag: "Total Number of Plants",
      value: mainMapCard.total_no_of_nurseries || 0,
    },
  ];
  const submitOtp = async (enteredOtp) => {
    console.log(enteredOtp, "ENTERD OTP");
    try {
      const response = await postFetch(
        `${process.env.REACT_APP_API_URL_LOCAL}/demand/validate-otp`,
        { farmer_id: farmerId, otp: enteredOtp }
      );
      console.log(response);
      if (response && response.status === 200) {
        setHMTModalOpen(false);
        setOTPModal(false);
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
      } else {
        enqueueSnackbar(
          response.response.data.message || "Nursery Registration failed",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
            iconVariant: "error",
            autoHideDuration: 2000,
          }
        );
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.response.data.message || "Nursery Registration failed",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "error",
          autoHideDuration: 2000,
        }
      );
    }
  };
  return (
    <React.Fragment>
      <HMTModal
        OTPModal={OTPModal}
        HMTOrder={HMTOrder}
        HMTModalopen={HMTModalopen}
        submitOtp={submitOtp}
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
          {/* <Grid item>
            <AutocompleteSelect
              label={"Select Year"}
              items={["2024", "2025", "2026"]}
              handleChange={(newValue) => handleStates(newValue, "year")}
              selectedItem={selectedValue.year}
            />
          </Grid> */}

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
          <Grid item>
            <AutocompleteSelect
              label={"Select District"}
              items={districtDropdown.map((ele) => ele.district_name)}
              handleChange={(newValue) => handleDistrict(newValue, "district")}
              selectedItem={selectedValue.district}
            />
          </Grid>
        </Grid>
      </Grid>
      <MapBox
        mapCard={mapCard}
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
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
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
export default DhoChoPage;
