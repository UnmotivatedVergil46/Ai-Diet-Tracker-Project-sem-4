import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Slider,
  Chip,
  Stack,
  Grid,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  EmojiEvents,
  Restaurant,
  FitnessCenter,
  Favorite,
  Info as InfoIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface FormState {
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  dietaryRestrictions: string[];
  healthConditions: string[];
  foodType: string;
  mood: string;
  goal: string;
}

interface UserFormData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  activity_level: string;
  dietary_restrictions: string[];
  health_conditions: string[];
  preferred_cuisine: string;
  food_type: string;
  current_mood: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
}

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Non-Vegetarian',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Keto',
  'Paleo',
];

const healthOptions = [
  'Diabetes',
  'High Cholesterol',
  'Hypertension',
  'Kidney Disease',
  'Thyroid (Hypothyroidism)',
  'Anemia',
  'Gout',
  'Osteoporosis',
  'PCOS',
  'GERD/Acid Reflux',
  'IBS',
  'None',
];

const foodTypeOptions = [
  { value: 'general', label: 'General/Mixed' },
  { value: 'indian', label: 'Indian' },
  { value: 'american', label: 'American' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'asian', label: 'Asian' },
  { value: 'anything goes', label: 'Anything Goes' },
];

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { value: 'light', label: 'Lightly Active', description: '1-3 days/week' },
  { value: 'moderate', label: 'Moderately Active', description: '3-5 days/week' },
  { value: 'active', label: 'Very Active', description: '6-7 days/week' },
  { value: 'very_active', label: 'Extra Active', description: 'Very intense exercise daily' },
];

const goals = [
  { value: 'lose', label: 'Weight Loss', icon: <FitnessCenter /> },
  { value: 'maintain', label: 'Maintain Weight', icon: <Restaurant /> },
  { value: 'gain', label: 'Gain Muscle', icon: <EmojiEvents /> },
  { value: 'health', label: 'Improve Health', icon: <Favorite /> },
];

export default function UserForm({ onSubmit }: UserFormProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormState>({
    age: 5,
    gender: '',
    weight: 0,
    height: 0,
    activityLevel: '',
    dietaryRestrictions: [],
    healthConditions: [],
    foodType: 'general',
    mood: 'neutral',
    goal: '',
  });

  const steps = ['Basic Info', 'Activity', 'Preferences', 'Goals'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.gender) {
      alert('Please select your gender');
      return;
    }
    
    if (!formData.activityLevel) {
      alert('Please select your activity level');
      return;
    }
    
    if (formData.weight <= 0 || formData.height <= 0) {
      alert('Please enter valid weight and height values');
      return;
    }
    
    const submissionData: UserFormData = {
      age: formData.age,
      gender: formData.gender,
      weight: formData.weight,
      height: formData.height,
      activity_level: formData.activityLevel,
      dietary_restrictions: formData.dietaryRestrictions,
      health_conditions: formData.healthConditions,
      preferred_cuisine: formData.foodType,
      food_type: formData.foodType,
      current_mood: formData.mood,
    };
    onSubmit(submissionData);
  };

  const handleDietaryToggle = (diet: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(diet)
        ? prev.dietaryRestrictions.filter((d) => d !== diet)
        : [...prev.dietaryRestrictions, diet],
    }));
  };

  const handleHealthToggle = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter((c) => c !== condition)
        : [...prev.healthConditions, condition],
    }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Personal Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Basic details to personalize your diet plan
                </Typography>
              </Box>

              <FormControl size="small" fullWidth>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  sx={{ gap: 0.5 }}
                >
                  <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                  <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                </RadioGroup>
              </FormControl>

              <Box sx={{ maxWidth: '50%', mx: 'auto', pl: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ fontSize: '0.875rem' }}>Age: {formData.age} years</Typography>
                <Slider
                  value={formData.age}
                  onChange={(_, value) => setFormData({ ...formData, age: value as number })}
                  min={5}
                  max={100}
                  marks={[
                    { value: 5, label: '5' },
                    { value: 100, label: '100' },
                  ]}
                  valueLabelDisplay="auto"

                  size="small"
                />
              </Box>

              <Grid container sx={{ maxWidth: '70%', mx: 'auto', spacing: 0.5 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" gutterBottom sx={{ fontSize: '0.875rem' }}>Weight (kg)</Typography>
                  <TextField
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Math.max(0, Number(e.target.value)) })}
                    fullWidth
                    size="small"
                    inputProps={{ min: 0, step: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" gutterBottom sx={{ fontSize: '0.875rem' }}>Height (cm)</Typography>
                  <TextField
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Math.max(0, Number(e.target.value)) })}
                    fullWidth
                    size="small"
                    inputProps={{ min: 0, step: 1 }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Activity Level
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Helps calculate your daily calorie needs
                </Typography>
              </Box>

              <Stack spacing={1}>
                {activityLevels.map((level) => (
                  <Paper
                    key={level.value}
                    onClick={() => setFormData({ ...formData, activityLevel: level.value })}
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      border: 2,
                      borderColor: formData.activityLevel === level.value ? 'primary.main' : 'transparent',
                      bgcolor: formData.activityLevel === level.value 
                        ? alpha(theme.palette.primary.main, 0.1)
                        : 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: formData.activityLevel === level.value 
                            ? 'primary.main'
                            : alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        <FitnessCenter
                          sx={{
                            color: formData.activityLevel === level.value 
                              ? 'white'
                              : 'primary.main',
                            fontSize: '1.25rem'
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {level.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {level.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Dietary Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Your dietary needs and preferences
                </Typography>
              </Box>

              {/* Prominent Cuisine Selector */}
              <Box sx={{ p: 2.5, bgcolor: 'primary.main', borderRadius: 2, color: 'white', boxShadow: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  🍽️ Preferred Cuisine Type
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9, mb: 1.5, display: 'block' }}>
                  Select your preferred cuisine for meal recommendations
                </Typography>
                <Grid container spacing={1}>
                  {foodTypeOptions.map((option) => (
                    <Grid item xs={6} sm={4} key={option.value}>
                      <Paper
                        onClick={() => setFormData({ ...formData, foodType: option.value })}
                        sx={{
                          p: 1.5,
                          cursor: 'pointer',
                          textAlign: 'center',
                          bgcolor: formData.foodType === option.value ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                          color: 'white',
                          border: formData.foodType === option.value ? '2px solid white' : '1px solid rgba(255,255,255,0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Typography variant="body2" fontWeight={500}>
                          {option.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={500} gutterBottom>
                  Dietary Restrictions
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {dietaryOptions.map((diet) => (
                    <Chip
                      key={diet}
                      label={diet}
                      onClick={() => handleDietaryToggle(diet)}
                      color={formData.dietaryRestrictions.includes(diet) ? 'primary' : 'default'}
                      size="small"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={500} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Health Conditions
                  <Tooltip title="Select if you have any conditions that affect your diet">
                    <InfoIcon fontSize="small" sx={{ opacity: 0.6 }} />
                  </Tooltip>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {healthOptions.map((condition) => (
                    <Chip
                      key={condition}
                      label={condition}
                      onClick={() => handleHealthToggle(condition)}
                      color={formData.healthConditions.includes(condition) ? 'primary' : 'default'}
                      size="small"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                  Primary Goal
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  What would you like to achieve?
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
                {goals.map((goal) => (
                  <Paper
                    key={goal.value}
                    onClick={() => setFormData({ ...formData, goal: goal.value })}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      border: 2,
                      borderColor: formData.goal === goal.value ? 'primary.main' : 'transparent',
                      bgcolor: formData.goal === goal.value 
                        ? alpha(theme.palette.primary.main, 0.1)
                        : 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        transform: 'translateY(-2px)',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: formData.goal === goal.value 
                          ? 'primary.main'
                          : alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      {React.cloneElement(goal.icon, {
                        sx: {
                          fontSize: 32,
                          color: formData.goal === goal.value ? 'white' : 'primary.main',
                        },
                      })}
                    </Box>
                    <Typography variant="h6" align="center">
                      {goal.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Stack>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flex: 0,
          borderRadius: 0,
        }}
      >
        <Stepper
          activeStep={activeStep}
          sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'primary.main',
            },
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
              color: 'primary.main',
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'primary.main',
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 1, mb: 2, overflow: 'auto' }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 0, pb: 2 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBackIcon />}
            sx={{ 
              visibility: activeStep === 0 ? 'hidden' : 'visible',
              '&.MuiButton-root': { gap: 1 },
            }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                minWidth: 200,
                '&.MuiButton-root': { gap: 1 },
              }}
            >
              Create My Plan
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                minWidth: 200,
                '&.MuiButton-root': { gap: 1 },
              }}
            >
              Continue
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
} 