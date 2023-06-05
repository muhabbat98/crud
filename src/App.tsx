import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Books from './pages/main/Books';
import Container from '@mui/material/Container/Container';
import { useAuth } from './util/auth';
import { useNavigate } from 'react-router-dom';
import UserBooks from './pages/main/UserBooks';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export default function App() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [user] = useAuth(false);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue - 0 === 1) {
      navigate('/signup');
    }
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Home' {...a11yProps(0)} />
            <Tab label={user?.sign ? 'SignOut' : 'SignUp'} {...a11yProps(1)} />
            <Tab label='My shelf' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Books />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserBooks/>
        </TabPanel>
      </Box>
    </Container>
  );
}
