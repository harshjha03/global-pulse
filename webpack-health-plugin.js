import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';
import Overview from './Overview';
import CategoryIntel from './CategoryIntel';
import NewsBoard from './NewsBoard';
import TotoButton from '../components/TotoButton';

const Dashboard = () => {
  const [currency, setCurrency] = useState('INR');
  const [navExpanded, setNavExpanded] = useState(false);
  const [dateRange, setDateRange] = useState('7d');

  const currencyRates = {
    INR: { symbol: '₹', rate: 1 },
    USD: { symbol: '$', rate: 0.012 },
    EUR: { symbol: '€', rate: 0.011 },
    GBP: { symbol: '£', rate: 0.0095 },
    AED: { symbol: 'د.إ', rate: 0.044 },
    SGD: { symbol: 'S$', rate: 0.016 }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Navigation
        expanded={navExpanded}
        onExpandChange={setNavExpanded}
        currency={currency}
        onCurrencyChange={setCurrency}
      />
      <div className="flex-1 flex flex-col">
        <TopBar 
          currency={currency} 
          currencyRates={currencyRates} 
          onCurrencyChange={setCurrency}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <div className="flex-1 overflow-y-auto" style={{ background: '#F8FAFF' }}>
          <Routes>
            <Route path="/" element={<Overview currency={currency} currencyRates={currencyRates} />} />
            <Route path="/category-intel" element={<CategoryIntel currency={currency} currencyRates={currencyRates} />} />
            <Route path="/news-board" element={<NewsBoard />} />
          </Routes>
        </div>
      </div>
      <TotoButton />
    </div>
  );
};

export default Dashboard;
