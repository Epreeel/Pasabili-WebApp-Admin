import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem component="a" href="/dashboard">
      <ListItemIcon style={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Dashboard</Typography>} />
    </ListItem>

    <ListItem component="a" href="/employees">
      <ListItemIcon style={{ color: 'white' }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Employees</Typography>} />
    </ListItem>

    <ListItem component="a" href="/customers">
      <ListItemIcon style={{ color: 'white' }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Customers</Typography>} />
    </ListItem>

    <ListItem component="a" href="/reports">
      <ListItemIcon style={{ color: 'white' }}>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Reports</Typography>} />
    </ListItem>

    <ListItem component="a" href="/concerns">
      <ListItemIcon style={{ color: 'white' }}>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Concerns</Typography>} />
    </ListItem>
  </div>
)
