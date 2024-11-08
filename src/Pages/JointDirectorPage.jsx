import { Button, Grid } from "@mui/material";
import { getFetch } from "../Components/API/Api";
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
  console.log(selectedState, selectedDivision, selectedDistrict, "ALLLLL");
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
      value: mainMapCard.totalHmts || 0,
    },
    {
      bg: "#FDF9D6",
      highlight: "#FFE731",
      tag: "Total Number of Nurseries",
      value: mainMapCard.totalplantNames || 0,
    },
    {
      bg: "#d4ecde",
      highlight: "#426d52",
      tag: "Total Number of Plants",
      value: mainMapCard.totalNurseries || 0,
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
    if (selectedDivision !== "") {
      fetchDistrictDropdownData();
    }
  }, [selectedDivision]);
  //Division and dristrict according data comes
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setPlantDistrictTableLoder(true);
  //     const url = `${process.env.REACT_APP_API_URL_LOCAL}/districts?divisionName=${selectedValue.division}&districtName=${selectedValue.district}`;
  //     try {
  //       const response = await getFetch(url);
  //       if (response.status === 200) {
  //         setPlantDistrictTableLoder(false);
  //         setMainMapCard(response?.data);
  //         setDistrictWisePlantData(response?.data?.data);
  //       }
  //     } catch (error) {
  //       setPlantDistrictTableLoder(false);
  //       enqueueSnackbar(error?.response?.data?.message || "Server Error", {
  //         variant: "warning",
  //         anchorOrigin: {
  //           vertical: "bottom",
  //           horizontal: "left",
  //         },
  //         action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
  //         iconVariant: "success",
  //         autoHideDuration: 2000,
  //       });
  //     }
  //   };

  //   fetchUser();
  // }, [selectedValue.district, selectedValue.division]);

  //Division according district dropdown comes
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const url = `${process.env.REACT_APP_API_URL_LOCAL}/district/division?division=${selectedValue.division}`;
  //     try {
  //       const response = await getFetch(url);
  //       if (response.status === 200) {
  //         setPlantDistrictTableLoder(false);
  //         setDistrictDropdown(["All", ...response?.data?.data]);
  //       }
  //     } catch (error) {
  //       enqueueSnackbar(error?.response?.data?.message || "Server Error", {
  //         variant: "warning",
  //         anchorOrigin: {
  //           vertical: "bottom",
  //           horizontal: "left",
  //         },
  //         action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
  //         iconVariant: "success",
  //         autoHideDuration: 2000,
  //       });
  //     }
  //   };

  //   fetchUser();
  // }, [selectedValue.division]);

  //district according numrserys comes
  // const fetchNurserys = async (district) => {
  //   setPlantNurseryTableLoder(true);
  //   const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/district?district=${district}`;
  //   try {
  //     const response = await getFetch(url);
  //     if (response.status === 200) {
  //       setPlantNurseryTableLoder(false);
  //       setNurseryWiseData(response.data);
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error?.response?.data?.message || "Server Error", {
  //       variant: "warning",
  //       anchorOrigin: {
  //         vertical: "bottom",
  //         horizontal: "left",
  //       },
  //       action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
  //       iconVariant: "success",
  //       autoHideDuration: 2000,
  //     });
  //   }
  // };

  //nursery according Plants comes
  // const fetchPlants = async (nurseryId) => {
  //   const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/plantName?nurseryId=${nurseryId}`;
  //   try {
  //     const response = await getFetch(url);
  //     if (response.status === 200) {
  //       setPlantWiseData(response.data.data);
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error?.response?.data?.message || "Server Error", {
  //       variant: "warning",
  //       anchorOrigin: {
  //         vertical: "bottom",
  //         horizontal: "left",
  //       },
  //       action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
  //       iconVariant: "success",
  //       autoHideDuration: 2000,
  //     });
  //   }
  // };

  //Plant Name according Plant Variety comes
  // const fetchPlantVariety = async (plantName) => {
  //   const url = `${process.env.REACT_APP_API_URL_LOCAL}/plantName/plntVariety?plantName=${plantName}`;
  //   try {
  //     const response = await getFetch(url);
  //     if (response.status === 200) {
  //       setPlantVarietiesData(response.data.data);
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error?.response?.data?.message || "Server Error", {
  //       variant: "warning",
  //       anchorOrigin: {
  //         vertical: "bottom",
  //         horizontal: "left",
  //       },
  //       action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
  //       iconVariant: "success",
  //       autoHideDuration: 2000,
  //     });
  //   }
  // };

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
            // fetchPlants={fetchPlants}
            plantWiseData={plantWiseData}
            // fetchNurserys={fetchNurserys}
            breadcrumbData={breadcrumbData}
            nurseryWiseData={nurseryWiseData}
            setBreadcrumbData={setBreadcrumbData}
            // fetchPlantVariety={fetchPlantVariety}
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
