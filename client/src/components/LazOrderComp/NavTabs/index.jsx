import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import SearchLazOrder from '../SearchLazOrder';
import TableLazOrder from '../TableLazOrder';
import { useDispatch, useSelector } from 'react-redux'
import { searchLazOrder } from '../../../actions/searchLazOrder';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function NavTabs(props) {
  const search = props.search;
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const searchLazOrder = useSelector(state => state.searchLazOrder)
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab key={1} label="Tất cả" href="/all" {...a11yProps(0)} />
          <LinkTab key={2} label="Đang xử lý" href="/pending" {...a11yProps(1)} />
          <LinkTab key={3} label="Sẵn sàng giao" href="/ready-to-ship" {...a11yProps(2)} />
          <LinkTab key={4} label="Đang giao hàng" href="/shipped" {...a11yProps(3)} />
          <LinkTab key={5} label="Đã giao" href="/delivered" {...a11yProps(4)} />
          <LinkTab key={6} label="Đã hủy" href="/canceled" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} key={1} index={0}>
        <SearchLazOrder />
        <TableLazOrder status="" />
      </TabPanel>
      <TabPanel value={value} key={2} index={1}>
        <SearchLazOrder />
        <TableLazOrder status="pending" />
      </TabPanel>
      <TabPanel value={value} key={3} index={2}>
        <SearchLazOrder />
        <TableLazOrder status="ready_to_ship" />
      </TabPanel>
      <TabPanel value={value} key={4} index={3}>
      <SearchLazOrder />
        <TableLazOrder status="shipped" />
      </TabPanel>
      <TabPanel value={value} key={5} index={4}>
      <SearchLazOrder />
        <TableLazOrder status="delivered" />
      </TabPanel>
      <TabPanel value={value} key={6} index={5}>
      <SearchLazOrder />
        <TableLazOrder status="canceled" />
      </TabPanel>
    </div>
  );
}

export default NavTabs;