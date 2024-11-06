import { Grid } from "@mui/material";
import React, { useState } from "react";
import ForwardedOrderTable from "../Components1/JointDirecComponent/ForwardedOrderTable";
import JDForwModal from "../Components1/JointDirecComponent/JDForwModal";
const tableData = [
  {
    hmtName: "Plant A",
    plantVariety: "red",
    plantQuantity: "5",
    hmtAddress: "123 Solar Rd, Sunnyville",
    contact: "123-456-7890",
    distance: "5 km",
    requirement: "",
  },

  // Additional rows as needed...
];
export default function ForwardedOrderPage() {
  const [jdModalOpen, setJdModalOpen] = useState(false);
  const handleClickParent = (row) => {
    console.log("HANDLECLICK PARENT", row);
    setJdModalOpen(true);
  };
  const handleJDModalClose = () => {
    setJdModalOpen(false);
  };
  return (
    <>
      <JDForwModal
        jdModalOpen={jdModalOpen}
        handleJDModalClose={handleJDModalClose}
        tableData={tableData}
      />
      <Grid
        style={{
          //   marginTop: "3rem",
          position: "sticky",
          top: -0.1,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#426d52",
          height: "3rem",
        }}
      ></Grid>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          padding: "20px 33px 20px 33px",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ForwardedOrderTable handleClickParent={handleClickParent} />
        </Grid>
      </Grid>
    </>
  );
}
