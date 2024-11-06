import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import edit from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";
import {
  Box,
  Grid,
  Card,
  Skeleton,
  Typography,
  Pagination,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import NotificationLoder from "../../Home/NotificationLoder";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
const headCells = [
  { id: "number", label: "No." },
  { id: "hmtName", label: "HMT Name" },
  { id: "plantVariety", label: "Plant Variety" },
  { id: "plantQuantity", label: "Plant Quantity" },
  { id: "hmtAddress", label: "HMT Address" },
  { id: "contactDetail", label: "Contact Detail" },
  { id: "distance", label: "Distance" },
  { id: "requirement", label: "Requirement" },
  { id: "action", label: "Action" },
];
export default function PlantModalTable({ loading, tableData }) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (tableData) {
      setFilteredData(
        tableData.filter((project) =>
          Object.values(project).some((value) =>
            value.toString().toLowerCase().includes(search?.toLowerCase())
          )
        )
      );
    }
  }, [search, tableData]);

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
      backgroundColor: "#d4ecde",
    },
  });
  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        const parseNumber = (value) => Number(value?.replace(/,/g, ""));
        totals.stateCount += parseNumber(row.stateCount);
        totals.districtCount += parseNumber(row.districtCount);
        totals.fpoCount += parseNumber(row.fpoCount);
        totals.figCount += parseNumber(row.figCount);
        totals.landArea += parseNumber(row.landArea);
        totals.farmerCount += parseNumber(row.farmerCount);
        for (let key in totals) {
          totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
        }
        return totals;
      },
      {
        stateCount: 0,
        districtCount: 0,
        fpoCount: 0,
        figCount: 0,
        landArea: 0,
        farmerCount: 0,
      }
    );
  };

  const totals = calculateTotals(filteredData);
  const renderSkeletonRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={index}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center">
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

  return (
    <React.Fragment>
      <Card
        style={{
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          borderBottomLeftRadius: "12px",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#426d52" }}>
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
                    return (
                      <StyledTableRow key={ind}>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.hmtName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNameWidth"
                        >
                          {row.plantVariety}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.plantQuantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.hmtAddress}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.contact}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.distance}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          <Card
                            style={{
                              border: "1px solid #ddd",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "3px",
                              borderRadius: "8px",
                              backgroundColor: "#fff",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              width: "80px",
                            }}
                          >
                            <input
                              type="number"
                              defaultValue={row.requirement}
                              style={{
                                width: "60px",
                                height: "25px",
                                textAlign: "center",
                                border: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#555",
                                backgroundColor: "transparent",
                                outline: "none",
                              }}
                            />
                          </Card>
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          <Button
                            style={{
                              color: "#fff",
                              width: "80px",
                              marginRight: "10px",
                              height: "30px",
                              background: "#808080",
                              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                              borderRadius: "4px",
                            }}
                          >
                            Approval
                          </Button>
                          <Button
                            style={{
                              color: "#fff",
                              width: "80px",
                              height: "30px",
                              background: "#E2C800",
                              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.13)",
                              borderRadius: "4px",
                            }}
                          >
                            Onward
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <StyledTableCell
                    style={{
                      height: "571px",
                    }}
                    colSpan={headCells.length}
                    align="center"
                  >
                    <NotificationLoder />
                  </StyledTableCell>
                </TableRow>
              )}
              {!loading &&
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
    </React.Fragment>
  );
}
