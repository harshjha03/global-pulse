import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, BarChart3, FileText, Users, Star, Target, TrendingUp } from 'lucide-react';

const Navigation = ({ expanded, onExpandChange, currency, onCurrencyChange }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('overview');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currencies = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'AED', symbol: 'د.إ' },
    { code: 'SGD', symbol: 'S$' }
  ];

  const currentCurrency = currencies.find(c => c.code === currency);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Grid, path: '/' },
    { id: 'category-intel', label: 'Category Intel', icon: BarChart3, path: '/category-intel' },
    { id: 'news-board', label: 'News Board', icon: FileText, path: '/news-board' },
    { id: 'competitor', label: 'Competitor Analysis', icon: Users, path: '/competitor' },
    { id: 'trend-alignment', label: 'Trend Alignment', icon: Star, path: '/trend-alignment' },
    { id: 'segment-fit', label: 'Segment Fit', icon: Target, path: '/segment-fit' },
    { id: 'opp-capture', label: 'Opp. Capture', icon: TrendingUp, path: '/opp-capture' }
  ];

  const handleNavClick = (item) => {
    if (item.path) {
      setActiveItem(item.id);
      navigate(item.path);
    }
  };

  return (
    <div
      className="h-screen sticky top-0 overflow-hidden"
      style={{
        width: expanded ? '220px' : '54px',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.95)',
        boxShadow: '0 2px 14px rgba(0,0,0,0.09)'
      }}
      onMouseEnter={() => onExpandChange(true)}
      onMouseLeave={() => onExpandChange(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo - Always visible */}
        <div className="p-3 flex items-center" style={{ height: '54px' }}>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: '24px',
              height: '24px',
              background: '#007BFF',
              borderRadius: '6px'
            }}
          >
            <span className="text-white font-bold" style={{ fontSize: '10px' }}>GP</span>
          </div>
          <div
            className="ml-3 text-sm font-bold whitespace-nowrap overflow-hidden"
            style={{
              opacity: expanded ? 1 : 0,
              transition: 'opacity 0.12s ease 0.04s',
              width: expanded ? 'auto' : '0'
            }}
          >
            <span style={{ color: '#111827' }}>GlobalData</span>
            <span style={{ color: '#007BFF' }}> Pulse</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => handleNavClick(item)}
                className="flex items-center px-3 py-2 my-1 rounded cursor-pointer relative group"
                style={{
                  height: '34px',
                  borderLeft: isActive ? '2px solid #007BFF' : '2px solid transparent',
                  background: isActive ? 'rgba(0,123,255,0.07)' : 'transparent',
                  transition: 'background 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(0,123,255,0.07)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon
                  size={17}
                  style={{
                    color: isActive ? '#007BFF' : '#6B7280',
                    flexShrink: 0
                  }}
                />
                <span
                  className="ml-3 whitespace-nowrap overflow-hidden"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#007BFF' : '#6B7280',
                    opacity: expanded ? 1 : 0,
                    transition: 'opacity 0.12s ease 0.04s',
                    width: expanded ? 'auto' : '0'
                  }}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!expanded && (
                  <div
                    className="absolute left-full ml-2 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: '#111827',
                      color: 'white',
                      fontSize: '10px',
                      transition: 'opacity 0.15s ease',
                      zIndex: 1000
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Currency toggle */}
        <div className="p-2 relative group">
          <div
            data-testid="currency-toggle"
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="flex items-center justify-center px-3 py-2 rounded cursor-pointer"
            style={{
              background: 'rgba(0,123,255,0.07)',
              border: '1px solid rgba(0,123,255,0.22)',
              height: '34px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,123,255,0.13)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,123,255,0.07)')}
          >
            <span className="flex-shrink-0" style={{ fontSize: '14px', fontWeight: 600, color: '#007BFF' }}>
              {currentCurrency?.symbol}
            </span>
            <span
              className="ml-2 whitespace-nowrap overflow-hidden"
              style={{
                fontSize: '11.5px',
                fontWeight: 500,
                color: '#007BFF',
                opacity: expanded ? 1 : 0,
                transition: 'opacity 0.12s ease 0.04s',
                width: expanded ? 'auto' : '0'
              }}
            >
              {currency} · Switch currency
            </span>
          </div>
          
          {/* Tooltip for collapsed state */}
          {!expanded && (
            <div
              className="absolute left-full ml-2 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: '#111827',
                color: 'white',
                fontSize: '10px',
                transition: 'opacity 0.15s ease',
                zIndex: 1000,
                bottom: '10px'
              }}
            >
              {currentCurrency?.symbol} {currency}
            </div>
          )}

          {/* Currency dropdown */}
          {showCurrencyDropdown && (
            <div
              className="absolute bottom-full mb-2 left-2 right-2 rounded-lg overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              {currencies.map((curr) => (
                <div
                  key={curr.code}
                  data-testid={`currency-${curr.code}`}
                  onClick={() => {
                    onCurrencyChange(curr.code);
                    setShowCurrencyDropdown(false);
                  }}
                  className="px-3 py-2 cursor-pointer"
                  style={{
                    fontSize: '11px',
                    color: currency === curr.code ? '#007BFF' : '#374151',
                    background: currency === curr.code ? 'rgba(0,123,255,0.07)' : 'white',
                    fontWeight: currency === curr.code ? 600 : 400
                  }}
                  onMouseEnter={(e) => {
                    if (currency !== curr.code) e.currentTarget.style.background = '#F8FAFF';
                  }}
                  onMouseLeave={(e) => {
                    if (currency !== curr.code) e.currentTarget.style.background = 'white';
                  }}
                >
                  {curr.code} {curr.symbol}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;