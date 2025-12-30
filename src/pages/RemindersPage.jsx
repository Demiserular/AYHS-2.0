import { useState, useEffect } from 'react';
import {
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    markReminderComplete,
    snoozeReminder,
    initializeReminders,
    checkDueReminders,
    formatReminderTime
} from '../services/reminderService';
import './RemindersPage.css';

const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const [newReminder, setNewReminder] = useState({
        type: 'custom',
        title: '',
        description: '',
        reminderTime: '',
        frequency: 'once',
        notes: '',
        context: {}
    });

    useEffect(() => {
        loadReminders();
        initializeReminders();

        // Check for due reminders every minute
        const interval = setInterval(() => {
            checkDueReminders();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const loadReminders = async () => {
        try {
            setLoading(true);
            const filterParams = filter === 'all' ? {} : { status: filter };
            const data = await getReminders(filterParams);
            setReminders(data);
        } catch (error) {
            console.error('Error loading reminders:', error);
            if (error.response?.status === 403 || error.response?.status === 401) {
                alert('Please log in to view reminders');
                // Optional: redirect to login page
                // window.location.href = '/login';
            } else {
                alert('Failed to load reminders');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateReminder = async (e) => {
        e.preventDefault();
        try {
            await createReminder(newReminder);
            setShowCreateModal(false);
            setNewReminder({
                type: 'custom',
                title: '',
                description: '',
                reminderTime: '',
                frequency: 'once',
                notes: '',
                context: {}
            });
            loadReminders();
            alert('Reminder created successfully!');
        } catch (error) {
            console.error('Error creating reminder:', error);
            alert('Failed to create reminder');
        }
    };

    const handleComplete = async (id) => {
        try {
            await markReminderComplete(id);
            loadReminders();
        } catch (error) {
            console.error('Error completing reminder:', error);
            alert('Failed to complete reminder');
        }
    };

    const handleSnooze = async (id) => {
        try {
            await snoozeReminder(id, 15); // Snooze for 15 minutes
            loadReminders();
        } catch (error) {
            console.error('Error snoozing reminder:', error);
            alert('Failed to snooze reminder');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this reminder?')) {
            try {
                await deleteReminder(id);
                loadReminders();
            } catch (error) {
                console.error('Error deleting reminder:', error);
                alert('Failed to delete reminder');
            }
        }
    };

    const getReminderIcon = (type) => {
        const icons = {
            medicine: '💊',
            meal: '🍽️',
            appointment: '👨‍⚕️',
            custom: '⏰'
        };
        return icons[type] || '⏰';
    };

    const getReminderColor = (type) => {
        const colors = {
            medicine: 'reminder-medicine',
            meal: 'reminder-meal',
            appointment: 'reminder-appointment',
            custom: 'reminder-custom'
        };
        return colors[type] || 'reminder-custom';
    };

    const filteredReminders = reminders.filter(reminder => {
        if (filter === 'all') return true;
        if (filter === 'active') return reminder.status === 'active';
        if (filter === 'completed') return reminder.status === 'completed';
        return true;
    });

    const upcomingReminders = filteredReminders.filter(r =>
        r.status === 'active' && new Date(r.reminderTime) > new Date()
    ).sort((a, b) => new Date(a.reminderTime) - new Date(b.reminderTime));

    const overdueReminders = filteredReminders.filter(r =>
        r.status === 'active' && new Date(r.reminderTime) <= new Date()
    );

    const completedReminders = filteredReminders.filter(r => r.status === 'completed');

    return (
        <div className="reminders-page">
            <div className="reminders-header">
                <h1>🔔 Smart Reminders</h1>
                <p>Stay on track with your health routine</p>
            </div>

            <div className="reminders-actions">
                <button className="btn-create" onClick={() => setShowCreateModal(true)}>
                    ➕ Create Reminder
                </button>
                <div className="filter-tabs">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'active' ? 'active' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading reminders...</div>
            ) : (
                <div className="reminders-content">
                    {/* Overdue Reminders */}
                    {overdueReminders.length > 0 && (
                        <div className="reminder-section overdue-section">
                            <h2>⚠️ Overdue ({overdueReminders.length})</h2>
                            <div className="reminders-grid">
                                {overdueReminders.map(reminder => (
                                    <ReminderCard
                                        key={reminder._id}
                                        reminder={reminder}
                                        onComplete={handleComplete}
                                        onSnooze={handleSnooze}
                                        onDelete={handleDelete}
                                        getReminderIcon={getReminderIcon}
                                        getReminderColor={getReminderColor}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upcoming Reminders */}
                    {upcomingReminders.length > 0 && (
                        <div className="reminder-section">
                            <h2>📅 Upcoming ({upcomingReminders.length})</h2>
                            <div className="reminders-grid">
                                {upcomingReminders.map(reminder => (
                                    <ReminderCard
                                        key={reminder._id}
                                        reminder={reminder}
                                        onComplete={handleComplete}
                                        onSnooze={handleSnooze}
                                        onDelete={handleDelete}
                                        getReminderIcon={getReminderIcon}
                                        getReminderColor={getReminderColor}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed Reminders */}
                    {completedReminders.length > 0 && filter !== 'active' && (
                        <div className="reminder-section">
                            <h2>✅ Completed ({completedReminders.length})</h2>
                            <div className="reminders-grid">
                                {completedReminders.map(reminder => (
                                    <ReminderCard
                                        key={reminder._id}
                                        reminder={reminder}
                                        onComplete={handleComplete}
                                        onSnooze={handleSnooze}
                                        onDelete={handleDelete}
                                        getReminderIcon={getReminderIcon}
                                        getReminderColor={getReminderColor}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredReminders.length === 0 && (
                        <div className="no-reminders">
                            <p>📭 No reminders found</p>
                            <button onClick={() => setShowCreateModal(true)}>Create your first reminder</button>
                        </div>
                    )}
                </div>
            )}

            {/* Create Reminder Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Create New Reminder</h2>
                        <form onSubmit={handleCreateReminder}>
                            <div className="form-group">
                                <label>Reminder Type</label>
                                <select
                                    value={newReminder.type}
                                    onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
                                    required
                                >
                                    <option value="custom">Custom</option>
                                    <option value="medicine">Medicine</option>
                                    <option value="meal">Meal</option>
                                    <option value="appointment">Appointment</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={newReminder.title}
                                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                                    placeholder="e.g., Take Vitamin D"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={newReminder.description}
                                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                                    placeholder="e.g., 1 tablet with breakfast"
                                />
                            </div>

                            <div className="form-group">
                                <label>Reminder Time</label>
                                <input
                                    type="datetime-local"
                                    value={newReminder.reminderTime}
                                    onChange={(e) => setNewReminder({ ...newReminder, reminderTime: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Frequency</label>
                                <select
                                    value={newReminder.frequency}
                                    onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                                    required
                                >
                                    <option value="once">Once</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Notes (Optional)</label>
                                <textarea
                                    value={newReminder.notes}
                                    onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
                                    placeholder="Additional notes..."
                                    rows="3"
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    Create Reminder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const ReminderCard = ({ reminder, onComplete, onSnooze, onDelete, getReminderIcon, getReminderColor }) => {
    const isOverdue = new Date(reminder.reminderTime) <= new Date() && reminder.status === 'active';
    const isCompleted = reminder.status === 'completed';

    return (
        <div className={`reminder-card ${getReminderColor(reminder.type)} ${isOverdue ? 'overdue' : ''} ${isCompleted ? 'completed' : ''}`}>
            <div className="reminder-card-header">
                <span className="reminder-icon">{getReminderIcon(reminder.type)}</span>
                <span className="reminder-type">{reminder.type}</span>
            </div>

            <div className="reminder-card-body">
                <h3>{reminder.title}</h3>
                {reminder.description && <p className="reminder-description">{reminder.description}</p>}

                <div className="reminder-time">
                    <span className="time-icon">🕐</span>
                    <span>{formatReminderTime(reminder.reminderTime)}</span>
                </div>

                <div className="reminder-meta">
                    <span className="frequency-badge">{reminder.frequency}</span>
                    {reminder.notes && (
                        <span className="notes-indicator" title={reminder.notes}>📝</span>
                    )}
                </div>
            </div>

            {!isCompleted && (
                <div className="reminder-card-actions">
                    <button className="btn-complete" onClick={() => onComplete(reminder._id)} title="Mark as complete">
                        ✓
                    </button>
                    <button className="btn-snooze" onClick={() => onSnooze(reminder._id)} title="Snooze 15 min">
                        ⏰
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(reminder._id)} title="Delete">
                        🗑️
                    </button>
                </div>
            )}

            {isCompleted && (
                <div className="completed-badge">
                    ✅ Completed
                </div>
            )}
        </div>
    );
};

export default RemindersPage;
