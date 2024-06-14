import Table from "react-bootstrap/Table";
import Sidenavbar from "../AdminDashboard/SideNavbar";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import UserAddLineIcon from "remixicon-react/UserAddLineIcon";
import { Grid } from "@mui/material";

const RequstedMember = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //use react query and fetch members data
  const { data, isLoading, isError, refetch } = useQuery(
    "requestedMemberData",
    async () => {
      const response = await axios.get("http://localhost:3001/member/requestd");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const acceptMember = async (_id) => {
    try {
      await axios.put(`http://localhost:3001/member/accept/${_id}`);
      Swal.fire({
        icon: "success",
        title: "Member Accepted Successfully",
        text: "You have successfully accept a member request",
      });

      refetch();
    } catch (err) {
      console.log("Accept member error:", err);
    }
  };

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Sidenavbar />
        </Grid>
        <Grid item xs={9}>
          <div style={{ marginLeft: "-100px" }}>
            <br />
            <center>
              <h3>Requsted Members</h3>
            </center>

            <center>
              <Form className="d-flex" style={{ padding: "40px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  style={{ width: "400px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form>
            </center>

            <Table striped bordered hover style={{ width: "77rem" }}>
              <thead>
                <tr>
                  <th>Shop ID</th>
                  <th>Name</th>
                  <th>Shop Name</th>
                  <th>Category</th>
                  <th>Other</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Action</th>
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
                    <tr key={member.cusMemberID}>
                      <td>{member.cusMemberID}</td>
                      <td>{member.name}</td>
                      <td>{member.shop}</td>
                      <td>{member.category}</td>
                      <td>{member.otherCategory}</td>
                      <td>{member.email}</td>
                      <td>{member.mobile}</td>
                      <td>
                        <UserAddLineIcon
                          onClick={() => {
                            acceptMember(member._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Grid>
      </Grid>
      {/* <Sidenavbar /> */}
    </>
  );
};

export default RequstedMember;
