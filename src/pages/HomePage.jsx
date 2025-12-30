import HeroSection from '../components/home/HeroSection';
import MealSuggestionSection from '../components/home/MealSuggestionSection';
import '../components/home/HeroSection.css';
import '../components/home/MealSuggestionSection.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <MealSuggestionSection />
      {/* Other sections will be added here */}
    </div>
  );
};

export default HomePage; 