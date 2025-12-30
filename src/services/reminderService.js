import axios from 'axios';

const API_URL = '/api/reminders';

/**
 * Reminder Service - Manages context-aware reminders
 * Supports medicine, meal, appointment, and custom reminders
 */

export const createReminder = async (reminderData) => {
    const response = await axios.post(API_URL, reminderData);
    return response.data;
};

export const getReminders = async (filters = {}) => {
    // Filter out undefined/null values to prevent 'undefined' in URL
    const cleanFilters = Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    const params = new URLSearchParams(cleanFilters);
    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
};

export const getUpcomingReminders = async (hours = 24) => {
    const response = await axios.get(`${API_URL}/upcoming?hours=${hours}`);
    return response.data;
};

export const getReminderById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateReminder = async (id, reminderData) => {
    const response = await axios.put(`${API_URL}/${id}`, reminderData);
    return response.data;
};

export const deleteReminder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const markReminderComplete = async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/complete`, {});
    return response.data;
};

export const snoozeReminder = async (id, minutes) => {
    const response = await axios.patch(`${API_URL}/${id}/snooze`, { minutes });
    return response.data;
};

// Context-aware helper functions
export const createMedicineReminder = async (medicineName, dosage, time, frequency, notes = '') => {
    return createReminder({
        type: 'medicine',
        title: `Take ${medicineName}`,
        description: `Dosage: ${dosage}`,
        reminderTime: time,
        frequency,
        context: {
            medicineName,
            dosage
        },
        notes
    });
};

export const createMealReminder = async (mealType, time, notes = '') => {
    return createReminder({
        type: 'meal',
        title: `Time for ${mealType}`,
        description: notes,
        reminderTime: time,
        frequency: 'daily',
        context: {
            mealType
        },
        notes
    });
};

export const createAppointmentReminder = async (doctorName, appointmentTime, location, notes = '') => {
    return createReminder({
        type: 'appointment',
        title: `Appointment with Dr. ${doctorName}`,
        description: `Location: ${location}`,
        reminderTime: appointmentTime,
        frequency: 'once',
        context: {
            doctorName,
            location
        },
        notes
    });
};

// Check for active reminders and request notification permission
export const initializeReminders = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
    }
};

// Show browser notification
export const showNotification = (reminder) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(reminder.title, {
            body: reminder.description,
            icon: '/logo.png',
            badge: '/logo.png',
            tag: reminder._id,
            requireInteraction: true
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        return notification;
    }
};

// Check for due reminders (should be called periodically)
export const checkDueReminders = async () => {
    try {
        const now = new Date();
        const reminders = await getReminders({ status: 'active' });

        const dueReminders = reminders.filter(reminder => {
            const reminderTime = new Date(reminder.reminderTime);
            const timeDiff = reminderTime - now;
            // Show notification if reminder is within 5 minutes
            return timeDiff > 0 && timeDiff <= 5 * 60 * 1000;
        });

        dueReminders.forEach(reminder => {
            showNotification(reminder);
        });

        return dueReminders;
    } catch (error) {
        console.error('Error checking due reminders:', error);
        return [];
    }
};

// Calculate next occurrence for recurring reminders
export const calculateNextOccurrence = (currentTime, frequency) => {
    const date = new Date(currentTime);

    switch (frequency) {
        case 'hourly':
            date.setHours(date.getHours() + 1);
            break;
        case 'daily':
            date.setDate(date.getDate() + 1);
            break;
        case 'weekly':
            date.setDate(date.getDate() + 7);
            break;
        case 'monthly':
            date.setMonth(date.getMonth() + 1);
            break;
        default:
            return null;
    }

    return date.toISOString();
};

// Format reminder time for display
export const formatReminderTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diffMs = date - now;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 0) return 'Overdue';
    if (diffMins < 60) return `In ${diffMins} minutes`;
    if (diffHours < 24) return `In ${diffHours} hours`;
    if (diffDays < 7) return `In ${diffDays} days`;

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
