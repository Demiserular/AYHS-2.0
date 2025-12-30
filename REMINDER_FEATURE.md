# Context-Aware Reminder Feature

## Overview
The AYHS health application now includes a comprehensive context-aware reminder system that helps users stay on track with their health routines, including medication schedules, meal times, doctor appointments, and custom health-related reminders.

## Features

### 🔔 Smart Reminders
- **Medicine Reminders**: Set reminders for taking medications with dosage information
- **Meal Reminders**: Schedule meal times to maintain healthy eating habits
- **Appointment Reminders**: Never miss a doctor's appointment
- **Custom Reminders**: Create any health-related reminder

### ⏰ Flexible Scheduling
- **One-time Reminders**: For specific events
- **Recurring Reminders**: 
  - Hourly
  - Daily
  - Weekly
  - Monthly

### 🎯 Context-Aware Features
- Reminders automatically categorize based on type
- Store additional context (medicine name, dosage, doctor name, location)
- Color-coded cards for easy identification
- Visual indicators for overdue and upcoming reminders

### 📱 Real-Time Notifications
- Browser notifications when reminders are due
- In-app notification system
- Automatic checking every 30 seconds for due reminders
- Permission request for browser notifications

### ✅ Reminder Management
- **Mark as Complete**: Complete a reminder when done
- **Snooze**: Postpone reminder by 15 minutes
- **Delete**: Remove reminders you no longer need
- **Filter View**: View all, active, or completed reminders

### 🔄 Auto-Recurring
- Completed recurring reminders automatically create the next occurrence
- Maintains your schedule without manual re-entry

## Technical Architecture

### Frontend Components

#### `RemindersPage.jsx`
Main page component with full CRUD functionality:
- Create new reminders with modal form
- View reminders in organized sections (Overdue, Upcoming, Completed)
- Filter reminders by status
- Manage reminder actions (complete, snooze, delete)

#### `ReminderNotification.jsx`
Real-time notification component:
- Monitors due reminders
- Shows toast-style notifications
- Dismissible notifications
- Auto-checks every 30 seconds

### Backend API

#### Endpoints
- `POST /api/reminders` - Create new reminder
- `GET /api/reminders` - Get all user reminders (with filters)
- `GET /api/reminders/upcoming` - Get upcoming reminders within specified hours
- `GET /api/reminders/:id` - Get specific reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `PATCH /api/reminders/:id/complete` - Mark as complete
- `PATCH /api/reminders/:id/snooze` - Snooze reminder

#### Database Schema
```javascript
{
  userId: ObjectId (ref: User),
  type: String (medicine|meal|appointment|custom),
  title: String,
  description: String,
  reminderTime: Date,
  frequency: String (once|hourly|daily|weekly|monthly),
  status: String (active|completed|snoozed),
  context: {
    medicineName: String,
    dosage: String,
    mealType: String,
    doctorName: String,
    location: String
  },
  notes: String,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Services

#### `reminderService.js`
Comprehensive service layer providing:
- API communication functions
- Helper functions for context-aware reminders
- Notification management
- Time formatting utilities
- Due reminder checking

## Usage Examples

### Creating a Medicine Reminder
```javascript
import { createMedicineReminder } from './services/reminderService';

await createMedicineReminder(
  'Vitamin D',
  '1 tablet',
  '2024-01-15T09:00:00',
  'daily',
  'Take with breakfast'
);
```

### Creating a Meal Reminder
```javascript
import { createMealReminder } from './services/reminderService';

await createMealReminder(
  'Lunch',
  '2024-01-15T13:00:00',
  'Include vegetables and protein'
);
```

### Creating an Appointment Reminder
```javascript
import { createAppointmentReminder } from './services/reminderService';

await createAppointmentReminder(
  'Smith',
  '2024-01-20T15:30:00',
  'City Hospital, Room 301',
  'Annual checkup'
);
```

## User Interface

### Reminder Card
Each reminder is displayed in a card with:
- Icon and type badge
- Title and description
- Time display (relative or absolute)
- Frequency indicator
- Action buttons (Complete, Snooze, Delete)
- Color coding by type

### Color Scheme
- 🔴 **Medicine**: Red accent
- 🟠 **Meal**: Orange accent
- 🔵 **Appointment**: Blue accent
- 🟣 **Custom**: Purple accent

### Filters
- **All**: Shows all reminders
- **Active**: Shows only active reminders
- **Completed**: Shows completed reminders

## Browser Compatibility

The reminder feature uses modern browser APIs:
- Web Notifications API (for push notifications)
- localStorage (for token management)
- Fetch API (for network requests)

Supports all modern browsers:
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

## Security

- All reminder endpoints are protected with JWT authentication
- Users can only access their own reminders
- Input validation on both frontend and backend
- SQL injection protection through Mongoose

## Future Enhancements

Potential improvements for future versions:
1. **Voice Reminders**: Set reminders using voice commands
2. **Smart Suggestions**: AI-powered reminder suggestions based on health data
3. **Integration**: Link reminders with medicine search and meal plans
4. **Family Sharing**: Share reminders with family members or caregivers
5. **Geolocation**: Location-based reminders for pharmacies or clinics
6. **Analytics**: Track reminder completion rates and patterns
7. **Calendar Sync**: Export reminders to Google Calendar or iCal
8. **Email/SMS**: Optional email or SMS notifications

## Testing

To test the reminder feature:

1. **Login Required**: You must be logged in to access reminders
2. **Create a Reminder**: Click "Create Reminder" and fill in the form
3. **Set Near Future Time**: Set a reminder time 2-3 minutes in the future
4. **Allow Notifications**: Click "Allow" when prompted for notification permission
5. **Wait for Notification**: Browser notification will appear when due
6. **Test Actions**: Try completing, snoozing, and deleting reminders

## Troubleshooting

### Notifications Not Showing
- Ensure browser notification permission is granted
- Check if browser is in focus (some browsers require focus)
- Verify reminder time is in the future
- Check browser console for errors

### Reminders Not Loading
- Verify you're logged in
- Check network tab for API errors
- Ensure backend server is running
- Check MongoDB connection

### Time Display Issues
- Ensure system time is correct
- Check timezone settings
- Verify datetime-local input format

## Installation

The feature is automatically included in the main application. No additional installation required.

## Configuration

Backend configuration in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/ayhs
JWT_SECRET=your_secret_key
```

No frontend configuration needed.

## API Documentation

See full API documentation at `/api/docs` (when implemented) or refer to the backend `server.js` file for endpoint details.

## Contributing

When contributing to the reminder feature:
1. Follow existing code style
2. Add PropTypes for React components
3. Write descriptive commit messages
4. Test notification functionality
5. Ensure mobile responsiveness

## License

Part of the AYHS health application project.
