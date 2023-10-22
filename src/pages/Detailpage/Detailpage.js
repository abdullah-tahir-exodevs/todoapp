import React from "react";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../component/navbar/navbar";
export default function Detailpage() {
  let { id } = useParams();
  const { users } = useSelector((state) => state.users);

  const findUser = users.find((e) => e._id === id);
  return (
    <Navbar>
      <Container maxwidth="lg">
        <div className="createList">Detail Page</div>
        <Grid container className="responsiveHandler">
          <TableContainer>
            <Table
              style={{
                border: "1px solid #ebeaeb",
              }}
            >
              <TableBody>
                <TableRow className="tableCellResponseivness">
                  <TableCell
                    sx={{
                      width: { xs: "100%", sm: "100%", md: "60%" },
                      fontWeight: "600",
                      fontSize: "17px",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell>{findUser?.title}</TableCell>
                </TableRow>
                <TableRow className="tableCellResponseivness">
                  <TableCell
                    className="tableCellStyle"
                    style={{ fontWeight: "600", fontSize: "17px" }}
                  >
                    Description
                  </TableCell>
                  <TableCell>{findUser?.description}</TableCell>
                </TableRow>
                <TableRow className="tableCellResponseivness">
                  <TableCell
                    className="tableCellStyle"
                    style={{ fontWeight: "600", fontSize: "17px" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      width: "100%",
                    }}
                    sx={{ ml: { xs: 0, sm: 0, md: "1rem", fontSize: "14px" } }}
                  >
                    {findUser?.status === "active" ? (
                      <p className="statusGreen">active</p>
                    ) : (
                      <p className="statusRed">disabled</p>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="tableCellResponseivness">
                  <TableCell
                    className="tableCellStyle"
                    style={{ fontWeight: "600", fontSize: "17px" }}
                  >
                    Created Date
                  </TableCell>
                  <TableCell
                    style={{
                      width: "100%",
                    }}
                    sx={{ ml: { xs: 0, sm: 0, md: "1rem" }, fontSize: "17px" }}
                  >
                    {format(
                      new Date(findUser?.createdAt),
                      "dd:MMM:Y , h:mm aaa"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="tableCellResponseivness">
                  <TableCell
                    className="tableCellStyle"
                    style={{ fontWeight: "600", fontSize: "17px" }}
                  >
                    Updated Date
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "100%",
                      fontSize: "17px",

                      ml: { xs: 0, sm: 0, md: "1rem" },
                    }}
                  >
                    {format(
                      new Date(findUser?.updatedAt),
                      "dd:MMM:Y , h:mm aaa"
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </Navbar>
  );
}
