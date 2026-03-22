import { useState } from 'react';
import { Calendar } from 'lucide-react';

const TopBar = ({ currency, currencyRates, onCurrencyChange, dateRange, onDateRangeChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const currencies = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'AED', symbol: 'د.إ' },
    { code: 'SGD', symbol: 'S$' }
  ];

  const currentSymbol = currencies.find(c => c.code === currency)?.symbol || '₹';
  
  const dateRanges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last 12 months', value: '12m' },
    { label: 'Year to date', value: 'ytd' },
    { label: 'Custom range', value: 'custom' }
  ];

  return (
    <div
      className="flex items-center justify-between px-6"
      style={{
        height: '46px',
        background: 'rgba(255,255,255,0.92)',
        borderBottom: '1px solid #E5E7EB',
        backdropFilter: 'blur(24px)'
      }}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold" style={{ fontSize: '13px', color: '#111827' }}>
          Market Intelligence
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: '#28A745' }}
          />
          <span style={{ fontSize: '10px', color: '#28A745', fontWeight: 500 }}>Live</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Range Selector */}
        <div className="relative">
          <button
            data-testid="date-range-selector"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              fontSize: '11px',
              fontWeight: 500,
              color: '#374151',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#007BFF';
              e.currentTarget.style.color = '#007BFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#374151';
            }}
          >
            <Calendar size={14} />
            <span>Mar 17–23, 2026</span>
          </button>
          
          {/* Date picker dropdown */}
          {showDatePicker && (
            <div
              className="absolute right-0 mt-2 rounded-lg overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                minWidth: '180px',
                zIndex: 100
              }}
            >
              {dateRanges.map((range) => (
                <div
                  key={range.value}
                  onClick={() => {
                    onDateRangeChange && onDateRangeChange(range.value);
                    setShowDatePicker(false);
                  }}
                  className="px-4 py-2 cursor-pointer"
                  style={{
                    fontSize: '11px',
                    color: '#374151',
                    fontWeight: 400
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFF'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  {range.label}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Currency indicator */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(0,123,255,0.07)',
            border: '1px solid rgba(0,123,255,0.22)'
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#007BFF' }}>
            {currentSymbol} {currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;