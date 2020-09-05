import React from 'react';

import { Pagination } from '@material-ui/lab';
import List from '@material-ui/core/List';

const Locations = ({
  currPage = 1,
  lastPage = 10,
  onPageClick,
  children
}) => {

  return (
    <div className="container">
      <h2 className="heading">List of Locations</h2>
      <List>
        {children}
      </List>
      <Pagination
        classes={{ ul: 'customPag' }}
        count={lastPage}
        page={currPage + 1}
        onChange={(e, val) => onPageClick(val - 1)}
      />
    </div>
  );
};

export default Locations;