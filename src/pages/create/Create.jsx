import { Container } from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./create.css";
import backend from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar/navbar";
function Create() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    title: yup.string("Enter your Title").required("Title is required"),
    description: yup
      .string("Enter your Description")
      .required("Description is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("LOCAL_URL", process.env.REACT_APP_OCAL_URL);
        const resp = await backend.post("/api/user", values);
        console.log(resp);
        toast.success(resp?.data?.message);

        // alert(JSON.stringify(values, null, 2));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (e) {
        toast.success(e?.resp?.data?.message || e.message || e);
      }
    },
  });

  return (
    <Navbar>
      <Container maxWidth="sm">
        <div className="createList">Create the List</div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="title"
              className="title"
              name="title"
              label="title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              className="description"
              fullWidth
              variant="outlined"
              id="description"
              name="description"
              label="description"
              multiline
              maxRows={10}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <button
              class="button-89"
              role="button"
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={
                !formik.values.title && !formik.values.description
                  ? true
                  : false
              }
            >
              {" "}
              Submit
            </button>
          </form>
        </div>
      </Container>
    </Navbar>
  );
}

export default Create;
