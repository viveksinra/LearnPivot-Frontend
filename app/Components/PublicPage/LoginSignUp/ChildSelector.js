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

const ChildSelector = ({ title, selectedChild, setSelectedChild, setStep }) => {
  const snackRef = useRef();
  const [allChildren, setAllChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [newChild, setNewChild] = useState({
    _id: '',
    childName: '',
    childDob: '',
    childGender: '',
    childYear: '',
  });

  // Utility function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newChild.childName.trim()) {
      newErrors.childName = 'Name is required';
    }
    
    if (!newChild.childDob) {
      newErrors.childDob = 'Date of Birth is required';
    }
    
    if (!newChild.childGender) {
      newErrors.childGender = 'Gender is required';
    }
    
    if (!newChild.childYear) {
      newErrors.childYear = 'Year Group is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChild = (child) => {
    setSelectedChild(child);
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleConfirmOpen = () => {
    if (validateForm()) {
      setConfirmOpen(true);
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewChild((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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

  const handleConfirmAddChild = async () => {
    setConfirmOpen(false);
    handleAddChild();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select the child, for this {title} purchase.
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
              error={!!errors.childName}
              helperText={errors.childName}
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
              focused
              required
              error={!!errors.childDob}
              helperText={errors.childDob}
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
              error={!!errors.childGender}
              helperText={errors.childGender}
            >
              <MenuItem value="Boy">Boy</MenuItem>
              <MenuItem value="Girl">Girl</MenuItem>
            </TextField>
            <TextField
              select
              margin="dense"
              name="childYear"
              label="Year Group"
              fullWidth
              variant="outlined"
              value={newChild.childYear}
              onChange={handleInputChange}
              required
              error={!!errors.childYear}
              helperText={errors.childYear}
            >
              <MenuItem value="Year 5">Year 5</MenuItem>
              <MenuItem value="Year 4">Year 4</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
                  variant="contained"
                  style={{ 
                    backgroundColor: '#FC7658', 
                    color: 'white',
                    '&:hover': { backgroundColor: '#E65B47' }
                  }}
          
          onClick={handleClose}>Cancel</Button>
          <Button
           variant="contained"
           style={{ 
             backgroundColor: '#4CAF50', 
             color: 'white',
             '&:hover': { backgroundColor: '#45A049' }
           }}
          onClick={handleConfirmOpen}>Add Child</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={confirmOpen} 
        onClose={handleConfirmClose}
        PaperProps={{
          style: { 
            backgroundColor: '#f0f0f0',
            borderRadius: 12 
          }
        }}
      >
        <DialogTitle>Confirm Child Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Please confirm the details of the new child.</DialogContentText>
          <Box sx={{ mt: 2, mb: 2, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
            <Typography variant="body1"><strong>Name:</strong> {newChild.childName}</Typography>
            <Typography variant="body1"><strong>Date of Birth:</strong> {formatDate(newChild.childDob)}</Typography>
            <Typography variant="body1"><strong>Gender:</strong> {newChild.childGender}</Typography>
            <Typography variant="body1"><strong>Year Group:</strong> {newChild.childYear}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleConfirmClose} 
            variant="contained"
            style={{ 
              backgroundColor: '#FC7658', 
              color: 'white',
              '&:hover': { backgroundColor: '#E65B47' }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAddChild} 
            variant="contained"
            style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white',
              '&:hover': { backgroundColor: '#45A049' }
            }}
          >
            Add Child
          </Button>
        </DialogActions>
      </Dialog>

      {(selectedChild && selectedChild._id) && (
        <AnimatedButton variant="contained" color="primary" style={{ marginTop: 16 }} onClick={() => setStep(3)}>
         Proceed for {selectedChild.childName && `(${selectedChild.childName})`}
        </AnimatedButton>
      )}
      <MySnackbar ref={snackRef} />
    </div>
  );
};

export default ChildSelector;