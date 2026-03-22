import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { ChevronDown } from 'lucide-react';

const Overview = ({ currency, currencyRates }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ coordinates: [15, 10], zoom: 1.2 });
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const convertCurrency = (value) => {
    const rate = currencyRates[currency]?.rate || 1;
    const symbol = currencyRates[currency]?.symbol || '₹';
    const converted = value * rate;
    if (value >= 1000) {
      return `${symbol}${(converted / 1000).toFixed(1)}T`;
    }
    return `${symbol}${converted.toFixed(converted < 1 ? 3 : converted < 100 ? 1 : 0)}${value >= 100 ? 'B' : ''}`;
  };

  // Only 6 highlighted countries with category colors - keyed by name for world-atlas TopoJSON
  const highlightedCountries = {
    'India': { 
      name: 'India', 
      flag: '🇮🇳',
      marketSize: 1100, 
      growth: '6.5–8%', 
      opportunityScore: 90,
      category: 'Food & Beverages', 
      color: '#2F80ED' 
    },
    'Brazil': { 
      name: 'Brazil', 
      flag: '🇧🇷',
      marketSize: 450, 
      growth: '3–5%', 
      opportunityScore: 80,
      category: 'Personal Care', 
      color: '#9B51E0' 
    },
    'Germany': { 
      name: 'Germany', 
      flag: '🇩🇪',
      marketSize: 600, 
      growth: '2–3%', 
      opportunityScore: 72,
      category: 'Health & Wellness', 
      color: '#27AE60' 
    },
    'Indonesia': { 
      name: 'Indonesia', 
      flag: '🇮🇩',
      marketSize: 300, 
      growth: '6–7%', 
      opportunityScore: 85,
      category: 'Home Care', 
      color: '#C05600' 
    },
    'Vietnam': { 
      name: 'Vietnam', 
      flag: '🇻🇳',
      marketSize: 180, 
      growth: '7–9%', 
      opportunityScore: 87,
      category: 'Baby Care', 
      color: '#EB5757' 
    },
    'United States of America': { 
      name: 'United States', 
      flag: '🇺🇸',
      marketSize: 1800, 
      growth: '2–3%', 
      opportunityScore: 78,
      category: 'Pet Care', 
      color: '#0B6E4F' 
    }
  };

  const getCountryColor = (geo) => {
    const countryName = geo.properties.name;
    const data = highlightedCountries[countryName];
    
    if (!data) return '#E2E8F0'; // Light gray for non-highlighted countries (visible outline)
    
    return data.color; // Bold category colors
  };

  const handleCountryHover = (geo, event) => {
    const countryName = geo.properties.name;
    const data = highlightedCountries[countryName];
    if (data) {
      setHoveredCountry(data);
      setTooltipPos({ x: event.clientX, y: event.clientY });
    }
  };

  const categories = [
    { name: 'Food & Beverages', color: '#2F80ED', country: '🇮🇳 India' },
    { name: 'Personal Care', color: '#9B51E0', country: '🇧🇷 Brazil' },
    { name: 'Health & Wellness', color: '#27AE60', country: '🇩🇪 Germany' },
    { name: 'Home Care', color: '#C05600', country: '🇮🇩 Indonesia' },
    { name: 'Baby Care', color: '#EB5757', country: '🇻🇳 Vietnam' },
    { name: 'Pet Care', color: '#0B6E4F', country: '🇺🇸 USA' }
  ];

  return (
    <div>
      {/* Map Hero */}
      <div
        className="relative"
        style={{
          width: '100%',
          height: 'calc(100vh - 200px)',
          minHeight: '350px',
          background: 'linear-gradient(155deg, #ECF4FF 0%, #EEF6FF 50%, #E8F3FF 100%)',
          overflow: 'hidden'
        }}
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 160, center: [15, 10] }}
          style={{ width: '100%', height: '100%', cursor: 'grab' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={setPosition}
            minZoom={0.8}
            maxZoom={6}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }) =>
                geographies.map(geo => {
                  const countryName = geo.properties.name;
                  const hasData = highlightedCountries[countryName];
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(geo)}
                      stroke="#FFFFFF"
                      strokeWidth={hasData ? 1.5 : 0.4}
                      style={{
                        default: { 
                          outline: 'none', 
                          fill: getCountryColor(geo),
                          opacity: hasData ? 1 : 0.6,
                          stroke: hasData ? '#FFFFFF' : '#CBD5E1',
                          strokeWidth: hasData ? 1.5 : 0.3,
                          transition: 'all 0.2s ease',
                          filter: hasData ? 'saturate(1.4) brightness(1)' : 'none'
                        },
                        hover: { 
                          outline: 'none', 
                          fill: hasData ? getCountryColor(geo) : '#D1D5DB',
                          opacity: 1,
                          stroke: hasData ? '#FFFFFF' : '#94A3B8',
                          strokeWidth: hasData ? 2 : 0.5,
                          transition: 'all 0.15s ease',
                          cursor: hasData ? 'pointer' : 'default',
                          filter: hasData ? 'brightness(1.15) saturate(1.2)' : 'none'
                        },
                        pressed: { outline: 'none' }
                      }}
                      onMouseEnter={(e) => hasData && handleCountryHover(geo, e)}
                      onMouseMove={(e) => hasData && handleCountryHover(geo, e)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => hasData && navigate('/category-intel')}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {hoveredCountry && (
          <div
            className="fixed pointer-events-none"
            style={{
              left: tooltipPos.x + 10,
              top: tooltipPos.y + 10,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              boxShadow: '0 6px 28px rgba(0,0,0,0.11)',
              padding: '14px 16px',
              minWidth: '220px',
              zIndex: 100,
              border: `2px solid ${hoveredCountry.color}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: '18px' }}>{hoveredCountry.flag}</span>
              <div className="font-bold" style={{ fontSize: '13px', color: '#111827' }}>
                {hoveredCountry.name}
              </div>
            </div>
            <div className="mb-3 pb-2" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <div className="font-semibold mb-1" style={{ fontSize: '9px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Category
              </div>
              <div className="font-bold" style={{ fontSize: '11px', color: hoveredCountry.color }}>
                {hoveredCountry.category}
              </div>
            </div>
            <div className="space-y-2" style={{ fontSize: '10px' }}>
              <div className="flex justify-between">
                <span style={{ color: '#6B7280' }}>Market Size</span>
                <span style={{ color: '#111827', fontWeight: 700 }}>{convertCurrency(hoveredCountry.marketSize)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B7280' }}>Growth</span>
                <span style={{ color: '#27AE60', fontWeight: 700 }}>{hoveredCountry.growth}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B7280' }}>Opportunity Score</span>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ 
                      width: '60px', 
                      background: '#E5E7EB',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${hoveredCountry.opportunityScore}%`,
                        background: hoveredCountry.color
                      }}
                    />
                  </div>
                  <span style={{ fontWeight: 700, color: hoveredCountry.color }}>{hoveredCountry.opportunityScore}/100</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay: Category legend (top-left) */}
        <div
          className="absolute top-6 left-6"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            boxShadow: '0 2px 14px rgba(0,0,0,0.09)',
            padding: '12px 14px'
          }}
        >
          <div
            className="mb-2"
            style={{
              fontSize: '8.5px',
              fontWeight: 700,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            Category Density
          </div>
          <div className="space-y-1.5">
            {categories.map(cat => (
              <div key={cat.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: cat.color, border: '1px solid rgba(255,255,255,0.5)' }}
                />
                <span style={{ fontSize: '9px', color: '#374151', fontWeight: 600 }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay: CPG Headlines (top-right) */}
        <div
          className="absolute top-6 right-6"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            boxShadow: '0 2px 14px rgba(0,0,0,0.09)',
            padding: '12px 14px',
            maxWidth: '200px'
          }}
        >
          <div
            className="mb-2"
            style={{
              fontSize: '8.5px',
              fontWeight: 700,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            CPG Headlines
          </div>
          <div className="space-y-2">
            <div
              className="cursor-pointer hover:text-[#007BFF]"
              style={{ fontSize: '9px', color: '#374151', lineHeight: '1.3' }}
            >
              Pet Care TAM exceeds $300B globally, +18.3% YoY
            </div>
            <div
              className="cursor-pointer hover:text-[#007BFF]"
              style={{ fontSize: '9px', color: '#374151', lineHeight: '1.3' }}
            >
              SEA region leads growth velocity at +15.4%, D2C penetration rising
            </div>
            <div
              className="cursor-pointer hover:text-[#007BFF]"
              style={{ fontSize: '9px', color: '#374151', lineHeight: '1.3' }}
            >
              Functional beverages capture 34% adoption QoQ in SA markets
            </div>
          </div>
          <div
            className="mt-3 cursor-pointer"
            style={{ fontSize: '9px', color: '#007BFF', fontWeight: 600 }}
          >
            Show more news →
          </div>
        </div>

        {/* Scroll indicator (bottom-right) */}
        <div className="absolute bottom-6 right-6">
          <div
            className="flex flex-col items-center"
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              boxShadow: '0 2px 14px rgba(0,0,0,0.09)',
              padding: '8px 12px'
            }}
          >
            <div style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>
              Scroll for dashboard
            </div>
            <ChevronDown
              size={16}
              style={{
                color: '#007BFF',
                marginTop: '4px',
                animation: 'bounce 2s infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Cards Below Map */}
      <div className="px-5 py-4" style={{ background: '#F8FAFF' }}>
        <DashboardCards currency={currency} currencyRates={currencyRates} navigate={navigate} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

const DashboardCards = ({ currency, currencyRates, navigate }) => {
  const convertCurrency = (value) => {
    const rate = currencyRates[currency]?.rate || 1;
    const symbol = currencyRates[currency]?.symbol || '₹';
    const converted = value * rate;
    if (value >= 1000) {
      return `${symbol}${(converted / 1000).toFixed(1)}T`;
    }
    return `${symbol}${converted.toFixed(converted < 1 ? 3 : converted < 100 ? 1 : 0)}${value >= 100 ? 'B' : ''}`;
  };

  const categoryData = [
    { name: 'Food & Beverages', color: '#2F80ED', tam: 4800, delta: '+9.4%', deltaColor: '#28A745' },
    { name: 'Personal Care', color: '#9B51E0', tam: 1300, delta: '+7.2%', deltaColor: '#28A745' },
    { name: 'Health & Wellness', color: '#27AE60', tam: 900, delta: '+14.6%', deltaColor: '#28A745' },
    { name: 'Home Care', color: '#C05600', tam: 700, delta: '+2.1%', deltaColor: '#FFC107' },
    { name: 'Baby Care', color: '#EB5757', tam: 400, delta: '−1.4%', deltaColor: '#DC3545' },
    { name: 'Pet Care', color: '#0B6E4F', tam: 300, delta: '+18.3%', deltaColor: '#28A745' }
  ];

  const plBenchmarks = [
    { category: 'F & B', grossMargin: '32–44%', netMargin: '8–12%', breakeven: '22 mo', aov: convertCurrency(185), cacLtv: '1:4.2', invTurn: '28d', beta: '1.24', hhi: '2,180', skuSurv: '16%' },
    { category: 'Personal Care', grossMargin: '50–68%', netMargin: '14–22%', breakeven: '18 mo', aov: convertCurrency(420), cacLtv: '1:5.8', invTurn: '52d', beta: '0.92', hhi: '2,890', skuSurv: '21%' },
    { category: 'Health & W.', grossMargin: '54–72%', netMargin: '11–18%', breakeven: '24 mo', aov: convertCurrency(640), cacLtv: '1:3.4', invTurn: '44d', beta: '1.41', hhi: '1,380', skuSurv: '12%' },
    { category: 'Home Care', grossMargin: '28–38%', netMargin: '6–10%', breakeven: '20 mo', aov: convertCurrency(210), cacLtv: '1:3.1', invTurn: '38d', beta: '0.78', hhi: '3,240', skuSurv: '24%' },
    { category: 'Baby Care', grossMargin: '42–58%', netMargin: '9–14%', breakeven: '28 mo', aov: convertCurrency(890), cacLtv: '1:2.8', invTurn: '61d', beta: '1.08', hhi: '2,640', skuSurv: '22%' },
    { category: 'Pet Care', grossMargin: '48–64%', netMargin: '16–24%', breakeven: '19 mo', aov: convertCurrency(1240), cacLtv: '1:6.2', invTurn: '34d', beta: '0.96', hhi: '1,820', skuSurv: '28%' }
  ];

  // Category signals - 3x2 grid with all 6 categories
  const signalsData = [
    { 
      name: 'Food & Beverages', 
      color: '#2F80ED',
      tam: convertCurrency(4800),
      growth: '+9.4%',
      momentum: 94,
      hhi: '2,180'
    },
    { 
      name: 'Personal Care', 
      color: '#9B51E0',
      tam: convertCurrency(1300),
      growth: '+7.2%',
      momentum: 88,
      hhi: '2,890'
    },
    { 
      name: 'Health & Wellness', 
      color: '#27AE60',
      tam: convertCurrency(900),
      growth: '+14.6%',
      momentum: 92,
      hhi: '1,380'
    },
    { 
      name: 'Home Care', 
      color: '#C05600',
      tam: convertCurrency(700),
      growth: '+2.1%',
      momentum: 76,
      hhi: '3,240'
    },
    { 
      name: 'Baby Care', 
      color: '#EB5757',
      tam: convertCurrency(400),
      growth: '−1.4%',
      momentum: 68,
      hhi: '2,640'
    },
    { 
      name: 'Pet Care', 
      color: '#0B6E4F',
      tam: convertCurrency(300),
      growth: '+18.3%',
      momentum: 96,
      hhi: '1,820'
    }
  ];

  const competitorData = [
    { brand: 'HUL', category: 'Personal Care', share: 34, mom: '+1.2%', d2c: '8%', revYoy: '+6.4%', status: 'Growing' },
    { brand: 'Nestlé', category: 'F & B', share: 28, mom: '+0.3%', d2c: '12%', revYoy: '+2.1%', status: 'Stable' },
    { brand: 'Dabur', category: 'H & W', share: 22, mom: '+2.8%', d2c: '18%', revYoy: '+11.2%', status: 'Growing' },
    { brand: 'P&G', category: 'Home Care', share: 38, mom: '−0.8%', d2c: '6%', revYoy: '−1.4%', status: 'Declining' },
    { brand: 'ITC', category: 'F & B', share: 18, mom: '+1.6%', d2c: '9%', revYoy: '+7.8%', status: 'Growing' },
    { brand: 'Marico', category: 'Personal Care', share: 14, mom: '+3.1%', d2c: '22%', revYoy: '+14.1%', status: 'Growing' }
  ];

  const newsData = [
    { source: 'Reuters', date: 'Mar 20', headline: 'Pet Care sector sees unprecedented growth in Asian markets', summary: 'D2C channels driving 40% of new customer acquisition across SEA region', region: 'SEA', category: 'Pet Care' },
    { source: 'Bloomberg', date: 'Mar 19', headline: 'Functional beverages capture millennial spending in India', summary: 'Energy and immunity drinks see +34% QoQ adoption among urban consumers', region: 'South Asia', category: 'F&B' },
    { source: 'FT', date: 'Mar 18', headline: 'Private label penetration hits 18% in European home care', summary: 'Cost-conscious buyers shift towards retailer brands amid inflation concerns', region: 'Europe', category: 'Home Care' },
    { source: 'WSJ', date: 'Mar 17', headline: 'Beauty tech startups raise $2.4B in Q1 2026', summary: 'AR try-on and personalized formulation platforms attract major VC interest', region: 'Global', category: 'Personal Care' },
    { source: 'ET', date: 'Mar 16', headline: 'Health & Wellness TAM crosses $900B milestone', summary: 'Preventive care and supplements drive growth across all demographics', region: 'Global', category: 'H&W' },
    { source: 'CNBC', date: 'Mar 15', headline: 'Baby Care brands pivot to sustainability messaging', summary: 'Eco-friendly packaging now influences 68% of millennial parent purchases', region: 'USA', category: 'Baby Care' }
  ];

  return (
    <div className="space-y-3">
      {/* Card 1: Category KPI snapshot */}
      <div className="grid grid-cols-6 gap-2">
        {categoryData.map(cat => (
          <div
            key={cat.name}
            data-testid={`category-kpi-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => navigate('/category-intel')}
            className="p-3 rounded-lg cursor-pointer"
            style={{
              background: '#F8FAFF',
              border: '1px solid #E5E7EB',
              transition: 'all 0.16s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#007BFF';
              e.currentTarget.style.background = 'rgba(0,123,255,0.07)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,123,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.background = '#F8FAFF';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              className="mb-1"
              style={{
                fontSize: '8px',
                fontWeight: 700,
                color: cat.color,
                textTransform: 'uppercase'
              }}
            >
              {cat.name}
            </div>
            <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '4px' }}>
              TAM
            </div>
            <div className="font-bold" style={{ fontSize: '17px', color: '#111827' }}>
              {convertCurrency(cat.tam)}
            </div>
            <div className="font-bold mt-1" style={{ fontSize: '9px', color: cat.deltaColor }}>
              {cat.delta.startsWith('+') ? '▲ ' : cat.delta.startsWith('−') ? '▼ ' : '→ '}
              {cat.delta} YoY
            </div>
          </div>
        ))}
      </div>

      {/* Card 2: P&L Benchmarks (without whitespace column) */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: 'white',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          padding: '14px 18px'
        }}
      >
        <div className="mb-3 font-semibold" style={{ fontSize: '12px', color: '#111827' }}>
          P&L Benchmarks
        </div>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', tableLayout: 'fixed', fontSize: '10.5px', lineHeight: '1.3' }}>
            <thead>
              <tr style={{ background: '#F8FAFF' }}>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gross margin</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net margin</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Breakeven</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AOV</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CAC:LTV</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Inv. turn</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>β</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>HHI</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SKU surv.</th>
              </tr>
            </thead>
            <tbody>
              {plBenchmarks.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ borderTop: '1px solid #E5E7EB', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFF'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <td style={{ padding: '5px 8px', color: categoryData.find(c => c.name.includes(row.category.split(' ')[0]))?.color || '#111827', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.category}</td>
                  <td style={{ padding: '5px 8px', color: '#28A745', fontWeight: 600 }}>{row.grossMargin}</td>
                  <td style={{ padding: '5px 8px', color: '#28A745', fontWeight: 600 }}>{row.netMargin}</td>
                  <td style={{ padding: '5px 8px', color: '#374151' }}>{row.breakeven}</td>
                  <td style={{ padding: '5px 8px', color: '#007BFF', fontWeight: 600 }}>{row.aov}</td>
                  <td style={{ padding: '5px 8px', color: '#374151' }}>{row.cacLtv}</td>
                  <td style={{ padding: '5px 8px', color: '#374151' }}>{row.invTurn}</td>
                  <td style={{ padding: '5px 8px', color: '#FFC107', fontWeight: 600 }}>{row.beta}</td>
                  <td style={{ padding: '5px 8px', color: '#374151' }}>{row.hhi}</td>
                  <td style={{ padding: '5px 8px', color: '#DC3545', fontWeight: 600 }}>{row.skuSurv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 3: Two-column - Category Signals (3x2 grid) + Competitor Snapshot */}
      <div className="grid grid-cols-2 gap-3">
        {/* Category Signals - 3x2 Grid */}
        <div
          className="rounded-lg"
          style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            padding: '14px 18px'
          }}
        >
          <div className="mb-3 font-semibold" style={{ fontSize: '12px', color: '#111827' }}>
            Category Signals
          </div>
          <div className="grid grid-cols-3 gap-2">
            {signalsData.map((signal, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg cursor-pointer"
                style={{
                  background: '#F8FAFF',
                  border: `2px solid ${signal.color}40`,
                  transition: 'all 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = signal.color;
                  e.currentTarget.style.background = `${signal.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${signal.color}40`;
                  e.currentTarget.style.background = '#F8FAFF';
                }}
              >
                <div className="mb-2" style={{ fontSize: '9px', fontWeight: 700, color: signal.color, textTransform: 'uppercase' }}>
                  {signal.name}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span style={{ fontSize: '8px', color: '#6B7280' }}>TAM</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#111827' }}>{signal.tam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '8px', color: '#6B7280' }}>Growth</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: signal.growth.startsWith('+') ? '#28A745' : signal.growth.startsWith('−') ? '#DC3545' : '#FFC107' }}>{signal.growth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '8px', color: '#6B7280' }}>Momentum</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: signal.momentum >= 90 ? '#28A745' : signal.momentum >= 80 ? '#FFC107' : '#DC3545' }}>{signal.momentum}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '8px', color: '#6B7280' }}>HHI</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#111827' }}>{signal.hhi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Snapshot */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            padding: '14px 18px'
          }}
        >
          <div className="mb-3 font-semibold" style={{ fontSize: '12px', color: '#111827' }}>
            Competitor Snapshot
          </div>
          <table style={{ width: '100%', fontSize: '10.5px', lineHeight: '1.3' }}>
            <thead>
              <tr style={{ background: '#F8FAFF' }}>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Brand</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Share</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>MoM</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>D2C%</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rev. YoY</th>
                <th style={{ padding: '5px 8px', textAlign: 'left', fontSize: '8.5px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {competitorData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ borderTop: '1px solid #E5E7EB', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFF'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <td style={{ padding: '5px 8px', color: '#111827', fontWeight: 600 }}>{row.brand}</td>
                  <td style={{ padding: '5px 8px' }}>
                    <div className="flex items-center gap-2">
                      <div
                        style={{
                          width: '44px',
                          height: '4px',
                          background: '#E5E7EB',
                          borderRadius: '2px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${row.share}%`,
                            height: '100%',
                            background: '#007BFF',
                            borderRadius: '2px'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 600 }}>{row.share}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '5px 8px', color: row.mom.startsWith('+') ? '#28A745' : row.mom.startsWith('−') ? '#DC3545' : '#FFC107', fontWeight: 600 }}>{row.mom}</td>
                  <td style={{ padding: '5px 8px', color: '#374151' }}>{row.d2c}</td>
                  <td style={{ padding: '5px 8px', color: row.revYoy.startsWith('+') ? '#28A745' : '#DC3545', fontWeight: 600 }}>{row.revYoy}</td>
                  <td style={{ padding: '5px 8px' }}>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        background: row.status === 'Growing' ? '#DCFCE7' : row.status === 'Stable' ? '#FEF9C3' : '#FEE2E2',
                        color: row.status === 'Growing' ? '#166534' : row.status === 'Stable' ? '#854D0E' : '#991B1B'
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 4: News Feed */}
      <div
        className="rounded-lg"
        style={{
          background: 'white',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          padding: '14px 18px'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold" style={{ fontSize: '12px', color: '#111827' }}>
            CPG News Feed
          </div>
          <div
            onClick={() => navigate('/news-board')}
            className="cursor-pointer"
            style={{ fontSize: '10px', color: '#007BFF', fontWeight: 600 }}
          >
            View all →
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {newsData.map((news, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg cursor-pointer"
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                transition: 'all 0.16s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#007BFF';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,123,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '8.5px', color: '#6B7280', fontWeight: 600 }}>{news.source}</span>
                <span style={{ fontSize: '8.5px', color: '#9CA3AF' }}>·</span>
                <span style={{ fontSize: '8.5px', color: '#9CA3AF' }}>{news.date}</span>
              </div>
              <div className="font-semibold mb-2" style={{ fontSize: '11px', color: '#111827', lineHeight: '1.4' }}>
                {news.headline}
              </div>
              <div className="mb-3" style={{ fontSize: '9px', color: '#6B7280', lineHeight: '1.4' }}>
                {news.summary}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: '7px',
                      fontWeight: 700,
                      background: '#F3E8FF',
                      color: '#7C3AED'
                    }}
                  >
                    {news.region}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: '7px',
                      fontWeight: 700,
                      background: '#E0F2FE',
                      color: '#0369A1'
                    }}
                  >
                    {news.category}
                  </span>
                </div>
                <div style={{ fontSize: '9px', color: '#007BFF', fontWeight: 600 }}>
                  Know more →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
