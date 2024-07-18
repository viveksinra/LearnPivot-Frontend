import React, { useState } from 'react';
import { TextField, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';
import AnimatedButton from '../../Common/AnimatedButton';

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

const ChildSelector = ({ selectedChild, setSelectedChild }) => {
  const [allChildren, setAllChildren] = useState([{
    _id: 'sdfgsgfsfgsfdgsdf',
    childName: 'Vivek',
    childAge: '10',
    childGender: 'Boy',
    childImage: null,
  }]);

  const [open, setOpen] = useState(false);
  const [newChild, setNewChild] = useState({
    childName: '',
    childAge: '',
    childGender: '',
    childImage: null,
  });

  const handleSelectChild = (child) => {
    setSelectedChild(child.childName);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewChild({ ...newChild, [name]: value });
  };

  const handleAddChild = () => {
    setAllChildren([...allChildren, { ...newChild, _id: allChildren.length + 1 }]);
    setOpen(false);
    setSelectedChild(newChild.childName);
    setNewChild({ childName: '', childAge: '', childGender: '', childImage: null });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select the child, for whom you are purchasing this course.
      </Typography>

      {allChildren.map((child) => (
        <ChildContainer
          key={child._id}
          selected={selectedChild === child.childName}
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
            <TextField
              margin="dense"
              name="childAge"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              value={newChild.childAge}
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
        <AnimatedButton variant="contained" color="primary" style={{ marginTop: 16 }}>
          Next
        </AnimatedButton>
      )}
    </div>
  );
};

export default ChildSelector;
