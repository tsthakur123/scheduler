"use client"
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // Custom hook to access auth context
import axios from "axios";

const CreateInterviewPage = () => {
  const { user } = useAuth(); // Accessing logged-in user data from the AuthContext
  const router = useRouter();
  const [interviewData, setInterviewData] = useState({
    company: "",
    date: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterviewData({
      ...interviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You need to be logged in to create an interview.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/interviews", interviewData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status !== 201) {
        throw new Error("Failed to create interview.");
      }
      router.push("/dashboard"); // Redirect to dashboard after successful creation
    } catch{
      setError("Error creating interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Interview
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company"
          name="company"
          value={interviewData.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={interviewData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={interviewData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
          {loading ? "Creating..." : "Create Interview"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateInterviewPage;
