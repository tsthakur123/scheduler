// pages/interviews/index.tsx
"use client";
import { useState, useEffect } from 'react';
import axios from '@/utils/axios';
import { Button, Container, Typography, Grid, Paper, TextField } from '@mui/material';
import InterviewCard from '@/components/InterviewCard';
import InterviewForm from './InterviewForm';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Interview {
  _id: string;
  candidateName: string;
  date: string;
  time: string;
  status: string; // Added status property
}

const InterviewPage = () => {
  const { user } = useAuth(); // Using AuthContext to get user info
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showInterviews, setShowInterviews] = useState(true);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Added search term state
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Fetch interviews
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interviews/get', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
        });
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    if (user) {
      fetchInterviews();
    }
  }, [user]);

  // Filter interviews based on search term and status
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? interview.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Create interview
  const handleCreateInterview = async (data: Omit<Interview, '_id'>) => {
    try {
      const response = await axios.post('http://localhost:5000/api/interviews/create', data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      setInterviews([...interviews, response.data]);
      setShowInterviews(true); // Switch to interview list view
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  // Update interview
  const handleUpdateInterview = async (data: Omit<Interview, '_id'>) => {
    if (!editingInterview) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/interviews/update/${editingInterview._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });

      setInterviews(interviews.map(interview => interview._id === response.data._id ? response.data : interview));
      setEditingInterview(null); // Reset editing mode
      setShowInterviews(true); // Switch to interview list view
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  // Delete interview
  const handleDeleteInterview = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/interviews/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });

      setInterviews(interviews.filter(interview => interview._id !== id)); // Remove deleted interview from list
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  // Start editing interview
  const handleEditInterview = (interview: Interview) => {
    setEditingInterview(interview);
    setShowInterviews(false); // Switch to the form view
  };

  // Toggle between form and interview list view
  const toggleShowInterviews = () => {
    setShowInterviews(prev => !prev);
    setEditingInterview(null); // Reset editing mode when toggling
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '20px' }}>
          Interviews
        </Typography>
        <TextField // Added search input
          label="Search by Candidate Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
          {showInterviews && (
            <>
              <Grid item>
                <Button 
                  variant="outlined" 
                  onClick={() => setFilterStatus('Upcoming')}
                  style={{ marginRight: '10px', backgroundColor: filterStatus === 'Upcoming' ? '#cfe8fc' : 'transparent' }} // Active button color
                >
                  Upcoming
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setFilterStatus('Completed')}
                  style={{ marginRight: '10px', backgroundColor: filterStatus === 'Completed' ? '#cfe8fc' : 'transparent' }} // Active button color
                >
                  Completed
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setFilterStatus(null)} // Clear filter
                  style={{ backgroundColor: filterStatus === null ? '#cfe8fc' : 'transparent' }} // Active button color
                >
                  All
                </Button>
              </Grid>
            </>
          )}
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={toggleShowInterviews} // Toggle between form and interview list view
            >
              {showInterviews ? 'Create Interview' : 'Back to Interviews'}
            </Button>
          </Grid>
        </Grid>

        {showInterviews ? (
          <Grid container spacing={2}>
            {filteredInterviews.length > 0 ? ( // Use filtered interviews
              filteredInterviews.map(interview => (
                <Grid item xs={12} sm={6} md={4} key={interview._id}>
                  <Paper elevation={3} style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InterviewCard interview={interview} />
                    <Grid container spacing={1} style={{ marginTop: '10px' }}>
                      <Grid item>
                        <Button 
                          variant="outlined" 
                          onClick={() => handleEditInterview(interview)} 
                          style={{ marginRight: '10px' }}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          onClick={() => handleDeleteInterview(interview._id)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography>No interviews scheduled.</Typography>
            )}
          </Grid>
        ) : (
          <InterviewForm 
            interview={editingInterview || undefined} 
            onSubmit={editingInterview ? handleUpdateInterview : handleCreateInterview} 
          />
        )}
      </Container>
    </ProtectedRoute>
  );
};

export default InterviewPage;
