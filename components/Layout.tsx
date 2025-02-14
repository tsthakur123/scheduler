"use client"
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout by clearing token
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Interview Scheduler
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
