"use client"
import { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://scheduler-backend-z614.onrender.com/api/auth/register', formData); // Register the user using the API call
      router.push("/login"); // Redirect to login after successful registration
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to register. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          type="email"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          type="password"
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?{" "}
          <Button
            color="primary"
            onClick={() => router.push("/login")}
            sx={{ padding: 0 }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
