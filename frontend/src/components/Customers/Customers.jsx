import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidenavbar from "../AdminDashboard/SideNavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/customer/allcustomers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const generatePDF = () => {
    const input = tableRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("customers.pdf");
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Sidenavbar />
      </Grid>
      <Grid item xs={9}>
        <div style={{ padding: "20px" }}>
          <h2>Registered Customers</h2>
          <Button sx={{ mr: "20%" }} variant="contained" onClick={generatePDF}>
            Generate PDF
          </Button>

          <TableContainer sx={{ mt: "20px" }} component={Paper} ref={tableRef}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.firstName}</TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.number}</TableCell>
                    <TableCell>{customer.gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
}

export default Customers;
