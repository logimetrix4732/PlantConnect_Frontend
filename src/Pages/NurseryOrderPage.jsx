import React, { useContext, useState } from "react";
import NurseryOrderTable from "../Components/Nursery/NurseryOrderTable";
import { Grid } from "@mui/material";
import AutocompleteSelect from "../Components/Dropdown/AutocompleteSelect";
import MapBox from "../Home/MapContent/MapBox";
import { UserContext } from "../context/UserContext";

export default function NurseryOrderPage() {
  const [level, setLevel] = useState(0);
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

  return (
    <>
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
          <NurseryOrderTable />
        </Grid>
      </Grid>
    </>
  );
}
