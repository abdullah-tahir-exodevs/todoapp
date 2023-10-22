import React, { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { forwardRef } from "react";
import Switch from "@mui/material/Switch";
import Navbar from "../../component/navbar/navbar";
import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import MaterialTable from "material-table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {
  Container,
  Grid,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import backend from "../../api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
function AllUser() {
  const defaultMaterialTheme = createTheme();
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const getAllUsers = async () => {
    try {
      const resp = await backend.get("/api/user");
      dispatch({
        type: "USER_SUCCESS",
        payload: resp?.data?.data,
      });
    } catch (err) {
      console.log(err.response.data?.message);
      if (err.response.data?.message !== "No records found") {
        toast.error(err?.response?.data?.message || err?.message || err);
      }
    }
  };
  const RenderStatusBtn = (params) => {
    return (
      <>
        <div className="form-check form-switch">
          <Switch
            checked={params?.status.props.children === "active" ? true : false}
            onChange={() => changeStatus(params.status, params.Id)}
          />
        </div>
      </>
    );
  };
  const renderActionBtn = (params) => {
    return (
      <Grid>
        <Link to={`/edituserpage/${params.Id}`}>
          <Tooltip title="Edit Users">
            <EditLocationAltIcon />
          </Tooltip>
        </Link>
        <Link onClick={() => DeleteUser(params)}>
          <Tooltip title="Delete Users">
            <DeleteIcon />
          </Tooltip>
        </Link>
        <Link to={`/detailpage/${params.Id}`}>
          <Tooltip title="Detail Users">
            <VisibilityIcon />
          </Tooltip>
        </Link>
      </Grid>
    );
  };

  const DeleteUser = async (params) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete",
        showCancelButton: true,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await backend.delete(`/api/user/${params.Id}`);
          toast.success(resp?.data?.message);
          getAllUsers();
          if (users?.length === 1) {
            dispatch({
              type: "USER_SUCCESS",
              payload: resp?.data?.data,
            });
          }
        }
      });
    } catch (err) {
      toast.error(err.response.data.message || err.message || err);
    }
  };

  const row = [];
  if (users) {
    let s = 1;
    users.map((e, i) => {
      row.push({
        Id: e?._id,
        id: s++,
        title: <p style={{ textTransform: "capitalize" }}>{e?.title}</p>,
        description: e?.description?.slice(0, 20),
        status:
          e?.status === true ? (
            <p className="statusGreen">active</p>
          ) : (
            <p className="statusRed">disabled</p>
          ),
      });
    });
  }
  const column = [
    {
      field: "id",
      title: "Sr. no",
    },

    {
      field: "title",
      title: "Title",
    },
    {
      field: "description",
      title: "Description",
    },
    {
      field: "status",
      title: "Status",
    },
    {
      field: "changestatus",
      title: "Change Status",
      render: RenderStatusBtn,
    },
    {
      field: "Action",
      title: "Action",
      render: renderActionBtn,
    },
  ];
  const changeStatus = async (status, id, event) => {
    console.log(status, id);
    try {
      const value = status.props.children === "active" ? false : true;
      const body = {
        status: value,
      };
      const resp = await backend.put(`/api/user/${id}`, body);
      toast.success(resp?.data?.message);
      getAllUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Navbar>
      <Container maxWidth="lg">
        <div className="createList">Get All Data</div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            title="Simple Action Preview"
            columns={column}
            data={row}
          />
        </ThemeProvider>
      </Container>
    </Navbar>
  );
}

export default AllUser;
