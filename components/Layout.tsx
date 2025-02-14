"use client"
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';


const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useAuth(); // Get token and logout function from AuthContext
  const router = useRouter()


  return (
    <>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Interview Scheduler
          </Typography>
          {token ? ( // Check if token exists
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => router.push('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
