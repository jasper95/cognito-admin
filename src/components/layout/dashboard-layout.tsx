
import React, { PropsWithChildren } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'aws-amplify'


function DashboardLayout(props: PropsWithChildren<{}>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authMenuOpen = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth='lg' className='flex justify-between flex-row p-2 items-center'>
          <Typography
            id="dashboard-title"
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            {process.env.NEXT_PUBLIC_PROJECT_NAME}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={authMenuOpen}
              onClose={() => {
                setAnchorEl(null)
              }}
            >
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Container>
      </AppBar>
      <main>
        <Container component='div' maxWidth="lg" className='p-4'>
          <div>
            {props.children}
          </div>
        </Container>
      </main>
    </div>
  )

  function onLogout() {
    Auth.signOut()
  }
}

export default DashboardLayout