import React, { useState } from "react";
import { Grid } from "@mui/material";
import VisitApprovalTbl from "./VisitApprovalTbl";
import VisitApprovalModal from "./VisitApprovalModal";
import { nurseryDataVisitApprove } from "../../PlantTables/StaticData";

const VisitApproval = () => {
  const [VisitApprovalModalOpen, setVisitApprovalModalOpen] = useState(false);
  const handleVisitApprovalOpen = () => {
    setVisitApprovalModalOpen(true);
  };
  const handleVisitApprovalClose = () => {
    setVisitApprovalModalOpen(false);
  };
  return (
    <React.Fragment>
      <VisitApprovalModal
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
          <VisitApprovalTbl
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
export default VisitApproval;
