import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import VisitApprovalTbl from "./VisitApprovalTbl";
import VisitApprovalModal from "./VisitApprovalModal";
import { nurseryDataVisitApprove } from "../../PlantTables/StaticData";
import { getFetchWithToken, postFetch } from "../../../Components/API/Api";
import CloseIcon from "@mui/icons-material/Close";

import { closeSnackbar, enqueueSnackbar } from "notistack";

const VisitApproval = () => {
  const [nurseryQuantityDate, setNurseryQuantityDate] = useState(null);

  const [visitDate, setVisitDate] = useState(null);
  const [nurseryQuantity, setNurseryQuantity] = useState("");
  const [visitStatus, setVisitStatus] = useState("");
  const [dhoApprovedQuantity, setDhoApprovedQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [visitAprForm, setVisitAprForm] = useState({
    nurseryVisitDate: new Date(),
    nurseryPlantQuantity: "",
    dhoApprQuan: "",
    remark: "",
    plant_id: "",
  });

  const handleVisitChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value, "EVENTTTT");
    setVisitAprForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleVisitDateChange = (name) => (newValue) => {
    setVisitAprForm((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const [VisitApprovalModalOpen, setVisitApprovalModalOpen] = useState(false);
  const [visitAppData, setVisitAppData] = useState([]);
  const handleVisitApprovalOpen = (row) => {
    // console.log(row.quantity, "HANDLE VIST TABLE");
    setVisitAprForm((visitAprForm) => ({
      ...visitAprForm,
      nurseryPlantQuantity: row.quantity,
      plant_id: row.plant_id,
    }));
    setVisitApprovalModalOpen(true);
  };
  const handleVisitApprovalClose = () => {
    setVisitApprovalModalOpen(false);
  };
  const fetchAppData = async () => {
    // let data = {
    //   district: district,
    // };
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/visit/plant/pending`;
    try {
      const response = await getFetchWithToken(url);
      // setPlantNurseryTableLoder(false);
      // console.log(response.data, "FRETHC APPP DATA    =====>");
      if (response.status === 200) {
        setVisitAppData(response?.data?.plants);
      }

      // if (district !== "All" && tokenData?.data?.user_role !== "HMT") {
      //   setBreadcrumbData([...breadcrumbData, district]);
      //   setLevel(1);
      // }

      // setNurseryWiseData(response.data);
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
    fetchAppData();
  }, []);
  const handleApprSubmit = async (status) => {
    let data = {
      plant_id: visitAprForm.plant_id,
      last_visit: visitAprForm.nurseryVisitDate,
      status: status,
      quantity_approved_by_dho: visitAprForm.dhoApprQuan,
      remarks: visitAprForm.remark,
    };
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/visit/plant/approval`;
    try {
      const response = await postFetch(url, data);
      // setPlantNurseryTableLoder(false);
      // console.log(response, "handleApprSubmit    =====>");
      if (response.status === 200) {
        fetchAppData();
        setVisitApprovalModalOpen(false);
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

      // setVisitAppData(response.data.plants);
      // if (district !== "All" && tokenData?.data?.user_role !== "HMT") {
      //   setBreadcrumbData([...breadcrumbData, district]);
      //   setLevel(1);
      // }

      // setNurseryWiseData(response.data);
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
    <React.Fragment>
      <VisitApprovalModal
        open={VisitApprovalModalOpen}
        handleVisitChange={handleVisitChange}
        handleVisitDateChange={handleVisitDateChange}
        visitAprForm={visitAprForm}
        handleClose={handleVisitApprovalClose}
        handleApprSubmit={handleApprSubmit}
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
            data={visitAppData}
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
