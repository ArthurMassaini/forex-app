import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

import * as STORAGE from '../services/localStorage';

function NavBar({ item }) {
  const [activeItem, setActiveItem] = useState(item);
  const history = useHistory();

  const handleItemClick = (_event, { name }) => {
    switch (name) {
      case 'DashBoard':
        setActiveItem(name);
        return history.push('/');
      case 'PastTrades':
        setActiveItem(name);
        return history.push('/log');
      case 'Logout':
        setActiveItem(name);
        STORAGE.clearUser();
        return history.push('/login');
      default:
        return null;
    }
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="DashBoard"
        active={activeItem === 'DashBoard'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="PastTrades"
        active={activeItem === 'PastTrades'}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="Logout"
          active={activeItem === 'Logout'}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
}

NavBar.propTypes = {
  item: PropTypes.string.isRequired,
};

export default NavBar;
