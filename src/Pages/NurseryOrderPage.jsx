import React, { useContext, useEffect, useState } from "react";
import NurseryOrderTable from "../Components/Nursery/NurseryOrderTable";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import MapBox from "../Home/MapContent/MapBox";
import { UserContext } from "../context/UserContext";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { getFetchWithToken, postFetch } from "../Components/API/Api";

export default function NurseryOrderPage() {
  const [level, setLevel] = useState(0);
  const [nurseryTableData, setNurseryTableData] = useState();

  const { selectedState, selectedDistrict } = useContext(UserContext);

  const [districtDropdown, setDistrictDropdown] = useState([]);
  const [stateDropDown, SetStateDropDown] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);

  const [breadcrumbData, setBreadcrumbData] = useState(["District"]);
  const [mainMapCard, setMainMapCard] = useState({});

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

  //
  //handlechange Dropdowns
  const handleStates = (newValue, key) => {
    setLevel(0);
    setBreadcrumbData(["District"]);
    setSelectedValue((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };
  const fetchOrderData = async (nurseryId) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/demands/view`;
    try {
      const response = await getFetchWithToken(url);
      // console.log(response, "ORDER DATA ");
      setNurseryTableData(response.data.demands);
      // if (response.status === 200) {
      //   setMainMapCard(response.data.data);
      //   setPlantWiseData(response.data.plant);
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
    fetchOrderData();
  }, []);
  const handleAppReject = async (row, btntype) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/demands/assign-to-nursery`;
    let data = {
      plant_id: row.plant_id,
      demand_id: row.demand_id,
      assigned_nursery_id: row.assigned_nursery_id,
      nursery_stock: row.quantity,
      required_quantity: row.required_quantity,
      demand_status: btntype,
    };
    try {
      const response = await postFetch(url, data);
      // console.log(response, "demands/assign-to-nursery");
      if (response.status === 200) {
        enqueueSnackbar(response?.data?.message || "Server Error", {
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

      fetchOrderData();
      // setNurseryTableData(response.data.demands);
      // if (response.status === 200) {
      //   setMainMapCard(response.data.data);
      //   setPlantWiseData(response.data.plant);
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
  return (
    <>
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
      {/* <MapBox
        mapCard={mapCard}
        // userRole={userRole}
        mainMapCard={mainMapCard}
        districtList={stateDropDown}
        LegendList={uniqueDistricts}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
      /> */}
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          padding: "20px 33px 20px 33px",
        }}
      >
        {/* {tokenData?.user_role === "HMT" && (
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
        )} */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <NurseryOrderTable
            data={nurseryTableData}
            handleAppReject={handleAppReject}
          />
        </Grid>
      </Grid>
    </>
  );
}
