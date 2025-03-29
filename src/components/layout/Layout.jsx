import PropTypes from 'prop-types';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-container">
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 