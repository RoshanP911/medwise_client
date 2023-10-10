import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../services/axiosInterceptor";
import toast from "react-hot-toast";


//from material ui
export default function DialogBox({ name, col, id, refreshHandler }) {
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  //   const [id, setId] = React.useState(drId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  //TO BLOCK DOCTOR
  const confirmBlockAction = async () => {
    try {
      const response = await axios.post("/admin/blockDoctor", {
        doctorId: id,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setRefresh(!refresh);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    refreshHandler()
  };


//TO APPROVE DOCTOR
  const confirmApprove = async () => {
    try {
      const response = await axios.post("/admin/approveDoctor", {
        doctorId: id,
      });

      setRefresh(!refresh);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  //Function to trigger PDF download from Cloudinary
  const handleDownload = async () => {
    try {
      const response = await axios.post("/admin/doc-document", {
        doctorId: id,
      });
      const dataa = response.data.data;
      const response1 = await fetch(`${dataa}`);
      const blob = await response1.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `image`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.log("error downloaddd");
    }
  };

  return (
    <div>
      <Button color={col} variant="contained" onClick={handleClickOpen}>
        {name}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to do this?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running. */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {name === 'View' ? (<>
            <Button onClick={() =>setOpen(false)} color="primary">
            Cancel
          </Button>

          <Button onClick={() => {
              confirmApprove();
              setOpen(false);
            }} color="primary">
            Approve
          </Button>

          <Button onClick={() => {
              handleDownload();
              setOpen(false);
            }} color="primary">
            Download
          </Button></>) : (<>
            <Button
            onClick={() => {
              confirmBlockAction();
              setOpen(false);
            }}
          >
            ok
          </Button>
          <Button onClick={handleClose} autoFocus>
            cancel
          </Button>
          </>)}
        
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
