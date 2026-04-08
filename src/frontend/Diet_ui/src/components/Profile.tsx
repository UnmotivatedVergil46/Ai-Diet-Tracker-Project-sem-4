import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import { useUser } from '../contexts/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user || !user.userData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No user data available</Typography>
      </Box>
    );
  }

  const userData = user.userData;

  const formatValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'None';
    }
    return value || 'Not specified';
  };

  const capitalizeLabel = (str: string | undefined | null) => {
    if (!str) return 'Not specified';
    return str.toString().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
      {/* Header Section */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Your Profile
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {user.email}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate('/form')}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5)' } }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>

      {/* Personal Information Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography color="textSecondary" variant="caption">
                  Age
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.age ?? 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography color="textSecondary" variant="caption">
                  Gender
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {capitalizeLabel(userData.gender)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography color="textSecondary" variant="caption">
                  Weight
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.weight ?? 'N/A'} kg
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography color="textSecondary" variant="caption">
                  Height
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.height ?? 'N/A'} cm
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Activity & Lifestyle Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Activity & Lifestyle
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography color="textSecondary" variant="caption">
                  Activity Level
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                  {capitalizeLabel(userData.activity_level)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography color="textSecondary" variant="caption">
                  Preferred Cuisine
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                  {capitalizeLabel(userData.preferred_cuisine)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography color="textSecondary" variant="caption">
                  Current Mood
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                  {capitalizeLabel(userData.current_mood)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dietary Restrictions Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Dietary Restrictions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {userData.dietary_restrictions && userData.dietary_restrictions.length > 0 ? (
              userData.dietary_restrictions.map((restriction, index) => (
                <Chip
                  key={index}
                  label={capitalizeLabel(restriction)}
                  color="primary"
                  variant="outlined"
                />
              ))
            ) : (
              <Typography color="textSecondary">None specified</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Health Conditions Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Health Conditions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {userData.health_conditions && userData.health_conditions.length > 0 ? (
              userData.health_conditions.map((condition, index) => (
                <Chip
                  key={index}
                  label={capitalizeLabel(condition)}
                  color="secondary"
                  variant="outlined"
                />
              ))
            ) : (
              <Typography color="textSecondary">None specified</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Goals Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Daily Goals
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography color="textSecondary" variant="caption">
                  Calories
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.calorieGoal ?? 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  kcal/day
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography color="textSecondary" variant="caption">
                  Protein
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.proteinGoal ?? 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  g/day
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography color="textSecondary" variant="caption">
                  Carbs
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.carbsGoal ?? 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  g/day
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography color="textSecondary" variant="caption">
                  Fat
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {userData.fatGoal ?? 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  g/day
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
