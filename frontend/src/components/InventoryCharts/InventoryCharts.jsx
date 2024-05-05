// eslint-disable-next-line no-unused-vars
import React from "react";
import ShopMemberNavbar from "../ShopMemberNavbar/ShopMemberNavBar";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useQuery } from "react-query";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import Container from "react-bootstrap/esm/Container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function InventoryCharts() {
  const [searchQuery, setSearchQuery] = useState("");
  // use react query and fetch member data
  const { data, isLoading, isError } = useQuery(
    "acceptedMemberData",
    async () => {
      const response = await axios.get("http://localhost:3001/product");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  //   Product Quntity by Category
  const getCategoryData = (products) => {
    const categoryQuantities = {};

    products.forEach((product) => {
      if (categoryQuantities[product.category]) {
        categoryQuantities[product.category] += product.quantity;
      } else {
        categoryQuantities[product.category] = product.quantity;
      }
    });

    const labels = Object.keys(categoryQuantities);
    const data = Object.values(categoryQuantities);

    return { labels, data };
  };

  const lineChartData = getCategoryData(data);

  const chartData = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: "Quantity by Category",
        data: lineChartData.data,
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Quantity by Category",
      },
    },
  };

  // Bar chart
  const getProductPriceData = (products) => {
    const labels = products.map((product) => product.name);
    const actualPrices = products.map((product) => product.actualPrice);
    const sellingPrices = products.map((product) => product.sellingPrice);
    const profits = products.map(
      (product) => product.sellingPrice - product.actualPrice
    );

    return {
      labels,
      datasets: [
        {
          label: "Actual Price",
          data: actualPrices,
          backgroundColor: "orange",
        },
        {
          label: "Selling Price",
          data: sellingPrices,
          backgroundColor: "blue",
        },
        {
          label: "Profit Per One Unit",
          data: profits,
          backgroundColor: "#1EF220",
        },
      ],
    };
  };

  const barChartData = getProductPriceData(data);

  return (
    <>
      <ShopMemberNavbar />
      <br />
      <center>
        <Container style={{ margin: "70px" }}>
          <Row>
            <Col>
              <Line
                data={chartData}
                options={chartOptions}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Comparison of Actual and Selling Prices",
                    },
                  },
                }}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Container>
      </center>
      <br /> <br /> <br /> <br /> <br /> <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Category</th>
            <th>Actual Price</th>
            <th>Selling Price</th>
            <th>Quantity</th>
            <th>Added Date</th>
            <th>Expire Date</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((member) =>
              Object.values(member).some((value) =>
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
            )
            .map((member) => (
              <tr key={member.cusProductID}>
                <td>{member.cusProductID}</td>
                <td>
                  <div
                    style={{
                      width: "100px",
                      height: "50px",
                      backgroundSize: "cover",
                      backgroundImage: `url(${member.productImage})`,
                    }}
                  />
                </td>
                <td>{member.name}</td>
                <td>{member.description}</td>
                <td>{member.category}</td>
                <td>Rs. {member.actualPrice}</td>
                <td>Rs. {member.sellingPrice}</td>
                <td>{member.quantity}</td>
                <td>{new Date(member.added_date).toLocaleDateString()}</td>
                <td>{new Date(member.expire_date).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <br /> <br /> <br /> <br /> <br /> <br />
    </>
  );
}

export default InventoryCharts;
