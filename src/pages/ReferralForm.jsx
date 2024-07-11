import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const ReferralForm = ({ open, onClose }) => {
  const classes = useStyles();
  const [referrerName, setReferrerName] = useState('');
  const [referrerEmail, setReferrerEmail] = useState('');
  const [refereeName, setRefereeName] = useState('');
  const [refereeEmail, setRefereeEmail] = useState('');
  const [refereeProgram, setRefereeProgram] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!referrerName) newErrors.referrerName = 'Referrer name is required';
  if (!referrerEmail) newErrors.referrerEmail = 'Referrer email is required';
  if (!refereeName) newErrors.refereeName = 'Referee name is required';
  if (!refereeEmail) newErrors.refereeEmail = 'Referee email is required';
  if (!refereeProgram) newErrors.refereeProgram = 'Referee program is required';

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const data = {
      name: referrerName,
      email: referrerEmail,
      referredName:refereeName,
      referred: refereeEmail,
      message:refereeProgram

    };

    try {
      const response = await fetch('http://localhost:5000/referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle server-side validation errors
        const errorData = await response.json();
        console.log('Server validation errors:', errorData);
        // You can update state or display errors as needed
        return;
      }

      // Handle success
      console.log('Referral submitted successfully');
      onClose();
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting referral:', error);
    }
  }
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Referral Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Referrer Name"
            fullWidth
            value={referrerName}
            onChange={(e) => setReferrerName(e.target.value)}
            className={classes.formField}
            error={!!errors.referrerName}
            helperText={errors.referrerName}
          />
          <TextField
            label="Referrer Email"
            fullWidth
            value={referrerEmail}
            onChange={(e) => setReferrerEmail(e.target.value)}
            className={classes.formField}
            error={!!errors.referrerEmail}
            helperText={errors.referrerEmail}
          />
          <TextField
            label="Referee Name"
            fullWidth
            value={refereeName}
            onChange={(e) => setRefereeName(e.target.value)}
            className={classes.formField}
            error={!!errors.refereeName}
            helperText={errors.refereeName}
          />
          <TextField
            label="Referee Email"
            fullWidth
            value={refereeEmail}
            onChange={(e) => setRefereeEmail(e.target.value)}
            className={classes.formField}
            error={!!errors.refereeEmail}
            helperText={errors.refereeEmail}
          />
          <FormControl fullWidth className={classes.formField} error={!!errors.refereeProgram}>
            <InputLabel>Referee Program</InputLabel>
            <Select
              value={refereeProgram}
              onChange={(e) => setRefereeProgram(e.target.value)}
            >
              <MenuItem value="program1">Program 1</MenuItem>
              <MenuItem value="program2">Program 2</MenuItem>
              <MenuItem value="program3">Program 3</MenuItem>
            </Select>
            {errors.refereeProgram && <p style={{ color: 'red' }}>{errors.refereeProgram}</p>}
          </FormControl>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralForm;
