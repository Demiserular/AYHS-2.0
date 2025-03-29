import HeroSection from '../components/home/HeroSection';
import MealSuggestionSection from '../components/home/MealSuggestionSection';
import MedicineConsultSection from '../components/home/MedicineConsultSection';
import '../components/home/HeroSection.css';
import '../components/home/MealSuggestionSection.css';
import '../components/home/MedicineConsultSection.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <MealSuggestionSection />
      <MedicineConsultSection />
      {/* Other sections will be added here */}
    </div>
  );
};

export default HomePage; 