import MedicineSearch from '../components/medicine/MedicineSearch';
import './MedicinesPage.css';

const MedicinesPage = () => {
  return (
    <div className="medicines-page">
      <h1>Medicine Search</h1>
      <p>Search for medicines and compare prices across different pharmacies</p>
      <MedicineSearch />
    </div>
  );
};

export default MedicinesPage; 