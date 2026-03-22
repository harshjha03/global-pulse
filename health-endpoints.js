import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft } from 'lucide-react';

const NewsBoard = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({ regions: [], categories: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const regions = [
    { name: 'Global', color: '#007BFF' },
    { name: 'South Asia', color: '#7C3AED' },
    { name: 'SEA', color: '#28A745' },
    { name: 'Europe', color: '#B45309' },
    { name: 'USA', color: '#DC3545' },
    { name: 'Middle East', color: '#FFC107' },
    { name: 'East Asia', color: '#065F46' },
    { name: 'Latin America', color: '#EC4899' },
    { name: 'Africa', color: '#8B5CF6' },
    { name: 'Oceania', color: '#14B8A6' }
  ];

  const categories = [
    { name: 'Food & Beverages', color: '#007BFF' },
    { name: 'Personal Care', color: '#7C3AED' },
    { name: 'Health & Wellness', color: '#28A745' },
    { name: 'Home Care', color: '#B45309' },
    { name: 'Baby Care', color: '#DC3545' },
    { name: 'Pet Care', color: '#065F46' }
  ];

  const newsArticles = [
    {
      id: 1,
      source: 'Reuters',
      date: 'Mar 20, 2026',
      headline: 'Pet Care sector sees unprecedented growth in Asian markets',
      summary: 'D2C channels driving 40% of new customer acquisition across SEA region. Premium pet supplements market grows 18% YoY.',
      content: 'The pet care sector in Asia has witnessed remarkable growth, with Southeast Asian markets leading the charge. Direct-to-consumer channels have revolutionized pet product distribution, accounting for 40% of new customer acquisition. Premium pet supplements have emerged as the fastest-growing segment, with an 18% year-over-year increase. Industry experts attribute this growth to rising pet ownership rates, increased disposable income, and growing awareness about pet health and nutrition. The trend is expected to continue through 2026, with projections indicating a potential 25% growth in the premium segment.',
      region: 'SEA',
      category: 'Pet Care',
      tags: ['D2C', 'Growth', 'Premium']
    },
    {
      id: 2,
      source: 'Bloomberg',
      date: 'Mar 19, 2026',
      headline: 'Functional beverages capture millennial spending in India',
      summary: 'Energy and immunity drinks see +34% QoQ adoption among urban consumers aged 25-40.',
      content: 'Functional beverages are experiencing explosive growth in India, particularly among urban millennials. Energy and immunity drinks have seen a 34% quarter-over-quarter adoption increase among consumers aged 25-40. This surge is driven by heightened health consciousness, busy lifestyles, and increased marketing spend by major brands. The segment is projected to reach $2.4B by end of 2026. Key drivers include natural ingredients, low sugar content, and convenient packaging. Major players are launching India-specific formulations targeting regional taste preferences.',
      region: 'South Asia',
      category: 'Food & Beverages',
      tags: ['Millennials', 'Health', 'Urban']
    },
    {
      id: 3,
      source: 'Financial Times',
      date: 'Mar 18, 2026',
      headline: 'Private label penetration hits 18% in European home care',
      summary: 'Cost-conscious buyers shift towards retailer brands amid inflation concerns. Quality perception gap narrows.',
      content: 'European home care markets are witnessing a significant shift toward private label products, with penetration reaching 18% in Q1 2026. Rising inflation and cost-of-living concerns have prompted consumers to explore retailer brands. What\'s remarkable is the narrowing quality perception gap - blind tests show 72% of consumers cannot differentiate between premium branded and private label products. Retailers are investing heavily in R&D and premium positioning for their private labels. The trend is particularly strong in cleaning products, laundry detergents, and paper goods.',
      region: 'Europe',
      category: 'Home Care',
      tags: ['Private Label', 'Cost', 'Inflation']
    },
    {
      id: 4,
      source: 'Wall Street Journal',
      date: 'Mar 17, 2026',
      headline: 'Beauty tech startups raise $2.4B in Q1 2026',
      summary: 'AR try-on and personalized formulation platforms attract major VC interest. AI-powered skin analysis tools gain traction.',
      content: 'Beauty tech startups have raised an impressive $2.4 billion in Q1 2026, signaling strong investor confidence in technology-driven beauty solutions. Augmented reality try-on platforms and personalized formulation technologies are leading the funding rounds. AI-powered skin analysis tools are gaining significant traction, with adoption rates up 156% year-over-year. Major beauty brands are partnering with tech startups to enhance customer experience and reduce product returns. The convergence of beauty and technology is reshaping the entire industry, from product development to retail experience.',
      region: 'Global',
      category: 'Personal Care',
      tags: ['Tech', 'VC', 'Innovation']
    },
    {
      id: 5,
      source: 'Economic Times',
      date: 'Mar 16, 2026',
      headline: 'Health & Wellness TAM crosses $900B milestone',
      summary: 'Preventive care and supplements drive growth across all demographics. Mental wellness products see 22% uptick.',
      content: 'The global Health & Wellness market has crossed the $900 billion threshold, marking a significant milestone in the industry\'s evolution. Preventive care and dietary supplements are primary growth drivers, with mental wellness products experiencing a notable 22% increase. The shift from reactive to proactive health management is evident across all age groups. Digital health tracking, personalized nutrition, and holistic wellness approaches are becoming mainstream. Younger demographics (18-35) are particularly engaged, accounting for 42% of new supplement purchases.',
      region: 'Global',
      category: 'Health & Wellness',
      tags: ['TAM', 'Prevention', 'Mental Health']
    },
    {
      id: 6,
      source: 'CNBC',
      date: 'Mar 15, 2026',
      headline: 'Baby Care brands pivot to sustainability messaging',
      summary: 'Eco-friendly packaging now influences 68% of millennial parent purchases. Carbon-neutral production gains priority.',
      content: 'Baby care brands are undergoing a major transformation, with sustainability becoming a core differentiator. Eco-friendly packaging now influences purchasing decisions for 68% of millennial parents. Brands are racing to achieve carbon-neutral production, with several major players announcing 2027 targets. Biodegradable diapers, plant-based wipes, and refillable packaging are gaining market share rapidly. Consumer surveys indicate that 78% of new parents are willing to pay a 15-20% premium for sustainably produced baby care products. The trend is reshaping product development and marketing strategies across the industry.',
      region: 'USA',
      category: 'Baby Care',
      tags: ['Sustainability', 'Millennials', 'Premium']
    },
    {
      id: 7,
      source: 'Nikkei Asia',
      date: 'Mar 14, 2026',
      headline: 'Japanese skincare brands expand to SE Asian markets',
      summary: 'K-beauty plateau opens door for J-beauty. Minimalist routines resonate with Gen Z consumers.',
      content: 'Japanese skincare brands are making significant inroads into Southeast Asian markets, capitalizing on the K-beauty plateau. The minimalist, science-backed approach of J-beauty is resonating strongly with Gen Z consumers who seek effective, streamlined routines. Major Japanese brands have reported 34% growth in SEA markets in Q1 2026. The trend toward "skinimalism" - using fewer, higher-quality products - aligns perfectly with Japanese beauty philosophy. Brands are adapting formulations for tropical climates while maintaining their core principles of gentle, effective skincare.',
      region: 'East Asia',
      category: 'Personal Care',
      tags: ['J-beauty', 'Gen Z', 'Expansion']
    },
    {
      id: 8,
      source: 'The Guardian',
      date: 'Mar 13, 2026',
      headline: 'Plant-based meat alternatives hit price parity in Europe',
      summary: 'Manufacturing scale-up brings costs down 22%. Taste tests show 84% preference rates vs 2024.',
      content: 'Plant-based meat alternatives have achieved a historic milestone in Europe - price parity with conventional meat products. Manufacturing scale-up and supply chain optimization have brought costs down 22% year-over-year. Equally impressive are blind taste test results showing 84% preference or equivalence ratings compared to just 62% in 2024. The combination of competitive pricing and improved taste is driving mainstream adoption. Grocery retailers report 45% growth in plant-based meat sales, with the segment now accounting for 8% of total meat category revenue.',
      region: 'Europe',
      category: 'Food & Beverages',
      tags: ['Plant-based', 'Price Parity', 'Mainstream']
    },
    {
      id: 9,
      source: 'Reuters Africa',
      date: 'Mar 12, 2026',
      headline: 'African CPG startups attract $420M in venture funding',
      summary: 'Local production, distribution innovation drive investor interest. Mobile commerce enables rural reach.',
      content: 'African CPG startups have attracted $420 million in venture funding in Q1 2026, reflecting growing investor confidence in the continent consumer market potential. Local production capabilities, innovative distribution models, and mobile commerce integration are key factors driving investment. Startups are successfully reaching rural markets through mobile-first platforms and agent networks. The focus on affordable, locally-relevant products is resonating with consumers. Categories showing strongest growth include personal care, processed foods, and home cleaning products.',
      region: 'Africa',
      category: 'Personal Care',
      tags: ['Startups', 'VC', 'Mobile Commerce']
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedFilters.regions.length === 0 ||
      selectedFilters.regions.includes(article.region);
    
    const matchesCategory = selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(article.category);
    
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  if (selectedArticle) {
    return (
      <div className="p-6" style={{ background: '#F8FAFF', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg"
            style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              color: '#007BFF',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={14} />
            Back to News
          </button>

          {/* Article */}
          <div
            className="rounded-lg p-8"
            style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>{selectedArticle.source}</span>
              <span style={{ fontSize: '9px', color: '#9CA3AF' }}>·</span>
              <span style={{ fontSize: '9px', color: '#9CA3AF' }}>{selectedArticle.date}</span>
            </div>

            <h1 className="font-bold mb-4" style={{ fontSize: '24px', color: '#111827', lineHeight: '1.3' }}>
              {selectedArticle.headline}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <span
                className="px-3 py-1 rounded-full"
                style={{
                  fontSize: '8px',
                  fontWeight: 700,
                  background: `${categories.find(c => c.name === selectedArticle.category)?.color}15`,
                  color: categories.find(c => c.name === selectedArticle.category)?.color
                }}
              >
                {selectedArticle.category}
              </span>
              <span
                className="px-3 py-1 rounded-full"
                style={{
                  fontSize: '8px',
                  fontWeight: 700,
                  background: `${regions.find(r => r.name === selectedArticle.region)?.color}15`,
                  color: regions.find(r => r.name === selectedArticle.region)?.color
                }}
              >
                {selectedArticle.region}
              </span>
            </div>

            <p className="mb-6" style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', fontWeight: 600 }}>
              {selectedArticle.summary}
            </p>

            <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.8' }}>
              {selectedArticle.content}
            </p>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 600 }}>Tags:</span>
                {selectedArticle.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded"
                    style={{
                      fontSize: '9px',
                      background: '#F8FAFF',
                      color: '#374151'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5" style={{ background: '#F8FAFF', minHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>
          CPG News Board
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
          Latest insights and developments in consumer packaged goods
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg"
            style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              fontSize: '12px',
              color: '#111827'
            }}
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Region filters */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Filter size={12} style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map(region => {
                const isSelected = selectedFilters.regions.includes(region.name);
                return (
                  <button
                    key={region.name}
                    onClick={() => toggleFilter('regions', region.name)}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: isSelected ? `${region.color}` : 'white',
                      color: isSelected ? 'white' : region.color,
                      border: `1px solid ${region.color}`,
                      fontSize: '9px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {region.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category filters */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Filter size={12} style={{ color: '#6B7280' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const isSelected = selectedFilters.categories.includes(category.name);
                return (
                  <button
                    key={category.name}
                    onClick={() => toggleFilter('categories', category.name)}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: isSelected ? `${category.color}` : 'white',
                      color: isSelected ? 'white' : category.color,
                      border: `1px solid ${category.color}`,
                      fontSize: '9px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {(selectedFilters.regions.length > 0 || selectedFilters.categories.length > 0) && (
        <div className="mb-4 flex items-center gap-2">
          <span style={{ fontSize: '10px', color: '#6B7280' }}>Active filters:</span>
          {[...selectedFilters.regions, ...selectedFilters.categories].map(filter => (
            <span
              key={filter}
              className="px-2 py-1 rounded flex items-center gap-2"
              style={{
                background: '#007BFF',
                color: 'white',
                fontSize: '9px',
                fontWeight: 600
              }}
            >
              {filter}
              <button
                onClick={() => {
                  if (regions.find(r => r.name === filter)) {
                    toggleFilter('regions', filter);
                  } else {
                    toggleFilter('categories', filter);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => setSelectedFilters({ regions: [], categories: [] })}
            style={{ fontSize: '9px', color: '#DC3545', fontWeight: 600, cursor: 'pointer' }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* News grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="p-4 rounded-lg cursor-pointer"
            style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              transition: 'all 0.16s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#007BFF';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,123,255,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>{article.source}</span>
              <span style={{ fontSize: '9px', color: '#9CA3AF' }}>·</span>
              <span style={{ fontSize: '9px', color: '#9CA3AF' }}>{article.date}</span>
            </div>

            <h3 className="font-semibold mb-2" style={{ fontSize: '12px', color: '#111827', lineHeight: '1.4' }}>
              {article.headline}
            </h3>

            <p className="mb-3" style={{ fontSize: '10px', color: '#6B7280', lineHeight: '1.5' }}>
              {article.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: '7px',
                    fontWeight: 700,
                    background: `${regions.find(r => r.name === article.region)?.color}15`,
                    color: regions.find(r => r.name === article.region)?.color
                  }}
                >
                  {article.region}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: '7px',
                    fontWeight: 700,
                    background: `${categories.find(c => c.name === article.category)?.color}15`,
                    color: categories.find(c => c.name === article.category)?.color
                  }}
                >
                  {article.category}
                </span>
              </div>
              <span style={{ fontSize: '9px', color: '#007BFF', fontWeight: 600 }}>Read →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p style={{ fontSize: '14px', color: '#6B7280' }}>No articles found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default NewsBoard;