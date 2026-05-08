import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AIPlanner from './pages/AIPlanner';
import EmployeeIncentives from './pages/EmployeeIncentives';
import CorporateRetreats from './pages/CorporateRetreats';
import AnnualPlanner from './pages/AnnualPlanner';
import CorporateGifting from './pages/CorporateGifting';
import MiceEvents from './pages/MiceEvents';
import TeamOutings from './pages/TeamOutings';
import Destinations from './pages/Destinations';
import { Layout } from './components/Layout';
import { AIPopup } from './components/AIPopup';
import SoulDestination from './pages/SoulDestination';


export default function App() {
  return (
    <BrowserRouter>

      <AIPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-planner" element={<Layout><AIPlanner /></Layout>} />
        <Route path="/services/employee-incentive-tours" element={<Layout><EmployeeIncentives /></Layout>} />
        <Route path="/services/corporate-retreats" element={<Layout><CorporateRetreats /></Layout>} />
        <Route path="/services/annual-planner-trips" element={<Layout><AnnualPlanner /></Layout>} />
        <Route path="/services/corporate-gifting" element={<Layout><CorporateGifting /></Layout>} />
        <Route path="/services/mice-events" element={<Layout><MiceEvents /></Layout>} />
        <Route path="/services/team-outings" element={<Layout><TeamOutings /></Layout>} />
        <Route path="/destinations" element={<Layout><Destinations /></Layout>} />
        <Route path="/soul-destination" element={<SoulDestination />} />
      </Routes>
    </BrowserRouter>
  );
}
