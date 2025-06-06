import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  WaterDrop as WaterDropIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { rainAPI } from '../../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [rainData, setRainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newReading, setNewReading] = useState({
    level: '',
    valve_status: 'closed'
  });

  console.log("user in dash",user)
  useEffect(() => {
    if (!user) {
      // navigate('/login');
      return;
    }
    fetchRainData();
  }, [user, navigate]);

  const fetchRainData = async () => {
    try {
      setLoading(true);
      const response = await rainAPI.getHistory();
      setRainData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch rain data. Please try again.');
      console.error('Error fetching rain data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddReading = async () => {
    try {
      await rainAPI.addReading(
        parseInt(newReading.level),
        newReading.valve_status
      );
      setOpenDialog(false);
      setNewReading({ level: '', valve_status: 'closed' });
      fetchRainData(); // Refresh data
    } catch (err) {
      setError('Failed to add new reading. Please try again.');
      console.error('Error adding reading:', err);
    }
  };

  const latestData = rainData[0] || {};
  const averageLevel =
    rainData.reduce((acc, curr) => acc + curr.level, 0) / rainData.length || 0;

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <WaterDropIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rainfall Monitoring System
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            sx={{ ml: 2 }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography  sx={{fontSize: '1.2rem', fontWeight: 'bold'}} variant="body2">{user?.name}</Typography>
              <Typography variant="body2">{user?.email}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Current Status Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(45deg, #006064 30%, #0277bd 90%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WaterDropIcon sx={{ mr: 1 }} />
                  <Typography variant="h4">
                    {latestData.level || 0}%
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Valve Status: {latestData.valve_status || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  Last Updated: {latestData.timestamp ? new Date(latestData.timestamp).toLocaleString() : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Average Level Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Average Level
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WaterDropIcon
                    sx={{ fontSize: 40, color: 'primary.main', mr: 1 }}
                  />
                  <Typography variant="h4" color="primary">
                    {averageLevel.toFixed(1)}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions Card */}
          <Grid  xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                {/* <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 1 }}
                  color="primary"
                  onClick={() => setOpenDialog(true)}
                >
                  Add New Reading
                </Button> */}
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  onClick={fetchRainData}
                >
                 Manually Refresh Data
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart */}
          <Grid  xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Rainfall Level History
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rainData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleTimeString()
                      }
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      labelFormatter={(value) =>
                        new Date(value).toLocaleString()
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="level"
                      stroke="#006064"
                      activeDot={{ r: 8 }}
                      name="Rain Level (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Add New Reading Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Reading</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Rain Level (%)"
            type="number"
            fullWidth
            value={newReading.level}
            onChange={(e) => setNewReading({ ...newReading, level: e.target.value })}
            inputProps={{ min: 0, max: 100 }}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Valve Status</InputLabel>
            <Select
              value={newReading.valve_status}
              label="Valve Status"
              onChange={(e) => setNewReading({ ...newReading, valve_status: e.target.value })}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddReading}
            disabled={!newReading.level || newReading.level < 0 || newReading.level > 100}
          >
            Add Reading
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 