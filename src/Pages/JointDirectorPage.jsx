import { Button, Grid } from "@mui/material";
import { getFetch, postFetch } from "../Components/API/Api";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import MapBox from "../Home/MapContent/MapBox";
import HMTModal from "../Components1/PlantModals/HMTModal";
import PlantTableContainer from "../Components1/PlantTables/PlantTableContainer";
import JointDirectorContainer from "../Components1/JointDirecComponent/JointDirectorContainer";

const JointDirectorPage = () => {
  const { tokenData } = useContext(UserContext);
  // Dropdown States
  const [stateDropDown, SetStateDropDown] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const [divisionDropdown, setDivisionDropdown] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState({ division: "" });
  const [districtDropdown, setDistrictDropdown] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState({
    district_name: "",
  });
  // console.log(selectedState, selectedDivision, selectedDistrict, "ALLLLL");
  const [level, setLevel] = useState(0);
  const [mainMapCard, setMainMapCard] = useState({});
  const [plantWiseData, setPlantWiseData] = useState([]);
  const [HMTModalopen, setHMTModalOpen] = useState(false);
  const [nurseryWiseData, setNurseryWiseData] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [plantVarietiesData, setPlantVarietiesData] = useState([]);
  const [breadcrumbData, setBreadcrumbData] = useState(["District"]);
  const [districtWisePlantData, setDistrictWisePlantData] = useState([]);
  const [PlantNurseryTableLoder, setPlantNurseryTableLoder] = useState(false);
  const [PlantVarietyTableLoder, setPlantVarietyTableLoder] = useState(false);
  const [PlantDistrictTableLoder, setPlantDistrictTableLoder] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    year: "2024",
    state: "Uttarakhand",
    division: "Kumaon",
    district: "All",
  });
  const mapCard = [
    {
      bg: "#FFD7F0",
      // highlight: "#426d52",
      highlight: "#FC97D6",
      tag: "Total Number of HMT's",
      value: mainMapCard.total_no_of_hmts || 0,
    },
    {
      bg: "#FDF9D6",
      highlight: "#FFE731",
      tag: "Total Number of Nurseries",
      value: mainMapCard.total_no_of_nurseries || 0,
    },
    {
      bg: "#d4ecde",
      highlight: "#426d52",
      tag: "Total Number of Plants",
      value: mainMapCard.total_no_of_plants || 0,
    },
  ];
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
  const handleDivision = (newValue, key) => {
    setLevel(0);
    setBreadcrumbData(["District"]);
    setSelectedDivision((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };
  const handleDistrict = (newValue, key) => {
    setLevel(0);
    setBreadcrumbData(["District"]);
    setSelectedDistrict((prevValue) => ({
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
          let data = response?.data?.states;
          console.log(data[0], "STATEDROPDOWNNS");
          SetStateDropDown(data);
          setSelectedState(data[0]);
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
  const fetchDivisionDropdownData = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/divisions?state=${selectedState}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        let data = response?.data?.divisions;
        console.log(data, "REPONSE DISVISion");
        setDivisionDropdown(data);
        setSelectedDivision({ division: data[0] });
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
  useEffect(() => {
    // fetchDivisionDropdownData();
    if (selectedState !== "") {
      fetchDivisionDropdownData();
    }
  }, [selectedState]);
  // District division api
  useEffect(() => {
    const fetchDistrictDropdownData = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/districts?division_name=${selectedDivision.division}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          let data = response?.data?.districts;
          console.log(data[0].district_name, "REPONSE District");
          if (Array.isArray(data) && tokenData?.data?.user_role !== "HMT") {
            data.unshift({ district_name: "All" });
          }
          setDistrictDropdown(data);
          setSelectedDistrict(data[0]);
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
    if (selectedDivision.division !== "") {
      fetchDistrictDropdownData();
    }
  }, [selectedDivision]);
  const fetchUser = async () => {
    setPlantDistrictTableLoder(true);
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/location/states/divisions/hmt-count?state_name=${selectedState}&division_name=${selectedDivision.division}&district=${selectedDistrict.district_name}`;

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

  useEffect(() => {
    if (selectedDistrict.district_name !== "") {
      fetchUser();
    }
  }, [selectedDistrict.district_name]);
  //district according numrserys comes
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
      if (district !== "All") {
        setBreadcrumbData([...breadcrumbData, district]);
        setLevel(1);
      }
      setNurseryWiseData(response.data);
      // if (response.data.length > 0) {
      //   setLevel(1);
      //   setNurseryWiseData(response.data);
      //   setBreadcrumbData([...breadcrumbData, district]);
      // } else {
      //   setNurseryWiseData(response.data);
      //   setLevel(1);
      //   setBreadcrumbData([...breadcrumbData, district]);
      // }
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
    if (
      selectedDistrict.district_name !== "" &&
      selectedDistrict.district_name !== "All"
    ) {
      fetchNurserys(selectedDistrict.district_name);
    }
  }, [selectedDistrict]);

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

  return (
    <React.Fragment>
      {/* <HMTModal
        HMTModalopen={HMTModalopen}
        handleHMTModalClose={handleHMTModalClose}
      /> */}
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
              items={["2022", "2023", "2024"]}
              handleChange={(newValue) => handleStates(newValue, "year")}
              selectedItem={selectedValue.year}
            />
          </Grid> */}

          <Grid item>
            <AutocompleteSelect
              label={"Select State"}
              items={stateDropDown}
              handleChange={(newValue) => handleStates(newValue, "state")}
              selectedItem={selectedState}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select Division"}
              items={divisionDropdown}
              handleChange={(newValue) => handleDivision(newValue, "division")}
              selectedItem={selectedDivision.division}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select District"}
              items={districtDropdown.map((ele) => ele.district_name)}
              handleChange={(newValue) =>
                handleDistrict(newValue, "district_name")
              }
              selectedItem={selectedDistrict.district_name}
            />
          </Grid>
        </Grid>
      </Grid>
      <MapBox
        // userRole={userRole}
        mapCard={mapCard}
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
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <JointDirectorContainer
            level={level}
            setLevel={setLevel}
            tokenData={tokenData}
            fetchPlants={fetchPlants}
            plantWiseData={plantWiseData}
            fetchNurserys={fetchNurserys}
            breadcrumbData={breadcrumbData}
            nurseryWiseData={nurseryWiseData}
            setSelectedDistrict={setSelectedDistrict}
            selectedDistrict={selectedDistrict}
            setBreadcrumbData={setBreadcrumbData}
            fetchPlantVariety={fetchPlantVariety}
            plantVarietiesData={plantVarietiesData}
            districtWisePlantData={districtWisePlantData}
            PlantDistrictTableLoder={PlantDistrictTableLoder}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default JointDirectorPage;
