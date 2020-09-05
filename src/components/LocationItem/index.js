
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';


const LocationItem = ({ isActive, onClick, name }) => {
  return (
    <ListItem
      onClick={onClick}
      selected={isActive}
      divider
      className={classNames('listItem', !isActive && 'hover')}
    >
    {name}
    </ListItem>
  );
};

export default LocationItem;