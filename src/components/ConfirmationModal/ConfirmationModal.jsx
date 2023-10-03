 import React, { useState } from 'react';
 import { Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';



 const ConfirmationModal = () => {

// Modal state
const[openConfirmBox,setOpenConfirmBox]=useState(false)  //to open and close ConfirmBox modal
const [actionUserId,setActionUserId]=useState(null) // Store user ID for action confirmation



return (
<>

 <Dialog open={openConfirmBox} onClose={closeConfirmBlockModal}>
 <DialogTitle>Confirm</DialogTitle>
 <DialogContent>
   <DialogContentText>
   Are you sure you want to do this?
   </DialogContentText>
 </DialogContent>
 <DialogActions>
   <Button onClick={closeConfirmBlockModal} color="primary">
   Cancel
   </Button>

   <Button onClick={()=>confirmBlockAction(actionUserId)} color="primary">
   Confirm
   </Button>
 </DialogActions>
</Dialog>


</>
)
 }


 export default ConfirmationModal;
