import { Box, Tab, Typography, Tabs, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import { axiosHeroku } from '../../ultils/api';
import PropTypes from 'prop-types';
import PayoutDetail from './PayoutDetail/PayoutDetail';


const AnalysisPayoutComp = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [payoutStatus, setPayoutStatus] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fecthPayoutStatus = async () => {
    await axiosHeroku.get('/analysis/finance/payout/status/get')
      .then(res => {
        console.log(res.data.data);
        setPayoutStatus(res.data.data);
      })
  }

  useEffect(() => {
    fecthPayoutStatus();
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ width: `100%` }}> Sao kê tài khoản lazada </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}

          >
            {payoutStatus.map((payoutStatus, index) => (
              <Tab label={`${payoutStatus.created_at.slice(0, payoutStatus.created_at.indexOf(" "))}: ${payoutStatus.payout}`}
                {...a11yProps(index)} />
            ))
            }
          </Tabs>
          {payoutStatus.map((payoutStatus, index) => (
            <TabPanel value={value} index={index}>
              <PayoutDetail payout={payoutStatus} />
            </TabPanel>
          ))}
        </div>
      </Grid>
    </Grid>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: theme.spacing(80)
  },
}));
export default AnalysisPayoutComp
