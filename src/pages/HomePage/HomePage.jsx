import { Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <Typography
        sx={{ textAlign: 'center', marginTop: '20px', fontWeight: '500' }}
        component="h2"
        variant="h2"
      >
        This is Home Page
      </Typography>
    </div>
  );
};

export default HomePage;
