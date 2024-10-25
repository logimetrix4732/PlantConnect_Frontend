import React, { useState } from "react";

import NurseryTable from "./NurseryTable";

export default function NurseryTableContainer({
  level,
  setLevel,
  setBreadcrumbData,
  breadcrumbData,
  data,
  loading,
}) {
  const handleClickParent = (row) => {
    console.log(level, "===level");
    if (level === 0) {
      setLevel(1);
      //   fetchNurserys(row?.districtName);
      setBreadcrumbData([...breadcrumbData, row.districtName]);
    } else if (level === 1) {
      setLevel(2);
      //   fetchPlants(row?.nurseryId);
      setBreadcrumbData([...breadcrumbData, row.nurseryName]);
    } else if (level === 2) {
      setLevel(3);
      //   fetchPlantVariety(row?.plantName);
      setBreadcrumbData([...breadcrumbData, row.plantName]);
    } else if (level === 2) {
      setLevel(3);
      setBreadcrumbData([...breadcrumbData, row.nurseryName]);
    }
  };

  //   const handleBreadcrumbClick = (index) => {
  //     setLevel(index);
  //     setBreadcrumbData(breadcrumbData.slice(0, index + 1));
  //   };

  //   const updatedBreadcrumbData = breadcrumbData.map((data, index) => (
  //     <Link
  //       key={index}
  //       color="inherit"
  //       onClick={() => handleBreadcrumbClick(index)}
  //       style={{ cursor: "pointer" }}
  //     >
  //       {data}
  //     </Link>
  //   ));
  return (
    <React.Fragment>
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{
          fontSize: {
            xs: "14px",
            sm: "16px",
            md: "18px",
          },
        }}
        mt={4}
        aria-label="breadcrumb"
      >
        {updatedBreadcrumbData}
      </Breadcrumbs> */}

      {/* {level === 0 && (
        <PlantDistrictTable
          data={districtWisePlantData}
          loading={PlantDistrictTableLoder}
          handleClickParent={handleClickParent}
        />
      )}

       */}
      <NurseryTable />
    </React.Fragment>
  );
}
