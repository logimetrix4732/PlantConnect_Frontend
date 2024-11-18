import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ForwardedOrderTable from "../Components1/JointDirecComponent/ForwardedOrderTable";
import JDForwModal from "../Components1/JointDirecComponent/JDForwModal";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { getFetchWithToken, postFetch } from "../Components/API/Api";

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
  const [nearByNurseryTableData, setNearByNurseryTableData] = useState();
  const [nurseryTableData, setNurseryTableData] = useState();

  const [jdModalOpen, setJdModalOpen] = useState(false);
  const [jdModalHeading, setJdModalHeading] = useState("");
  const handleClickParent = (row) => {
    // console.log("HANDLECLICK PARENT", row);
    setJdModalHeading(row.hmt_name);
    handleFetchNearby(row);
    setJdModalOpen(true);
  };
  const handleFetchNearby = async (row) => {
    // console.log(row, "ROW+++++++++>");
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/nurseries/nearby`;
    const data = {
      demand_id: row.demand_id,
      plant_name: row.plant_name,
      plant_variety: row.plant_category,
    };
    try {
      const response = await postFetch(url, data);
      // console.log(response, "nurseries/nearby=====>");
      if (response.status === 200) {
        setNearByNurseryTableData(response.data.nurseries);
      }

      // setPlantVarietiesData(response.data.data);
      // enqueueSnackbar(response?.message || "Server Error", {
      //   variant: "success",
      //   anchorOrigin: {
      //     vertical: "bottom",
      //     horizontal: "left",
      //   },
      //   action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
      //   iconVariant: "success",
      //   autoHideDuration: 2000,
      // });

      // fetchPlantsData(tokenData?.id);
    } catch (error) {
      // console.log(error, "ERRORRR");
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
  const handleJDModalClose = () => {
    setJdModalOpen(false);
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
  const handleApproval = async (row, status) => {
    // console.log(row, "HANDLE ROW APPROVAL");
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/demands/assign-to-nursery`;
    const data = {
      demand_id: row.demand_id,
      assigned_nursery_id: row.nursery_id,
      required_quantity: row.farmerPlantRequirement,
      demand_status: status,
    };
    try {
      const response = await postFetch(url, data);
      // console.log(response, "nurseries/nearby=====>");
      if (response.status === 200) {
        setJdModalOpen(false);
        fetchOrderData();
        enqueueSnackbar(response?.data.message || "Server Error", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
          iconVariant: "success",
          autoHideDuration: 2000,
        });
        // setNearByNurseryTableData(response.data.nurseries);
      }

      // setPlantVarietiesData(response.data.data);
      // enqueueSnackbar(response?.message || "Server Error", {
      //   variant: "success",
      //   anchorOrigin: {
      //     vertical: "bottom",
      //     horizontal: "left",
      //   },
      //   action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
      //   iconVariant: "success",
      //   autoHideDuration: 2000,
      // });

      // fetchPlantsData(tokenData?.id);
    } catch (error) {
      // console.log(error, "ERRORRR");
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
      <JDForwModal
        jdModalHeading={jdModalHeading}
        handleApproval={handleApproval}
        jdModalOpen={jdModalOpen}
        handleJDModalClose={handleJDModalClose}
        tableData={nearByNurseryTableData}
        setTableData={setNearByNurseryTableData}
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
