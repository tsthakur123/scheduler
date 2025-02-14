// components/LogoutButton.tsx
import { Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={logout} variant="contained" color="secondary">Logout</Button>;
};

export default LogoutButton;
