import React from 'react';
import Grid from '@material-ui/core/Grid';

import DateContainer from '../DateContainer';
import TimeContainer from '../TimeContainer';

const DateTime = ({ date, onChange }) => (
  <Grid item xs={12} md={8} className="dateTime">
    <div className="container">
      <h2 className="heading">Date and Time</h2>
      <DateContainer date={date} onChange={onChange} />
      <TimeContainer date={date} onChange={onChange} />
    </div>
  </Grid>
);

export default DateTime;