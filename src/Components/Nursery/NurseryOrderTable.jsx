import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import {
  Box,
  Grid,
  Card,
  Skeleton,
  Typography,
  Pagination,
} from "@mui/material";
import "../../style.css";
import actionbtn from "../../assets/images/nurseryactionbtn.png";

const headCells = [
  { id: "id", label: "S.No" },
  { id: "district", label: "Plant Name" },
  { id: "hmt", label: "Variety of Plants" },
  { id: "nursery", label: "Quantity" },
  { id: "varietyPlants1", label: "Requirement" },
  { id: "varietyPlants2", label: "HMT Name" },
  { id: "varietyPlants3", label: "HMT Address" },
  { id: "varietyPlants4", label: "HMT Email" },
  { id: "varietyPlants5", label: "HMT Contact" },
  { id: "varietyPlants6", label: "Action" },
];

export default function NurseryOrderTable({ loading, handleClickParent }) {
  const data = [
    {
      id: 1,
      district: "A",
      hmt: "80",
      nursery: "80",
      varietyPlantsRequirement: "80",
      hmtName: "HMT 1",
      hmtAddress: "123 Green St",
      hmtEmail: "hmt1@example.com",
      hmtContact: "1234567890",
      action: "View",
    },
    {
      id: 2,
      district: "B",
      hmt: "45",
      nursery: "45",
      varietyPlantsRequirement: "45",
      hmtName: "HMT 2",
      hmtAddress: "456 Forest Rd",
      hmtEmail: "hmt2@example.com",
      hmtContact: "0987654321",
      action: "View",
    },
    {
      id: 3,
      district: "C",
      hmt: "33",
      nursery: "33",
      varietyPlantsRequirement: "33",
      hmtName: "HMT 3",
      hmtAddress: "789 Plant Ave",
      hmtEmail: "hmt3@example.com",
      hmtContact: "1122334455",
      action: "View",
    },
    {
      id: 4,
      district: "D",
      hmt: "66",
      nursery: "66",
      varietyPlantsRequirement: "66",
      hmtName: "HMT 4",
      hmtAddress: "321 Farm Ln",
      hmtEmail: "hmt4@example.com",
      hmtContact: "2233445566",
      action: "View",
    },
    {
      id: 5,
      district: "E",
      hmt: "12",
      nursery: "12",
      varietyPlantsRequirement: "12",
      hmtName: "HMT 5",
      hmtAddress: "654 Meadow Blvd",
      hmtEmail: "hmt5@example.com",
      hmtContact: "3344556677",
      action: "View",
    },
    {
      id: 6,
      district: "F",
      hmt: "55",
      nursery: "55",
      varietyPlantsRequirement: "55",
      hmtName: "HMT 6",
      hmtAddress: "987 Greenbelt Cir",
      hmtEmail: "hmt6@example.com",
      hmtContact: "4455667788",
      action: "View",
    },
    {
      id: 7,
      district: "G",
      hmt: "3",
      nursery: "3",
      varietyPlantsRequirement: "3",
      hmtName: "HMT 7",
      hmtAddress: "111 Rural Rd",
      hmtEmail: "hmt7@example.com",
      hmtContact: "5566778899",
      action: "View",
    },
    {
      id: 8,
      district: "H",
      hmt: "2",
      nursery: "2",
      varietyPlantsRequirement: "2",
      hmtName: "HMT 8",
      hmtAddress: "222 Orchard St",
      hmtEmail: "hmt8@example.com",
      hmtContact: "6677889900",
      action: "View",
    },
  ];

  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const filtered = data.filter((item) =>
        item.district?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setFilteredData(filtered);
      setPageIndex(0);
    }
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
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
    overflowX: "auto",
  });
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#d4ecde",
    },
  });
  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        totals.hmtCount += Number(row.hmtCount);
        totals.nurseryCount += Number(row.nurseryCount);
        totals.plantCount += Number(row.plantCount);
        for (let key in totals) {
          totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
        }
        return totals;
      },
      {
        hmtCount: 0,
        nurseryCount: 0,
        plantCount: 0,
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
          padding: "12px 12px 12px 12px",
          borderRadius: "12px",
          minHeight: "700px",
        }}
        elevation={6}
      >
        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Grid item>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              District
            </Typography>
          </Grid>
        </Box> */}

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
                    const isEvenRow = ind % 2 === 1;
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
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap" }}
                          className="colorCodeTable"
                        >
                          {row.district}
                        </StyledTableCell>
                        {/* <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.hmt}
                        </StyledTableCell> */}
                        <StyledTableCell
                          className="colorCodeTable"
                          // style={{
                          //   color: row.nurseryCount === 0 ? "#808080" : "blue",
                          //   textDecoration:
                          //     row.nurseryCount === 0 ? "none" : "underline",
                          //   cursor:
                          //     row.nurseryCount === 0 ? "default" : "pointer",
                          // }}
                          // onClick={() =>
                          //   row.nurseryCount !== 0 && handleClickParent(row)
                          // }
                          align="center"
                        >
                          {row.nursery}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.varietyPlantsRequirement}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.varietyPlantsRequirement}
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
                          {row.hmtAddress}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.hmtEmail}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.hmtContact}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          <img src={actionbtn} alt="actionbtn" />
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
                    No data available
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
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.hmtCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.nurseryCount}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.plantCount}
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
          mt={1}
        >
          <Grid item>
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
