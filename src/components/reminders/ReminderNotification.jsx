import { useState, useEffect } from 'react';
import { checkDueReminders } from '../../services/reminderService';
import './ReminderNotification.css';

const ReminderNotification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Check for due reminders every 30 seconds
        const checkReminders = async () => {
            const dueReminders = await checkDueReminders();
            if (dueReminders.length > 0) {
                setNotifications(prev => {
                    const newNotifications = dueReminders.filter(
                        reminder => !prev.find(n => n._id === reminder._id)
                    );
                    return [...prev, ...newNotifications];
                });
            }
        };

        checkReminders();
        const interval = setInterval(checkReminders, 30000);

        return () => clearInterval(interval);
    }, []);

    const dismissNotification = (id) => {
        setNotifications(prev => prev.filter(n => n._id !== id));
    };

    if (notifications.length === 0) return null;

    return (
        <div className="reminder-notifications">
            {notifications.map((reminder) => (
                <div key={reminder._id} className="reminder-notification">
                    <div className="notification-content">
                        <div className="notification-icon">🔔</div>
                        <div className="notification-text">
                            <strong>{reminder.title}</strong>
                            {reminder.description && <p>{reminder.description}</p>}
                        </div>
                    </div>
                    <button
                        className="notification-dismiss"
                        onClick={() => dismissNotification(reminder._id)}
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ReminderNotification;
