import PropTypes from 'prop-types';
import './Layout.css';
import Footer from './Footer';
import ReminderNotification from '../reminders/ReminderNotification';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <ReminderNotification />
      <div className="layout-container">
        {children}
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 