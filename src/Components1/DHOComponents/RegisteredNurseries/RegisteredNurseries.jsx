import { Grid } from "@mui/material";
import React, { useState } from "react";
import RegisteredNurseriesTbl from "./RegisteredNurseriesTbl";
import RegisteredNurseriesModal from "./RegisteredNurseriesModal";
import { nurseryDataVisitApprove } from "../../../Home/PlantTables/StaticData";

const RegisteredNurseries = () => {
  const [VisitApprovalModalOpen, setVisitApprovalModalOpen] = useState(false);
  const handleVisitApprovalOpen = () => {
    setVisitApprovalModalOpen(true);
  };
  const handleVisitApprovalClose = () => {
    setVisitApprovalModalOpen(false);
  };
  return (
    <React.Fragment>
      <RegisteredNurseriesModal
        open={VisitApprovalModalOpen}
        handleClose={handleVisitApprovalClose}
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
        ></Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          padding: "20px 33px 20px 33px",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <RegisteredNurseriesTbl
            data={nurseryDataVisitApprove}
            // data={nurseryWiseData}
            loading={false}
            handleVisitApprovalOpen={handleVisitApprovalOpen}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default RegisteredNurseries;
