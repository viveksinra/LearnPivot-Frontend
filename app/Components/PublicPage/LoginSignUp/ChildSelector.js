import React, { useState, useEffect, useRef } from 'react';
import {
  TextField, MenuItem, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Box, Typography, IconButton,
  styled
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnimatedButton from '../../Common/AnimatedButton';
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
  transition: 'border 0.3s, transform 0.3s',
  position: 'relative',
  '&:hover': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  ...(selected && {
    animation: 'pulse-border 1s infinite',
    transform: 'scale(1.02)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: theme.shape.borderRadius,
      border: `2px solid ${theme.palette.primary.main}`,
      animation: 'pulse-border 1s infinite',
    },
  }),
}));

const CheckIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  padding: 2,
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
    setNewChild((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetAllChildren = async () => {
    try {
      const response = await childService.getAll();
      if (response.data) {
        setAllChildren(response.data);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      snackRef.current.handleSnack({ message: 'Failed to fetch children.', variant: 'error' });
    }
  };

  useEffect(() => {
    handleGetAllChildren();
  }, []);

  useEffect(() => {
    if (allChildren.length > 0) {
      setSelectedChild(allChildren[0]);
    }
  }, [allChildren]);

  const handleAddChild = async () => {
    if (!newChild.childName || !newChild.childGender) {
      snackRef.current.handleSnack({ message: 'Please fill all required fields.', variant: 'error' });
      return;
    }
    try {
      const response = await childService.add(newChild._id, newChild);
      snackRef.current.handleSnack(response);
      if (response.variant === 'success') {
        handleClose();
        handleGetAllChildren();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      snackRef.current.handleSnack({ message: 'Failed to submit data.', variant: 'error' });
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
          {selectedChild === child && (
            <CheckIconContainer>
              <CheckCircleIcon style={{ color: '#fff' }} />
            </CheckIconContainer>
          )}
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
            <TextField
              style={{ marginTop: 16 }}
              label="Date Of Birth"
              variant="outlined"
              name="childDob"
              type="date"
              fullWidth
              value={newChild.childDob}
              onChange={handleInputChange}
            />
            <TextField
              select
              margin="dense"
              name="childGender"
              label="Gender"
              fullWidth
              variant="outlined"
              value={newChild.childGender}
              onChange={handleInputChange}
              required
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
