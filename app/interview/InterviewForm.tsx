// components/InterviewForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Paper } from '@mui/material';

interface Interview {
  candidateName: string;
  date: string;
  time: string;
  status: string;
}

const InterviewForm = ({ interview, onSubmit }: { interview?: Interview; onSubmit: (data: Interview) => void }) => {
  const [candidateName, setCandidateName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (interview) {
      setCandidateName(interview.candidateName);
      const formattedDate = new Date(interview.date).toISOString().split('T')[0];
      setDate(formattedDate);
      setTime(interview.time);
    }
  }, [interview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ candidateName, date, time, status: 'Upcoming' });
  };

  const handleMarkAsCompleted = () => {
    onSubmit({ candidateName, date, time, status: 'Completed' });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        {interview ? 'Edit Interview' : 'Schedule a New Interview'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Candidate Name"
              variant="outlined"
              fullWidth
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Time"
              type="time"
              variant="outlined"
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
              {interview ? 'Update Interview' : 'Create Interview'}
            </Button>
            {interview && (
              <Button variant="contained" color="secondary" onClick={handleMarkAsCompleted}>
                Mark as Completed
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default InterviewForm;
