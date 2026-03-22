// Consumption Calendar Component
const ConsumptionCalendar = () => {
  const monthlyData = [
    { month: 'Jan', value: 88, color: '#DC3545' },
    { month: 'Feb', value: 92, color: '#FFC107' },
    { month: 'Mar', value: 96, color: '#FFC107' },
    { month: 'Apr', value: 102, color: '#FFC107' },
    { month: 'May', value: 108, color: '#FFC107' },
    { month: 'Jun', value: 124, color: '#28A745' },
    { month: 'Jul', value: 132, color: '#28A745' },
    { month: 'Aug', value: 128, color: '#28A745' },
    { month: 'Sep', value: 112, color: '#FFC107' },
    { month: 'Oct', value: 104, color: '#FFC107' },
    { month: 'Nov', value: 98, color: '#FFC107' },
    { month: 'Dec', value: 94, color: '#FFC107' }
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Consumption Index Chart */}
      <div>
        <div className="mb-4 font-semibold" style={{ fontSize: '14px', color: '#111827' }}>
          Monthly Consumption Index
        </div>

        {/* Peak label */}
        <div className="mb-4 flex justify-center">
          <span
            className="px-4 py-1.5 rounded-full"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              background: 'rgba(0,123,255,0.13)',
              color: '#007BFF'
            }}
          >
            Peak: June–August
          </span>
        </div>

        {/* Line Chart with area fill */}
        <div className="relative" style={{ height: '240px', padding: '20px 10px' }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between" style={{ width: '40px' }}>
            <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'right', paddingRight: '8px' }}>136</div>
            <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'right', paddingRight: '8px' }}>120</div>
            <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'right', paddingRight: '8px' }}>100</div>
            <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'right', paddingRight: '8px' }}>88</div>
          </div>

          {/* Chart area */}
          <div className="ml-10 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: '1px', background: '#F3F4F6' }} />
              ))}
            </div>

            {/* Line chart */}
            <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007BFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#007BFF" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              <path
                d={`M 0,${200 - ((monthlyData[0].value - 80) / 56) * 200} ${monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 100;
                  const y = 200 - ((d.value - 80) / 56) * 200;
                  return `L ${x}%,${y}`;
                }).join(' ')} L 100%,200 L 0,200 Z`}
                fill="url(#areaGradient)"
              />
              
              {/* Line */}
              <path
                d={`M 0,${200 - ((monthlyData[0].value - 80) / 56) * 200} ${monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 100;
                  const y = 200 - ((d.value - 80) / 56) * 200;
                  return `L ${x}%,${y}`;
                }).join(' ')}`}
                fill="none"
                stroke="#007BFF"
                strokeWidth="2.5"
              />
              
              {/* Data points */}
              {monthlyData.map((d, i) => {
                const x = (i / (monthlyData.length - 1)) * 100;
                const y = 200 - ((d.value - 80) / 56) * 200;
                const isPeak = d.value >= 120;
                
                return (
                  <g key={i}>
                    <circle
                      cx={`${x}%`}
                      cy={y}
                      r={isPeak ? "5" : "3.5"}
                      fill={isPeak ? '#007BFF' : 'white'}
                      stroke="#007BFF"
                      strokeWidth="2"
                    />
                    <text
                      x={`${x}%`}
                      y={y - 12}
                      textAnchor="middle"
                      style={{ 
                        fontSize: '10px', 
                        fontWeight: 700, 
                        fill: isPeak ? '#007BFF' : '#6B7280' 
                      }}
                    >
                      {d.value}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between">
              {monthlyData.map((d, i) => (
                <div key={i} style={{ fontSize: '9px', color: '#6B7280', fontWeight: 500 }}>
                  {d.month}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Index - Calendar Style */}
      <div>
        <div className="mb-4 font-semibold" style={{ fontSize: '14px', color: '#111827' }}>
          Seasonal Index (100 = average)
        </div>
        <div className="grid grid-cols-12 gap-3">
          {monthlyData.map((data, idx) => {
            const color = data.value > 110 ? '#28A745' : data.value < 90 ? '#DC3545' : '#FFC107';
            const bgColor = data.value > 110 ? '#DCFCE7' : data.value < 90 ? '#FEE2E2' : '#FEF9C3';
            const isPeak = data.value >= 120;
            
            return (
              <div 
                key={data.month} 
                className="relative rounded-lg p-3 text-center"
                style={{
                  background: isPeak ? 'rgba(0,123,255,0.07)' : bgColor,
                  border: isPeak ? '2px solid #007BFF' : `1px solid ${color}40`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '9px', color: '#6B7280', marginBottom: '6px', fontWeight: 600 }}>
                  {data.month}
                </div>
                <div
                  className="font-bold"
                  style={{
                    fontSize: '18px',
                    color: isPeak ? '#007BFF' : color
                  }}
                >
                  {data.value}
                </div>
                {isPeak && (
                  <div 
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#007BFF', color: 'white', fontSize: '10px' }}
                  >
                    ★
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6" style={{ fontSize: '10px' }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: '#DCFCE7', border: '1px solid #28A74540' }} />
            <span style={{ color: '#6B7280' }}>Above average (&gt;110)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: '#FEF9C3', border: '1px solid #FFC10740' }} />
            <span style={{ color: '#6B7280' }}>Average (90-110)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: '#FEE2E2', border: '1px solid #DC354540' }} />
            <span style={{ color: '#6B7280' }}>Below average (&lt;90)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#007BFF', color: 'white', fontSize: '10px' }}>
              ★
            </div>
            <span style={{ color: '#6B7280' }}>Peak months</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionCalendar;
