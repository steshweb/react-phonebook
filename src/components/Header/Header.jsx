import { AppBar, Toolbar } from '@mui/material';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Navigation />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};
