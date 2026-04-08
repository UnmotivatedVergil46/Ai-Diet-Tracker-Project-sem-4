import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormGroup,
  Divider,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';

interface SettingsProps {
  open: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Settings: React.FC<SettingsProps> = ({ open, onClose, isDarkMode, onThemeToggle }) => {
  const { user, updateUserData } = useUser();
  const { showNotification } = useNotification();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    soundAlerts: true,
    privacyMode: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save settings to local storage or backend
      localStorage.setItem('appSettings', JSON.stringify(settings));
      showNotification('Settings saved successfully! 🎉', 'success');
      onClose();
    } catch (error) {
      showNotification('Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Settings
        <Button onClick={onClose} size="small">
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {/* Theme Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Appearance
            </Typography>
            <FormControlLabel
              control={<Switch checked={isDarkMode} onChange={onThemeToggle} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Box>
              }
            />
          </CardContent>
        </Card>

        <Divider sx={{ my: 2 }} />

        {/* Notifications Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Notifications
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                }
                label="Enable In-App Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.soundAlerts}
                    onChange={(e) => handleSettingChange('soundAlerts', e.target.checked)}
                  />
                }
                label="Sound Alerts"
              />
            </FormGroup>
          </CardContent>
        </Card>

        <Divider sx={{ my: 2 }} />

        {/* Privacy Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Privacy
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.privacyMode}
                  onChange={(e) => handleSettingChange('privacyMode', e.target.checked)}
                />
              }
              label="Privacy Mode (Hide sensitive data)"
            />
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
              When enabled, personal health data will be hidden from screenshots
            </Typography>
          </CardContent>
        </Card>

        <Divider sx={{ my: 2 }} />

        {/* Account Info Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Account Information
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: <strong>{user?.email}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Account Type: <strong>Premium</strong>
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              To edit your personal health data (age, weight, height, etc.), visit your Profile page.
            </Alert>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
