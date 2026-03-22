import { useState, useContext, useRef, useEffect } from 'react';
import { X, Send, Smile } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../App';
import { toast } from 'sonner';

const TotoButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Toto, your CPG Intelligence Agent. Ask me about market metrics, category performance, or regional insights."
    },
    {
      role: 'user',
      content: "What's the YoY growth rate for Health & Wellness in South Asia?"
    },
    {
      role: 'assistant',
      content: "South Asia H&W: +14.6% YoY. TAM: $1.1T. Whitespace: 0.44. SKU survival: 12%. Beta: 1.41 (higher volatility). Strong growth driven by preventive health trend and urban expansion."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Demo mode: return contextual canned responses
    await new Promise(resolve => setTimeout(resolve, 900));
    const lowerMsg = userMessage.toLowerCase();
    let reply = '';
    if (lowerMsg.includes('growth') || lowerMsg.includes('yoy') || lowerMsg.includes('trend')) {
      reply = 'Global CPG YoY: +6.2%. Top performers — Health & Wellness: +14.6%, Baby Care: +11.2%, Pet Care: +9.8%. Laggards — Home Care: +2.1%. Asia-Pacific leads at +8.4% vs. Europe at +2.7%.';
    } else if (lowerMsg.includes('india') || lowerMsg.includes('south asia')) {
      reply = 'India CPG TAM: ₹1,100B. Growth: 6.5–8% YoY. Opportunity score: 90/100. Urban FMCG penetration: 74%. Rural whitespace: 0.61. D2C share rising — up 340bps YoY.';
    } else if (lowerMsg.includes('health') || lowerMsg.includes('wellness')) {
      reply = 'Health & Wellness global: $420B TAM. YoY: +14.6%. SKU survival rate: 12%. Volatility beta: 1.41. South Asia fastest-growing sub-region. Preventive health driving 60% of new launches.';
    } else if (lowerMsg.includes('food') || lowerMsg.includes('beverage')) {
      reply = 'Food & Beverages: $680B global TAM. Functional beverages +34% QoQ in India. Private label penetration at 22% in Europe. Plant-based segment: +18% YoY. Pricing power index: 0.78.';
    } else if (lowerMsg.includes('market') || lowerMsg.includes('size') || lowerMsg.includes('tam')) {
      reply = 'Global CPG TAM: $2.3T. Top markets — USA: $1,800B, India: $1,100B, Germany: $600B, Brazil: $450B. Fastest growing: Vietnam (+7–9%), Indonesia (+6–7%). Consolidated opportunity score avg: 82.';
    } else {
      reply = 'CPG Intelligence summary: Global market +6.2% YoY. Health & Wellness leads growth at +14.6%. Asia-Pacific highest opportunity region. D2C disruption accelerating across all categories. Whitespace index highest in SEA and South Asia.';
    }

    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <div
        className="fixed z-[500]"
        style={{
          bottom: '22px',
          right: '22px'
        }}
      >
        {!isOpen && (
          <div className="flex flex-col items-center gap-2">
            <div
              className="px-3 py-1 rounded-full"
              style={{
                background: 'white',
                border: '1px solid rgba(0,123,255,0.22)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#007BFF'
              }}
            >
              Ask Toto
            </div>
            <button
              data-testid="toto-button"
              onClick={() => setIsOpen(true)}
              className="rounded-full flex items-center justify-center"
              style={{
                width: '46px',
                height: '46px',
                background: '#007BFF',
                boxShadow: '0 4px 16px rgba(0,123,255,0.4)',
                animation: 'toto-pulse 2.2s infinite',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.animation = 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.animation = 'toto-pulse 2.2s infinite';
              }}
            >
              <Smile size={24} color="white" />
            </button>
          </div>
        )}
      </div>

      {/* Drawer */}
      {isOpen && (
        <div
          data-testid="toto-drawer"
          className="fixed right-0 top-0 h-full flex flex-col"
          style={{
            width: '320px',
            background: '#FFFFFF',
            borderLeft: '1px solid #E5E7EB',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
            zIndex: 1000,
            transform: 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4"
            style={{
              height: '56px',
              borderBottom: '1px solid #E5E7EB'
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '32px',
                  height: '32px',
                  background: '#007BFF'
                }}
              >
                <Smile size={18} color="white" />
              </div>
              <div>
                <div className="font-bold" style={{ fontSize: '12px', color: '#111827' }}>
                  Toto
                </div>
                <div style={{ fontSize: '9px', color: '#6B7280' }}>
                  CPG Intelligence Agent
                </div>
              </div>
            </div>
            <button
              data-testid="toto-close"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <X size={18} style={{ color: '#6B7280' }} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2"
                  style={{
                    background: msg.role === 'user' ? 'rgba(0,123,255,0.13)' : '#F8FAFF',
                    border: msg.role === 'user' ? '1px solid rgba(0,123,255,0.22)' : '1px solid #E5E7EB',
                    borderRadius: msg.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                    fontSize: '11px',
                    lineHeight: '1.5',
                    color: '#111827'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2"
                  style={{
                    background: '#F8FAFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px 10px 10px 2px',
                    fontSize: '11px',
                    color: '#6B7280'
                  }}
                >
                  Analyzing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-3"
            style={{
              borderTop: '1px solid #E5E7EB'
            }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                border: '1px solid #E5E7EB'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#007BFF';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <input
                type="text"
                data-testid="toto-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about CPG metrics..."
                disabled={loading}
                className="flex-1 outline-none"
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '11px',
                  color: '#111827'
                }}
              />
              <button
                data-testid="toto-send"
                onClick={handleSend}
                disabled={loading || !message.trim()}
                className="rounded p-1.5"
                style={{
                  background: '#007BFF',
                  cursor: loading || !message.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !message.trim() ? 0.5 : 1
                }}
              >
                <Send size={14} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes toto-pulse {
          0%, 100% {
            box-shadow: 0 4px 16px rgba(0,123,255,0.35);
          }
          50% {
            box-shadow: 0 4px 28px rgba(0,123,255,0.65);
          }
        }
      `}</style>
    </>
  );
};

export default TotoButton;
