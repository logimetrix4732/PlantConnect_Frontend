import { Button, Grid } from "@mui/material";
import { getFetch, postFetch } from "../Components/API/Api";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import SecureLS from "secure-ls";
import MapBox from "../Home/MapContent/MapBox";
import NurseryTable from "../Components/Nursery/NurseryTable";
import NurseryTableContainer from "../Components/Nursery/NurseryTableContainer";
import NurseryModal from "../Components/Nursery/NurseryModal";
// import HMTModal from "../Components1/PlantModals/HMTModal";

const NurseryPage = () => {
  const { selectedState, selectedDistrict } = useContext(UserContext);
  const [level, setLevel] = useState(0);
  const [mainMapCard, setMainMapCard] = useState({});
  const [plantWiseData, setPlantWiseData] = useState([]);
  const [stateDropDown, SetStateDropDown] = useState([]);
  const [HMTModalopen, setHMTModalOpen] = useState(false);
  const [nurseryWiseData, setNurseryWiseData] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [districtDropdown, setDistrictDropdown] = useState([]);
  const [plantVarietiesData, setPlantVarietiesData] = useState([]);
  const plantsData = [
    {
      sNo: 1,
      plantName: "A",
      varietyOfPlants: 80,
      quantityEntered: 80,
      quantityApproved: 80,
      physicalVerificationStatus: "Pending",
      ordered: 340,
      received: 80,
    },
    {
      sNo: 2,
      plantName: "B",
      varietyOfPlants: 45,
      quantityEntered: 45,
      quantityApproved: 45,
      physicalVerificationStatus: "Verified",
      ordered: 684,
      received: 245,
    },
    {
      sNo: 3,
      plantName: "C",
      varietyOfPlants: 33,
      quantityEntered: 33,
      quantityApproved: 33,
      physicalVerificationStatus: "Verified",
      ordered: 346,
      received: 346,
    },
    {
      sNo: 4,
      plantName: "D",
      varietyOfPlants: 66,
      quantityEntered: 66,
      quantityApproved: 66,
      physicalVerificationStatus: "Verified",
      ordered: 490,
      received: 490,
    },
    {
      sNo: 5,
      plantName: "E",
      varietyOfPlants: 12,
      quantityEntered: 12,
      quantityApproved: 12,
      physicalVerificationStatus: "Pending",
      ordered: 267,
      received: 267,
    },
    {
      sNo: 6,
      plantName: "F",
      varietyOfPlants: 55,
      quantityEntered: 55,
      quantityApproved: 55,
      physicalVerificationStatus: "Pending",
      ordered: 257,
      received: 257,
    },
    {
      sNo: 7,
      plantName: "G",
      varietyOfPlants: 3,
      quantityEntered: 3,
      quantityApproved: 3,
      physicalVerificationStatus: "Pending",
      ordered: null,
      received: null,
    },
    {
      sNo: 8,
      plantName: "H",
      varietyOfPlants: 2,
      quantityEntered: 2,
      quantityApproved: 2,
      physicalVerificationStatus: "Pending",
      ordered: null,
      received: null,
    },
  ];

  const [plantTableData, setPlantTableData] = useState(plantsData);
  const [tableLoading, setTableLoading] = useState();

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
  const [nurseryFormData, setNurseryFormData] = useState([
    {
      plant_name: "",
      category: "",
      quantity: "",
      unit_price: "",
    },
  ]);
  const mapCard = [
    {
      bg: "#FFD7F0",
      // highlight: "#426d52",
      highlight: "#FC97D6",
      tag: "Plant Varity",
      value: mainMapCard.totalHmts || 0,
    },
    {
      bg: "#FDF9D6",
      highlight: "#FFE731",
      tag: "Plant Subcategory",
      value: mainMapCard.totalplantNames || 0,
    },
    {
      bg: "#d4ecde",
      highlight: "#426d52",
      tag: "Total Number of Plants",
      value: mainMapCard.totalNurseries || 0,
    },
  ];

  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      ls.remove("authToken");
    }
    return token;
  };

  const tokenData = fetchToken()?.data;
  console.log(tokenData, "TOKEN DATA ");
  const handleClickNurseryModalOpen = () => {
    setNurseryFormData([
      {
        plant_name: "",
        category: "",
        quantity: "",
        unit_price: "",
        nursery_id: tokenData?.id,
      },
    ]);
    setHMTModalOpen(true);
  };

  const handleHMTModalClose = () => {
    setNurseryFormData([
      {
        plant_name: "",
        category: "",
        quantity: "",
        unit_price: "",
      },
    ]);
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

  //Division and dristrict according data comes
  useEffect(() => {
    const fetchUser = async () => {
      setPlantDistrictTableLoder(true);
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/districts?divisionName=${selectedValue.division}&districtName=${selectedValue.district}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          setPlantDistrictTableLoder(false);
          setMainMapCard(response?.data);
          setDistrictWisePlantData(response?.data?.data);
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
  }, [selectedValue.district, selectedValue.division]);

  //Division according district dropdown comes
  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/district/division?division=${selectedValue.division}`;
      try {
        const response = await getFetch(url);
        if (response.status === 200) {
          setPlantDistrictTableLoder(false);
          setDistrictDropdown(["All", ...response?.data?.data]);
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

    fetchUser();
  }, [selectedValue.division]);

  //district according numrserys comes
  const fetchNurserys = async (district) => {
    setPlantNurseryTableLoder(true);
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nursery/district?district=${district}`;
    try {
      const response = await getFetch(url);
      if (response.status === 200) {
        setPlantNurseryTableLoder(false);
        setNurseryWiseData(response.data);
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

  //nursery according Plants comes
  const fetchPlantsData = async (nurseryId) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nurseries/plants/status?nursery_id=${nurseryId}`;
    try {
      const response = await getFetch(url);
      console.log(response, "Respomsne283");
      if (response.status === 200) {
        setPlantWiseData(response.data.plants);
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
    fetchPlantsData(tokenData?.id);
  }, []);

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
  const handleDataSubmit = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nurseries/plants`;
    const data = [
      ...nurseryFormData,

      // quantity: parseInt(nurseryFormData.quantity),
      // unit_price: parseFloat(nurseryFormData.unit_price),
    ];
    try {
      const response = await postFetch(url, data);
      console.log(response, "RESPONSEEEE");

      // setPlantVarietiesData(response.data.data);
      enqueueSnackbar(response?.message || "Server Error", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
      handleHMTModalClose();
      fetchPlantsData(tokenData?.id);
    } catch (error) {
      console.log(error, "ERRORRR");
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
      handleHMTModalClose();
    }
  };

  return (
    <React.Fragment>
      <NurseryModal
        nurseryFormData={nurseryFormData}
        setNurseryFormData={setNurseryFormData}
        HMTModalopen={HMTModalopen}
        handleHMTModalClose={handleHMTModalClose}
        onSubmit={handleDataSubmit}
        nurseryId={tokenData?.id}
      />
      <Grid
        style={{
          // marginTop: "3rem",
          position: "sticky",
          top: -0.1,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#426d52",
          height: "3rem",
        }}
      >
        {/* <Grid
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
              items={["2022", "2023", "2024"]}
              handleChange={(newValue) => handleStates(newValue, "year")}
              selectedItem={selectedValue.year}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select State"}
              items={["Uttarakhand"]}
              handleChange={(newValue) => handleStates(newValue, "state")}
              selectedItem={selectedValue.state}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select Division"}
              items={["Kumaon", "Garhwal"]}
              handleChange={(newValue) => handleStates(newValue, "division")}
              selectedItem={selectedValue.division}
            />
          </Grid>

          <Grid item>
            <AutocompleteSelect
              label={"Select District"}
              items={districtDropdown}
              handleChange={(newValue) => handleStates(newValue, "district")}
              selectedItem={selectedValue.district}
            />
          </Grid>
        </Grid> */}
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
        {tokenData?.user_role === "nursery" && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "-20px",
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
              onClick={handleClickNurseryModalOpen}
            >
              Add Plants
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <NurseryTableContainer data={plantWiseData} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default NurseryPage;
