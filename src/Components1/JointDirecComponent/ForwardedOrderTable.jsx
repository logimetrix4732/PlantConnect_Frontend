import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import actionBtn from "../../assets/images/jdactionbtn.png";

import {
  Box,
  Grid,
  Card,
  Skeleton,
  Typography,
  Pagination,
  Button,
  IconButton,
} from "@mui/material";
// import NotificationLoder from "../../Home/NotificationLoder";

const headCells = [
  { id: "id", label: "S.No" },
  { id: "district", label: "District" },
  { id: "dhoName", label: "DHO Name" },

  { id: "hmtName", label: "HMT Name" },
  { id: "plantName", label: "Plant Name" },
  { id: "plantVariety", label: "Plant Variety" },
  { id: "plantRequire", label: "Plant Requirement" },
  { id: "action", label: "Action" },
];

const data = [
  {
    sNo: 1,
    district: "Arunachal Pradesh",
    dhoName: "A",
    hmtName: "A",
    plantName: "A",
    plantVariety: "A",
    plantsRequirement: 46,
  },
  {
    sNo: 2,
    district: "Assam",
    dhoName: "B",
    hmtName: "B",
    plantName: "B",
    plantVariety: "B",
    plantsRequirement: 16,
  },
  {
    sNo: 3,
    district: "Manipur",
    dhoName: "C",
    hmtName: "C",
    plantName: "C",
    plantVariety: "C",
    plantsRequirement: 65,
  },
  {
    sNo: 4,
    district: "Meghalaya",
    dhoName: "D",
    hmtName: "D",
    plantName: "D",
    plantVariety: "D",
    plantsRequirement: 28,
  },
  {
    sNo: 5,
    district: "Mizoram",
    dhoName: "E",
    hmtName: "E",
    plantName: "E",
    plantVariety: "E",
    plantsRequirement: 56,
  },
  {
    sNo: 6,
    district: "Nagaland",
    dhoName: "F",
    hmtName: "F",
    plantName: "F",
    plantVariety: "F",
    plantsRequirement: 38,
  },
  {
    sNo: 7,
    district: "Tripura",
    dhoName: "G",
    hmtName: "G",
    plantName: "G",
    plantVariety: "G",
    plantsRequirement: 42,
  },
  {
    sNo: 8,
    district: "Sikkim",
    dhoName: "H",
    hmtName: "H",
    plantName: "H",
    plantVariety: "H",
    plantsRequirement: 56,
  },
];

export default function ForwardedOrderTable({
  //   data,
  loading,
  handleClickParent,
  slaTrue = false,
  onEditForm,
}) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  //   useEffect(() => {
  //     if (data?.length) {
  //       const filtered = data.filter((item) =>
  //         item.spName?.toLowerCase()?.includes(search?.toLowerCase())
  //       );
  //       setFilteredData(filtered);
  //       setPageIndex(0);
  //     }
  //   }, [search, data]);

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((project) =>
          Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(search?.toLowerCase())
          )
        )
      );
    }
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    whiteSpace: "nowrap",
    minHeight: { xs: "400px", md: "400px", lg: "500px" },
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    [theme.breakpoints.down("sm")]: {
      padding: "4px",
      fontSize: "0.8rem",
    },
  }));

  const StyledTableContainer = styled(TableContainer)({
    borderRadius: 12,
    width: "100%",
    minHeight: { xs: "300px", md: "400px", lg: "628px" },
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    overflowX: "auto", // Enable horizontal scrolling if needed
  });
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#BEFCE8",
    },
  });
  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        const parseNumber = (value) => Number(value?.replace(/,/g, ""));
        // totals.stateCount += parseNumber(row.stateCount);
        // totals.districtCount += parseNumber(row.districtCount);
        totals.figCount += parseNumber(row.figCount);
        totals.landArea += parseNumber(row.landArea);
        totals.farmerCount += parseNumber(row.farmerCount);

        // totals.fpoCount += parseNumber(row.fpoCount);

        for (let key in totals) {
          totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
        }
        return totals;
      },
      {
        // stateCount: 0,
        // districtCount: 0,
        figCount: 0,
        landArea: 0,
        farmerCount: 0,
        // fpoCount: 0,
      }
    );
  };

  const totals = calculateTotals(filteredData);
  const renderSkeletonRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={index}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.label} align="center">
            <Skeleton variant="text" />
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };

  const renderPlaceholderRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={`placeholder-${index}`}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center">
            &nbsp;
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year},${hours}:${minutes}`;
  }
  return (
    <>
      <Card
        style={{
          padding: "12px 12px 12px 12px",
          borderRadius: "12px",
        }}
        elevation={6}
      >
        {/* <Typography
          color="text.secondary"
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            paddingBottom: "12px",
          }}
        >
          SP
        </Typography> */}
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#426D52" }}>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <StyledTableCell
                    key={index}
                    style={{ color: "white" }}
                    align="center"
                  >
                    {headCell.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeletonRows(10)
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    const isEvenRow = ind % 2 === 1;
                    const originalTimestamp = row?.createdAt;
                    const originalDate = new Date(originalTimestamp);
                    const options = {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    };
                    const convertedTimestamp = originalDate?.toLocaleString(
                      "en-GB",
                      options
                    );
                    return (
                      <StyledTableRow
                        key={ind}
                        sx={{
                          backgroundColor: isEvenRow
                            ? "#BEFCE8 "
                            : "transparent",
                        }}
                      >
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                          // style={{
                          //   color: "blue",
                          //   textDecoration: "underline",
                          //   cursor: "pointer",
                          // }}
                          // onClick={() => handleClickParent(row)}
                        >
                          {row.district}
                        </StyledTableCell>
                        {/* <StyledTableCell
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            row.fpoCount !== 0 && handleClickParent(row)
                          }
                          align="center"
                        >
                          {row.fpoCount}
                        </StyledTableCell> */}

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.dhoName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.hmtName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.plantName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          // style={{
                          //   color:
                          //     row.Status === "Approved"
                          //       ? "var(--green,#43C17A)"
                          //       : row.Status === "Pending"
                          //       ? "var(--yellow, #FEBA55)"
                          //       : "#F12E00",
                          // }}
                          className="colorCodeTable"
                        >
                          {row.plantVariety}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.plantsRequirement}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          // className="colorCodeTable"
                        >
                          <IconButton onClick={() => handleClickParent(row)}>
                            <img
                              style={{
                                height: "auto",
                                objectFit: "contain",
                                // backgroundColor: "red",
                              }}
                              src={actionBtn}
                              alt="actionbtn"
                              key="jdactionbtn"
                              // key={row.plantName}
                            />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <StyledTableCell
                    style={{
                      height: "500px",
                    }}
                    colSpan={headCells.length}
                    align="center"
                  >
                    {/* <NotificationLoder /> */}
                    No data available
                  </StyledTableCell>
                </TableRow>
              )}
              {!loading &&
                filteredData.length > 0 &&
                renderPlaceholderRows(
                  Math.max(
                    0,
                    pageSize -
                      filteredData.slice(
                        pageIndex * pageSize,
                        (pageIndex + 1) * pageSize
                      ).length
                  )
                )}
              {/* {!loading &&
                filteredData.length < pageSize &&
                filteredData.length > 0 &&
                renderPlaceholderRows(
                  Math.max(
                    0,
                    pageSize -
                      filteredData.slice(
                        pageIndex * pageSize,
                        (pageIndex + 1) * pageSize
                      ).length
                  )
                )} */}
              {!loading && filteredData.length > 0 && (
                <StyledTableRow key={"totals-state"}>
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    className="colorCodeTable"
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>
                  {/* <StyledTableCell align="center" className="colorCodeTable">
                    {totals.districtCount}
                  </StyledTableCell> */}
                  {/* <StyledTableCell align="center" className="colorCodeTable">
                    {totals.fpoCount}
                  </StyledTableCell> */}
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.figCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.landArea}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.farmerCount}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={0.5}
          mb={0.5}
        >
          <Grid item ml={2}>
            <Typography variant="caption">
              Showing {entriesStart} - {entriesEnd} of {filteredData.length}{" "}
              entries
            </Typography>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(filteredData.length / pageSize)}
              page={pageIndex + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Box>
      </Card>
    </>
  );
}
