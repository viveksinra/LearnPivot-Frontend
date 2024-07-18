import React, { useState, useEffect, useRef } from 'react';
import {
  TextField, MenuItem, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Box, Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';
import AnimatedButton from '../../Common/AnimatedButton';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { childService } from '@/app/services';
import MySnackbar from '../../MySnackbar/MySnackbar';

const ChildContainer = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.grey[300]}`,
  cursor: 'pointer',
  transition: 'border 0.3s',
  '&:hover': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const ChildSelector = ({ selectedChild, setSelectedChild, setStep }) => {
    
    const snackRef = useRef();
  const [allChildren, setAllChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const [newChild, setNewChild] = useState({
    _id: '',
    childName: '',
    childDob: '',
    childGender: '',
    childImage: null,
  });

  const handleSelectChild = (child) => {
    setSelectedChild(child);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewChild(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewChild(prev => ({ ...prev, childDob: date }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setNewChild(prev => ({ ...prev, childImage: URL.createObjectURL(file) }));
  };

  const handleGetAllChildren = async () => {
    try {
      const response = await childService.getAll();
      console.log(response);
      setAllChildren(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetAllChildren();
  }, []);

  const handleAddChild = async () => {
    try {
      const myChildData = {
        _id: newChild._id, 
        childName: newChild.childName,
        childDob: newChild.childDob,
        childGender: newChild.childGender,
        childImage: newChild.childImage,
      };
      const response = await childService.add(newChild._id,myChildData);
      if (response.variant === "success") {
        snackRef.current.handleSnack(response);
        handleClose();
        handleGetAllChildren();
      } else {
        snackRef.current.handleSnack(response);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      snackRef.current.handleSnack({ fullDescription: "Failed to submit data.", variant: "error" });
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select the child, for whom you are purchasing this course.
      </Typography>

      {allChildren.map((child) => (
        <ChildContainer
          key={child._id}
          selected={selectedChild === child}
          onClick={() => handleSelectChild(child)}
        >
          {child.childImage && (
            <img
              src={child.childImage}
              alt={child.childName}
              style={{ width: 40, height: 40, marginRight: 16, borderRadius: '50%' }}
            />
          )}
          <Typography variant="body1">{child.childName}</Typography>
        </ChildContainer>
      ))}

      <ChildContainer onClick={handleOpenDialog}>
        <AddIcon />
        <Typography variant="body1" style={{ marginLeft: 16 }}>
          Add A New Child
        </Typography>
      </ChildContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Child</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill in the details of the new child.</DialogContentText>
          <Box component="form" sx={{ mt: 2 }}>
            <Button variant="contained" component="label">
              Upload Child Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {newChild.childImage && (
              <img
                src={newChild.childImage}
                alt="Child"
                style={{ width: 80, height: 80, marginTop: 16, borderRadius: '50%' }}
              />
            )}
            <TextField
              autoFocus
              margin="dense"
              name="childName"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newChild.childName}
              onChange={handleInputChange}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={newChild.childDob}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth margin="dense" variant="outlined" />}
              />
            </LocalizationProvider>
            <TextField
              select
              margin="dense"
              name="childGender"
              label="Gender"
              fullWidth
              variant="outlined"
              value={newChild.childGender}
              onChange={handleInputChange}
            >
              <MenuItem value="Boy">Boy</MenuItem>
              <MenuItem value="Girl">Girl</MenuItem>
              <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddChild}>Add Child</Button>
        </DialogActions>
      </Dialog>

      {selectedChild && (
        <AnimatedButton variant="contained" color="primary" style={{ marginTop: 16 }} onClick={() => setStep(3)}>
          Next
        </AnimatedButton>
      )}
      <MySnackbar ref={snackRef} />

    </div>
  );
};

export default ChildSelector;
