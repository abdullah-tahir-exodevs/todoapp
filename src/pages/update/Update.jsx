import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../component/navbar/navbar";
import backend from "../../api";

export default function EditUserpage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const findUser = users.find((e) => e._id === id);
  const [editUser, setEditUser] = useState(findUser);
  const postEditUser = async () => {
    try {
      const body = {
        title: editUser.title,
        description: editUser.description,
        status: editUser.status,
      };
      const resp = await backend.put(`/api/user/${id}`, body);
      toast.success(resp.data.message);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || error);
    }
  };

  return (
    <>
      <Navbar>
        <Container maxWidth="lg">
          <div className="createList">Get All User</div>
          <Grid container className="responsiveHandler" xs={12}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Title"
                value={editUser?.title}
                style={{ marginTop: "1rem", width: "70%" }}
                onChange={(e) =>
                  setEditUser({ ...editUser, title: e.target.value })
                }
                InputProps={{
                  shrink: "true",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                style={{ marginTop: "1rem", width: "70%" }}
                InputProps={{
                  shrink: "true",
                }}
                // disabled={disabled}
                label="description"
                onChange={(e) =>
                  setEditUser({ ...editUser, description: e.target.value })
                }
                value={editUser?.description}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className="responsiveHandler"
            sx={{ marginTop: "1rem" }}
          >
            <Grid item xs={3} sm={3} md={2}>
              <Button
                class="button-89"
                varient="contained"
                onClick={postEditUser}
              >
                Save
              </Button>
              <ToastContainer />
            </Grid>
            <Grid item xs={3} sm={3} md={6}>
              <Link to="/" varient="outlined" className="cancelBtn">
                <button class="button-89" role="button" color="primary">
                  Cancel
                </button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Navbar>
    </>
  );
}
