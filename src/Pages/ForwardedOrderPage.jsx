import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ForwardedOrderTable from "../Components1/JointDirecComponent/ForwardedOrderTable";
import JDForwModal from "../Components1/JointDirecComponent/JDForwModal";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { getFetchWithToken } from "../Components/API/Api";

// const tableData = [
//   {
//     hmtName: "Plant A",
//     plantVariety: "red",
//     plantQuantity: "5",
//     hmtAddress: "123 Solar Rd, Sunnyville",
//     contact: "123-456-7890",
//     distance: "5 km",
//     requirement: 5,
//     nearest: true,
//     approvalActvBtn: true,
//   },
//   {
//     hmtName: "Plant B",
//     plantVariety: "green",
//     plantQuantity: "5",
//     hmtAddress: "123 Solar Rd, Sunnyville",
//     contact: "123-456-7890",
//     distance: "10 km",
//     requirement: 5,
//     nearest: false,
//     approvalActvBtn: false,
//   },

//   // Additional rows as needed...
// ];
export default function ForwardedOrderPage() {
  const [nurseryTableData, setNurseryTableData] = useState();
  const [jdModalOpen, setJdModalOpen] = useState(false);
  const handleClickParent = (row) => {
    console.log("HANDLECLICK PARENT", row);
    setJdModalOpen(true);
  };
  const handleJDModalClose = () => {
    setJdModalOpen(false);
  };
  const fetchOrderData = async (nurseryId) => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/demands/view`;
    try {
      const response = await getFetchWithToken(url);
      console.log(response, "ORDER DATA ");
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
  return (
    <>
      <JDForwModal
        jdModalOpen={jdModalOpen}
        handleJDModalClose={handleJDModalClose}
        // tableData={tableData}
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
          <ForwardedOrderTable
            data={nurseryTableData}
            handleClickParent={handleClickParent}
          />
        </Grid>
      </Grid>
    </>
  );
}
