import React from 'react';
import { BellIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Text className="brand-text">Loomtask</Text>
      </div>
      <div className="navbar-center">
        <Button variant="soft" className="nav-button">New Task</Button>
        <Button variant="soft" className="nav-button">Your Tasks</Button>
      </div>
      <div className="navbar-right">
        <Button variant="soft" className="nav-button">
          <BellIcon width="20" height="20" />
        </Button>
        <Button variant="soft" className="nav-button user-button">
          <PersonIcon width="20" height="20" />
          <Text className="user-text">User</Text>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;