import React, { useState, useMemo, useEffect, useRef } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import { BookOpenIcon, ChartBarSquareIcon, CheckCircleIcon, CpuChipIcon, CubeIcon, DevicePhoneMobileIcon, DiscordIcon, InstagramIcon, LinkedInIcon, MenuIcon, PhoneIcon, PuzzlePieceIcon, RocketLaunchIcon, ShieldCheckIcon, StarIcon, TelegramIcon, TwitterIcon, WhatsappIcon, XCircleIcon, XMarkIcon, YouTubeIcon } from './icons/Icons';
import { Page } from '../types';

interface IntroPageProps {
  onStart: () => void;
  onNavigatePage: (page: Page) => void;
  onOpenBookingModal: () => void;
}

// Custom hook for scroll-triggered animations
const useScrollAnimation = <T extends Element>(options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (element) {
                    observer.unobserve(element);
                }
            }
        }, { threshold: 0.1, ...options });

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return [ref, isVisible] as const;
};


const DcaCalculatorEmbed: React.FC = () => {
  useEffect(() => {
    // Prevent script from running multiple times due to React StrictMode or HMR
    if (document.getElementById('dca-calculator-root')) {
      return;
    }
    
    let chartScript = document.getElementById('chartjs-dca-dependency') as HTMLScriptElement | null;
    if (!chartScript) {
        chartScript = document.createElement('script');
        chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
        chartScript.id = 'chartjs-dca-dependency';
        document.body.appendChild(chartScript);
    }

    const mainCalculatorScript = () => {
      const script = document.createElement('script');
      script.id = 'dca-calculator-main-script';
      script.innerHTML = `
        (function() {
            const container = document.getElementById('dca-calculator-container');
            if (!container || container.innerHTML.trim() !== '') {
                return;
            }

            const styles = \`
                #dca-calculator-root {
                    --dca-bitcoin-orange: #f7931a;
                    --dca-background-start: #1a1a2e;
                    --dca-text-primary: #e0e0e0;
                    --dca-text-secondary: #a0a0b0;
                    --dca-surface-color: rgba(255, 255, 255, 0.05);
                    --dca-border-color: rgba(255, 255, 255, 0.1);
                }
                #dca-calculator-root * {
                    box-sizing: border-box; margin: 0; padding: 0;
                    font-family: 'Inter', sans-serif;
                }
                #dca-calculator-root {
                    color: var(--dca-text-primary);
                    background-image: radial-gradient(circle at top left, var(--dca-background-start), #16213e);
                    background-color: var(--dca-background-start);
                    width: 100%;
                    max-width: 900px;
                    background: var(--dca-surface-color);
                    border: 1px solid var(--dca-border-color);
                    border-radius: 20px;
                    padding: 2rem 2.5rem;
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                    margin: 2rem auto;
                }
                 #dca-calculator-root h1 {
                    font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5rem;
                    background: -webkit-linear-gradient(45deg, var(--dca-bitcoin-orange), #ffd700);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                #dca-calculator-root .dca-header { text-align: center; margin-bottom: 2.5rem; }
                #dca-calculator-root .dca-header p { color: var(--dca-text-secondary); font-size: 1.1rem; }
                #dca-calculator-root #dca-calculator-form { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; align-items: flex-end; margin-top: 2.5rem; }
                #dca-calculator-root .dca-input-field { display: flex; flex-direction: column; gap: 8px; }
                #dca-calculator-root label { font-size: 0.9rem; color: var(--dca-text-secondary); font-weight: 600; }
                #dca-calculator-root input[type="number"] { background-color: rgba(0,0,0,0.2); border: 1px solid var(--dca-border-color); border-radius: 8px; padding: 12px 16px; color: var(--dca-text-primary); font-size: 1rem; width: 200px; transition: border-color 0.3s, box-shadow 0.3s; }
                #dca-calculator-root input[type="number"]:focus { outline: none; border-color: var(--dca-bitcoin-orange); box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.3); }
                #dca-calculator-root button { background: var(--dca-bitcoin-orange); color: white; border: none; border-radius: 8px; padding: 12px 24px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: transform 0.2s, box-shadow 0.3s; }
                #dca-calculator-root button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(247, 147, 26, 0.4); }
                #dca-calculator-root button:disabled { background-color: #a0a0b0; cursor: not-allowed; transform: none; box-shadow: none; }
                #dca-calculator-root .dca-results-container { position: relative; min-height: 450px; }
                #dca-calculator-root .dca-chart-container { height: 400px; width: 100%; }
                #dca-calculator-root .dca-loader-container { position: absolute; inset: 0; background-color: rgba(0,0,0,0.3); display: flex; justify-content: center; align-items: center; z-index: 10; border-radius: 12px; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
                #dca-calculator-root .dca-loader-container.visible { opacity: 1; visibility: visible; }
                #dca-calculator-root .dca-loader { width: 48px; height: 48px; border: 5px solid var(--dca-text-primary); border-bottom-color: var(--dca-bitcoin-orange); border-radius: 50%; display: inline-block; animation: dca-rotation 1s linear infinite; }
                @keyframes dca-rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                #dca-calculator-root .dca-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 2rem; }
                #dca-calculator-root .dca-summary-card { background: var(--dca-surface-color); border: 1px solid var(--dca-border-color); border-radius: 12px; padding: 20px; text-align: center; transition: transform 0.3s; }
                #dca-calculator-root .dca-summary-card:hover { transform: translateY(-5px); }
                #dca-calculator-root .dca-summary-card h3 { font-size: 1rem; font-weight: 600; color: var(--dca-text-secondary); margin-bottom: 0.75rem; }
                #dca-calculator-root .dca-summary-value { font-size: 1.75rem; font-weight: 700; color: var(--dca-text-primary); line-height: 1.2; }
                #dca-calculator-root .dca-summary-value.btc { color: var(--dca-bitcoin-orange); }
                #dca-calculator-root #dca-error-message { color: #ff6b6b; text-align: center; margin-top: 1rem; display: none; background-color: rgba(255, 107, 107, 0.1); padding: 10px; border-radius: 8px; }
            \`;
            const styleSheet = document.createElement("style");
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
            
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
            document.head.appendChild(fontLink);

            container.innerHTML = \`
                <div id="dca-calculator-root">
                    <header class="dca-header">
                        <h1>Bitcoin DCA Growth Calculator</h1>
                        <p>See how consistent investments in Bitcoin could grow over time.</p>
                    </header>
                    <div class="dca-summary">
                        <div class="dca-summary-card">
                            <h3>Total Invested</h3>
                            <div id="dca-totalInvested" class="dca-summary-value">$0.00</div>
                        </div>
                        <div class="dca-summary-card">
                            <h3>Portfolio Value</h3>
                            <div id="dca-currentValue" class="dca-summary-value">$0.00</div>
                        </div>
                        <div class="dca-summary-card">
                            <h3>Total Bitcoin</h3>
                            <div id="dca-totalBtc" class="dca-summary-value btc">0.0000</div>
                        </div>
                    </div>
                    <div class="dca-results-container">
                        <div class="dca-loader-container" id="dca-loader">
                            <div class="dca-loader"></div>
                        </div>
                        <div class="dca-chart-container">
                            <canvas id="dca-chart"></canvas>
                        </div>
                    </div>
                    <form id="dca-calculator-form" aria-label="Bitcoin investment form">
                        <div class="dca-input-field">
                            <label for="dca-monthlyInvestment">Monthly Investment (USD)</label>
                            <input type="number" id="dca-monthlyInvestment" value="100" min="1" required aria-required="true">
                        </div>
                        <div class="dca-input-field">
                            <label for="dca-months">Number of Months</label>
                            <input type="number" id="dca-months" value="24" min="1" max="120" required aria-required="true">
                        </div>
                        <button type="submit" id="dca-calculate-button">Visualize Growth</button>
                    </form>
                    <div id="dca-error-message" role="alert"></div>
                    <div id="dca-live-price" class="text-center text-sm text-brand-text-secondary mt-4 font-mono"></div>
                </div>
            \`;

            const API_KEY = 'AIzaSyDiwby9_xPcpkEb0rBgLWNQUpImq1pPqsA';
            const SHEET_ID = '1T3IdQSAgRxaoxoWDcy8bXmqUyDo7RhYq77r0jBiMdUw';
            const HISTORICAL_RANGE = 'Sheet1!A2:B';
            const CURRENT_PRICE_CELL = 'Sheet1!D1';

            const form = document.getElementById('dca-calculator-form');
            const monthlyInvestmentEl = document.getElementById('dca-monthlyInvestment');
            const monthsEl = document.getElementById('dca-months');
            const calculateBtn = document.getElementById('dca-calculate-button');
            const loader = document.getElementById('dca-loader');
            const errorMessageEl = document.getElementById('dca-error-message');
            const totalInvestedEl = document.getElementById('dca-totalInvested');
            const currentValueEl = document.getElementById('dca-currentValue');
            const totalBtcEl = document.getElementById('dca-totalBtc');
            const chartCanvas = document.getElementById('dca-chart');
            const chartCtx = chartCanvas.getContext('2d');
            let dcaChart = null;
            
            if (typeof Chart !== 'undefined') {
                Chart.defaults.color = '#e0e0e0';
                Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
                Chart.defaults.font.family = "'Inter', sans-serif";
            }

            const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
            const btcFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 8 });
            
            const showError = (message) => { errorMessageEl.textContent = message; errorMessageEl.style.display = 'block'; };
            const hideError = () => { errorMessageEl.style.display = 'none'; };
            const setUIDisabled = (disabled) => {
                calculateBtn.disabled = disabled;
                loader.classList.toggle('visible', disabled);
            };
            
            const parseSheetDate = (dateString) => {
                const parts = dateString.split('/');
                if (parts.length !== 3) return null;
                const day = parseInt(parts[0], 10), month = parseInt(parts[1], 10) - 1, year = parseInt(parts[2], 10);
                if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
                const date = new Date(year, month, day);
                return (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) ? date : null;
            };

            async function fetchBitcoinPrices() {
                try {
                    const [histRes, currRes] = await Promise.all([
                        fetch(\`https://sheets.googleapis.com/v4/spreadsheets/\${SHEET_ID}/values/\${HISTORICAL_RANGE}?key=\${API_KEY}\`),
                        fetch(\`https://sheets.googleapis.com/v4/spreadsheets/\${SHEET_ID}/values/\${CURRENT_PRICE_CELL}?key=\${API_KEY}\`)
                    ]);
                    if (!histRes.ok || !currRes.ok) throw new Error('Network response was not ok.');
                    const histData = await histRes.json();
                    const currData = await currRes.json();
                    if (!histData.values || !currData.values) throw new Error('Invalid data from API.');
                    const historicalPrices = histData.values.map(([dateStr, priceStr]) => {
                        const price = parseFloat(priceStr);
                        if (!dateStr || isNaN(price)) return null;
                        const date = parseSheetDate(dateStr);
                        return date ? { date, price } : null;
                    }).filter(p => p);
                    if (historicalPrices.length === 0) throw new Error('No valid historical price data found.');
                    const currentPrice = parseFloat(currData.values[0][0]);
                    if (isNaN(currentPrice)) throw new Error('Could not parse current price.');
                    return { historicalPrices, currentPrice };
                } catch (error) {
                    console.error("Google Sheets API Error:", error);
                    throw new Error('Failed to fetch Bitcoin price data. Please check configuration.');
                }
            }

            const calculateDCA = (monthlyInvestment, { historicalPrices, currentPrice }) => {
                let totalInvested = 0, totalBtc = 0;
                const results = historicalPrices.map(record => {
                    totalBtc += monthlyInvestment / record.price;
                    totalInvested += monthlyInvestment;
                    return {
                        label: record.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        invested: totalInvested,
                        value: totalBtc * record.price
                    };
                });
                return {
                    chartLabels: results.map(r => r.label),
                    totalInvestedData: results.map(r => r.invested),
                    portfolioValueData: results.map(r => r.value),
                    summary: { totalInvested, finalPortfolioValue: totalBtc * currentPrice, totalBtc }
                };
            };

            const updateSummary = ({ totalInvested, finalPortfolioValue, totalBtc }) => {
                totalInvestedEl.textContent = currencyFormatter.format(totalInvested);
                currentValueEl.textContent = currencyFormatter.format(finalPortfolioValue);
                totalBtcEl.textContent = \`\${btcFormatter.format(totalBtc)} BTC\`;
            };

            const updateChart = (labels, investedData, valueData) => {
                if (dcaChart) dcaChart.destroy();
                if (!chartCtx || typeof Chart === 'undefined') return;
                dcaChart = new Chart(chartCtx, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            { label: 'Total Invested (USD)', data: investedData, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                            { label: 'Portfolio Value (USD)', data: valueData, borderColor: '#f7931a', backgroundColor: 'rgba(247, 147, 26, 0.1)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 }
                        ]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index' },
                        plugins: { legend: { position: 'top', labels: { font: { size: 14 } } }, tooltip: { callbacks: { label: (c) => \`\${c.dataset.label}: \${currencyFormatter.format(c.parsed.y)}\` } } },
                        scales: { y: { beginAtZero: false, ticks: { callback: (v) => \`$\${Number(v).toLocaleString()}\` } }, x: { grid: { display: false } } }
                    }
                });
            };

            async function handleCalculate(event) {
                if (event) event.preventDefault();
                hideError();
                const monthlyInvestment = parseFloat(monthlyInvestmentEl.value);
                const numMonths = parseInt(monthsEl.value, 10);
                if (isNaN(monthlyInvestment) || isNaN(numMonths) || monthlyInvestment <= 0 || numMonths <= 0) {
                    return showError("Please enter valid positive numbers for all fields.");
                }
                setUIDisabled(true);
                try {
                    const allPriceData = await fetchBitcoinPrices();
                    
                    const livePriceEl = document.getElementById('dca-live-price');
                    if (livePriceEl) {
                        livePriceEl.textContent = \`Live BTC Price: \${currencyFormatter.format(allPriceData.currentPrice)}\`;
                    }

                    if (allPriceData.historicalPrices.length < numMonths) {
                        throw new Error(\`Not enough historical data. Sheet has \${allPriceData.historicalPrices.length} months, you requested \${numMonths}.\`);
                    }
                    const priceDataForCalc = { ...allPriceData, historicalPrices: allPriceData.historicalPrices.slice(-numMonths) };
                    const results = calculateDCA(monthlyInvestment, priceDataForCalc);
                    updateSummary(results.summary);
                    updateChart(results.chartLabels, results.totalInvestedData, results.portfolioValueData);
                } catch (error) {
                    showError(error.message);
                    updateSummary({ totalInvested: 0, finalPortfolioValue: 0, totalBtc: 0 });
                    if (dcaChart) { dcaChart.destroy(); dcaChart = null; }
                } finally {
                    setUIDisabled(false);
                }
            }
            
            form.addEventListener('submit', handleCalculate);
            handleCalculate();
        })();
      `;
      document.body.appendChild(script);
    }
    
    if (typeof (window as any).Chart !== 'undefined') {
      mainCalculatorScript();
    } else {
      chartScript.onload = mainCalculatorScript;
    }

    return () => {
      const mainScript = document.getElementById('dca-calculator-main-script');
      if (mainScript) mainScript.remove();
    };
  }, []);

  return <div id="dca-calculator-container" className="mt-12"></div>;
};

const IntroPage: React.FC<IntroPageProps> = ({ onStart, onNavigatePage, onOpenBookingModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    const [videoRef, videoIsVisible] = useScrollAnimation<HTMLDivElement>();
    const [futureBankRef, futureBankIsVisible] = useScrollAnimation<HTMLElement>();
    const [pain1Ref, pain1IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [pain2Ref, pain2IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [pain3Ref, pain3IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [howItWorksRef, howItWorksIsVisible] = useScrollAnimation<HTMLElement>();
    const [howImgRef, howImgIsVisible] = useScrollAnimation<HTMLDivElement>();
    const [how1Ref, how1IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [how2Ref, how2IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [how3Ref, how3IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [whyLearnRef, whyLearnIsVisible] = useScrollAnimation<HTMLElement>();
    const [testimonialsRef, testimonialsIsVisible] = useScrollAnimation<HTMLElement>();
    const [pricingRef, pricingIsVisible] = useScrollAnimation<HTMLElement>();
    const [price1Ref, price1IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [price2Ref, price2IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [price3Ref, price3IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [price4Ref, price4IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [finalCtaRef, finalCtaIsVisible] = useScrollAnimation<HTMLElement>();

    const pageStyle = {
      backgroundImage: `
        linear-gradient(rgba(16, 20, 31, 0.85), rgba(16, 20, 31, 0.85)),
        url('https://static.wixstatic.com/media/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png/v1/fill/w_1156,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    };

    const socialLinks = [
      { href: "https://x.com/Ax07Crypto", label: "X/Twitter", Icon: TwitterIcon },
      { href: "https://www.youtube.com/@CryptoAX07", label: "YouTube", Icon: YouTubeIcon },
      { href: "https://linktr.ee/ax07", label: "Discord", Icon: DiscordIcon },
      { href: "https://www.instagram.com/cryptoax07/", label: "Instagram", Icon: InstagramIcon },
      { href: "https://www.linkedin.com/company/cryptoax07", label: "LinkedIn", Icon: LinkedInIcon },
      { href: "https://t.me/CryptoAx07", label: "Telegram", Icon: TelegramIcon },
      { href: "https://wa.me/qr/VW746BCARY44C1", label: "Whatsapp", Icon: WhatsappIcon },
    ];

  return (
    <div style={pageStyle} className="text-brand-text font-sans selection:bg-brand-primary/20">
      {/* Header */}
      <header className={`bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50 transition-all duration-300`}>
        <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 relative ${isScrolled ? 'py-1' : 'py-3'}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigatePage('intro'); }} className="flex items-center">
            <img 
              src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" 
              alt="CryptoAX07 Tailored Education Logo"
              className={`w-auto transition-all duration-300 animate-pulse-slow ${isScrolled ? 'h-20' : 'h-28'}`}
            />
          </a>
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={onOpenBookingModal} className="transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">Book a Call</Button>
              <button onClick={onStart} className="font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">
                  Start Learning
              </button>
            </div>
            {/* Menu Button */}
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-white hover:bg-brand-surface">
                {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
        {/* Menu Dropdown */}
        {isMenuOpen && (
           <div className="md:absolute md:top-full md:right-0 md:container md:mx-auto md:px-4 md:flex md:justify-end">
              <div className="animate-fade-in bg-brand-surface/95 backdrop-blur-sm border-t md:border border-gray-700/50 md:mt-2 md:w-64 md:rounded-lg shadow-lg">
                  <nav className="container mx-auto px-4 py-4 flex flex-col items-center md:items-start md:p-4 gap-4">
                      <button onClick={() => { onNavigatePage('intro'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Home</button>
                      <button onClick={() => { onNavigatePage('about'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">About</button>
                      <button onClick={() => { onNavigatePage('resources'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Resources</button>
                      <button onClick={() => { onStart(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Start Learning</button>
                      <button onClick={() => { onOpenBookingModal(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Book a Call</button>
                  </nav>
              </div>
            </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">Tailored Crypto Education with an Expert by Your Side</h1>
            <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
              We are determined to get you over the fear of using crypto and show you how it benefits you. Learn safely with interactive simulations and one-on-one coaching.
            </p>
            <div ref={videoRef} className={`mt-12 max-w-4xl mx-auto transition-all duration-700 ${videoIsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
              <div className="aspect-video rounded-xl shadow-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/kEpWnSzNAlY?autoplay=1&mute=1&loop=1&playlist=kEpWnSzNAlY&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
                  title="CryptoAX07 Logo Reveal"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button onClick={onOpenBookingModal} className="text-lg py-3 px-8 flex items-center gap-2 transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
                  <PhoneIcon className="h-6 w-6"/>
                  Book a Call with a Coach
              </Button>
              <button onClick={onStart} className="font-bold py-3 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center gap-2 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">
                <CheckCircleIcon className="h-6 w-6"/>
                Start Learning with the App
              </button>
            </div>
          </div>
        </section>

        {/* The Future of Banking Section */}
        <section ref={futureBankRef} className={`py-16 md:py-24 transition-opacity duration-1000 ${futureBankIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto"><span className="text-gradient-orange animate-gradient-shift">“The Future of Banking Made Simple”</span></h2>
                <p className="mt-6 text-lg text-brand-text-secondary max-w-3xl mx-auto">
                    Cryptocurrency is shaping the future of finance — from Bitcoin as digital gold to decentralized tools that replace traditional banks. But for many, it feels too complex to begin. thats where we step in. Whether you want to explore crypto through interactive simulations or prefer direct one-on-one guidance, we make your crypto journey seamless and stress-free.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div ref={pain1Ref} className={`transition-all duration-500 ${pain1IsVisible ? 'animate-fade-in' : 'opacity-0'}`}><Card className="p-6 text-left flex items-start gap-4 bg-brand-surface hover:animate-shake"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1"/><span>“I don’t understand how to set up a wallet safely.”</span></Card></div>
                    <div ref={pain2Ref} className={`transition-all duration-500 ${pain2IsVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{transitionDelay: '150ms'}}><Card className="p-6 text-left flex items-start gap-4 bg-brand-surface hover:animate-shake"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1"/><span>“It feels too risky to move my money into crypto.”</span></Card></div>
                    <div ref={pain3Ref} className={`transition-all duration-500 ${pain3IsVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{transitionDelay: '300ms'}}><Card className="p-6 text-left flex items-start gap-4 bg-brand-surface hover:animate-shake"><XCircleIcon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1"/><span>“I want to use crypto, but I don’t have the time to figure it all out myself.”</span></Card></div>
                </div>

                <div className="mt-12 max-w-3xl mx-auto text-left">
                    <p className="text-lg text-brand-text-secondary">
                        👉 With tailored education and 1-to-1 guidance, we cover every aspect of your crypto journey:
                    </p>
                    <ul className="mt-6 space-y-4">
                        <li className="flex items-start gap-3 group"><CheckCircleIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-brand-secondary group-hover:scale-125" /><div><strong className="text-white">Personal Coaching:</strong> Step-by-step guidance through your crypto journey.</div></li>
                        <li className="flex items-start gap-3 group"><CheckCircleIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-brand-secondary group-hover:scale-125" /><div><strong className="text-white">Exchange Onboarding:</strong> Assistance with KYC and setting up accounts on major exchanges.</div></li>
                        <li className="flex items-start gap-3 group"><CheckCircleIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-brand-secondary group-hover:scale-125" /><div><strong className="text-white">Wallet Setup & Security:</strong> Help with secure wallet setup and seed phrase management.</div></li>
                        <li className="flex items-start gap-3 group"><CheckCircleIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-brand-secondary group-hover:scale-125" /><div><strong className="text-white">Financial Education:</strong> Insights on managing and growing your crypto investments.</div></li>
                        <li className="flex items-start gap-3 group"><CheckCircleIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-brand-secondary group-hover:scale-125" /><div><strong className="text-white">Decentralized Finance (DeFi):</strong> Explore top decentralized applications suited to your needs.</div></li>
                    </ul>
                </div>
                
                 <div
                    className="mt-12 rounded-xl py-8"
                    style={{
                        backgroundImage: `linear-gradient(rgba(16, 20, 31, 0.9), rgba(16, 20, 31, 0.9)), url('https://static.wixstatic.com/media/c837a6_5cd80eb0e2be42fc8e64994c898c2293f000.jpg/v1/fill/w_1217,h_590,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/c837a6_5cd80eb0e2be42fc8e64994c898c2293f000.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <DcaCalculatorEmbed />
                </div>
            </div>
        </section>

        {/* How It Works */}
        <section ref={howItWorksRef} className="py-16 md:py-24 bg-brand-surface">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Learn by Doing — with Guidance at Every Step</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text & Cards Column */}
                    <div className="grid grid-cols-1 gap-6">
                        <div ref={how1Ref} className={`transition-all duration-500 ${how1IsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}><Card className="p-6 bg-brand-bg/50 h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg flex items-center gap-6"><DevicePhoneMobileIcon className="h-12 w-12 text-brand-primary flex-shrink-0" /><div className="text-left"><h3 className="text-xl font-bold text-white mb-1">Use the App</h3><p className="text-brand-text-secondary">Interactive crypto lessons with real-world examples and simulations.</p></div></Card></div>
                        <div ref={how2Ref} className={`transition-all duration-500 ${how2IsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '150ms'}}><Card className="p-6 bg-brand-bg/50 h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg flex items-center gap-6"><BookOpenIcon className="h-12 w-12 text-brand-primary flex-shrink-0" /><div className="text-left"><h3 className="text-xl font-bold text-white mb-1">Learn with a Coach</h3><p className="text-brand-text-secondary">Book calls if you get stuck or want personalized advice.</p></div></Card></div>
                        <div ref={how3Ref} className={`transition-all duration-500 ${how3IsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '300ms'}}><Card className="p-6 bg-brand-bg/50 h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg flex items-center gap-6"><RocketLaunchIcon className="h-12 w-12 text-brand-primary flex-shrink-0" /><div className="text-left"><h3 className="text-xl font-bold text-white mb-1">Reach Your Goals</h3><p className="text-brand-text-secondary">From buying your first Bitcoin to exploring DeFi safely.</p></div></Card></div>
                    </div>
                    {/* Image Column */}
                    <div ref={howImgRef} className={`transition-all duration-700 ${howImgIsVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}`}>
                        <img 
                          src="https://static.wixstatic.com/media/4a78c1_eba74c01cf294a3aa898cff4e6914944~mv2.png/v1/crop/x_0,y_0,w_417,h_433/fill/w_494,h_520,fp_0.50_0.50,lg_1,q_85,enc_avif,quality_auto/Dise%C3%B1o%20sin%20t%C3%ADtulo.png"
                          alt="CryptoAX07 coach guiding a student"
                          className="rounded-xl shadow-2xl w-full max-w-md mx-auto md:mx-0 h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
        
        {/* Value Proposition */}
        <section ref={whyLearnRef} className={`py-16 md:py-24 transition-opacity duration-1000 ${whyLearnIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Why Learn with Us?</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <Card className="p-8">
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group"><BookOpenIcon className="h-6 w-6 text-brand-secondary flex-shrink-0 mt-1 transition-transform group-hover:scale-110" /><div><h4 className="font-semibold text-white">Filter the Noise</h4><p className="text-brand-text-secondary">The crypto space is full of noise. We filter it for you, providing clear, concise, and relevant information.</p></div></li>
                            <li className="flex items-start gap-3 group"><ShieldCheckIcon className="h-6 w-6 text-brand-secondary flex-shrink-0 mt-1 transition-transform group-hover:scale-110" /><div><h4 className="font-semibold text-white">Overcome Security Fears</h4><p className="text-brand-text-secondary">Worried about scams and hacks? We teach you best practices to keep your digital assets safe and secure.</p></div></li>
                            <li className="flex items-start gap-3 group"><CpuChipIcon className="h-6 w-6 text-brand-secondary flex-shrink-0 mt-1 transition-transform group-hover:rotate-12" /><div><h4 className="font-semibold text-white">Simplify Complex Topics</h4><p className="text-brand-text-secondary">Blockchain, DeFi, NFTs... can be overwhelming. We break down complex topics into easy-to-understand concepts.</p></div></li>
                            <li className="flex items-start gap-3 group"><ChartBarSquareIcon className="h-6 w-6 text-brand-secondary flex-shrink-0 mt-1 transition-transform group-hover:scale-110" /><div><h4 className="font-semibold text-white">Effective Portfolio Tracking</h4><p className="text-brand-text-secondary">Learn how to monitor your assets effectively, understand your performance, and keep your portfolio organized.</p></div></li>
                        </ul>
                    </Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="p-6 bg-brand-secondary/10 border-brand-secondary/50">
                            <h3 className="text-xl font-bold text-white mb-4">What We Do</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2"><CheckCircleIcon className="h-5 w-5 text-brand-secondary mt-0.5 flex-shrink-0" />Provide comprehensive financial education on cryptocurrencies and DeFi.</li>
                                <li className="flex items-start gap-2"><CheckCircleIcon className="h-5 w-5 text-brand-secondary mt-0.5 flex-shrink-0" />Guide you through the processes of buying, selling, and trading digital assets.</li>
                                <li className="flex items-start gap-2"><CheckCircleIcon className="h-5 w-5 text-brand-secondary mt-0.5 flex-shrink-0" />Introduce you to various DeFi tools and platforms for you to explore.</li>
                                <li className="flex items-start gap-2"><CheckCircleIcon className="h-5 w-5 text-brand-secondary mt-0.5 flex-shrink-0" />Focus on security and risk management.</li>
                            </ul>
                        </Card>
                        <Card className="p-6 bg-red-500/10 border-red-500/50">
                            <h3 className="text-xl font-bold text-white mb-4">What We Don't Do</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2"><XCircleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />Offer any form of financial advice or investment recommendations.</li>
                                <li className="flex items-start gap-2"><XCircleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />Recommend specific cryptocurrencies or financial products. Your decisions are your own.</li>
                                <li className="flex items-start gap-2"><XCircleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />Manage or handle your funds. You are always in full control of your assets.</li>
                                <li className="flex items-start gap-2"><XCircleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />Guarantee profits or returns on any investment.</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} className={`py-16 md:py-24 bg-brand-surface transition-opacity duration-1000 ${testimonialsIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-gradient-orange animate-gradient-shift">What Our Students Say</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-left bg-brand-bg/50 transition-transform duration-300 hover:-translate-y-2">
                <p className="text-brand-text mb-4 italic">“I finally set up my first wallet safely. The app made it simple and the coach answered all my questions!”</p>
                <div className="flex items-center gap-4 group">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Anna R." className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-bold text-white">Anna R.</p>
                    <p className="text-sm text-brand-text-secondary">Beginner Investor</p>
                  </div>
                </div>
              </Card>
              <Card className="p-8 text-left bg-brand-bg/50 transition-transform duration-300 hover:-translate-y-2">
                <p className="text-brand-text mb-4 italic">“The one-on-one calls gave me the confidence to try DeFi on my own. I understand the risks and how to manage them now.”</p>
                <div className="flex items-center gap-4 group">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="James T." className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-bold text-white">James T.</p>
                    <p className="text-sm text-brand-text-secondary">Tech Professional</p>
                  </div>
                </div>
              </Card>
               <Card className="p-8 text-left bg-brand-bg/50 transition-transform duration-300 hover:-translate-y-2">
                <p className="text-brand-text mb-4 italic">“Worth every penny. I avoided costly mistakes thanks to the security lessons and personalized strategy sessions.”</p>
                <div className="flex items-center gap-4 group">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="Maria S." className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-bold text-white">Maria S.</p>
                    <p className="text-sm text-brand-text-secondary">Small Business Owner</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} className={`py-16 md:py-24 transition-opacity duration-1000 ${pricingIsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Choose the Right Plan for You</h2>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
                    <div ref={price1Ref} className={`relative transition-all duration-500 cursor-pointer ${price1IsVisible ? 'animate-pop-in' : 'opacity-0'}`} onClick={onOpenBookingModal}>
                        <div className="absolute top-2 -right-4 bg-brand-primary text-brand-bg px-4 py-1 text-sm font-bold rounded-full transform rotate-12 shadow-lg z-10 animate-subtle-bounce">
                           First Session Free
                        </div>
                        <Card className="p-6 text-center h-full transition-all duration-300 scale-105 animate-pulse-glow-blue border-2 border-brand-primary">
                            <h3 className="text-xl font-bold text-white">Single Session</h3>
                            <p className="text-4xl font-bold my-4">$80</p>
                            <ul className="space-y-2 text-sm text-brand-text-secondary">
                                <li>Specific problem-solving</li>
                                <li>1 live call with an expert</li>
                                <li>No ongoing support</li>
                            </ul>
                        </Card>
                    </div>
                    <div ref={price2Ref} className={`transition-all duration-500 cursor-pointer ${price2IsVisible ? 'animate-pop-in' : 'opacity-0'}`} style={{transitionDelay: '150ms'}} onClick={onOpenBookingModal}><Card className="p-6 text-center h-full transition-all duration-300 hover:scale-105 card-glow-blue-hover"><h3 className="text-xl font-bold text-white">1 Month</h3><p className="text-4xl font-bold my-4">$100<span className="text-base font-normal">/mo</span></p><ul className="space-y-2 text-sm text-brand-text-secondary"><li>Continuous help for 30 days</li><li>24/7 assistance</li><li>1 live session per week</li></ul></Card></div>
                    <div ref={price3Ref} className={`transition-all duration-500 cursor-pointer ${price3IsVisible ? 'animate-pop-in' : 'opacity-0'}`} style={{transitionDelay: '300ms'}} onClick={onOpenBookingModal}><Card className="p-6 text-center h-full transition-all duration-300 hover:scale-105 card-glow-blue-hover"><h3 className="text-xl font-bold text-white">6 Months</h3><p className="text-4xl font-bold my-4">$500</p><p className="text-sm font-semibold text-brand-text-secondary -mt-4 mb-4">≈ $83/month</p><ul className="space-y-2 text-sm text-brand-text-secondary"><li>Continuous help for 6 months</li><li>24/7 assistance</li><li>1 live session per week</li></ul></Card></div>
                    <div ref={price4Ref} className={`transition-all duration-500 cursor-pointer ${price4IsVisible ? 'animate-pop-in' : 'opacity-0'}`} style={{transitionDelay: '450ms'}} onClick={onOpenBookingModal}><Card className="p-6 text-center border-2 border-brand-orange relative transition-all duration-300 hover:scale-105 card-glow-orange-hover"><div className="absolute top-0 right-4 -mt-4 bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><StarIcon className="h-4 w-4"/>Best Value</div><h3 className="text-xl font-bold text-white">1 Year</h3><p className="text-4xl font-bold my-4 text-brand-orange">$800</p><p className="text-sm font-semibold text-brand-text-secondary -mt-4 mb-4">≈ $67/month</p><ul className="space-y-2 text-sm text-brand-text-secondary"><li>Continuous help for 12 months</li><li>24/7 assistance</li><li>1 live session per week</li></ul></Card></div>
                </div>
            </div>
        </section>
        
        {/* Final CTA */}
        <section 
          ref={finalCtaRef} 
          className={`py-16 md:py-24 bg-cover bg-center transition-opacity duration-1000 ${finalCtaIsVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(26, 32, 44, 0.8), rgba(26, 32, 44, 0.8)), url('https://static.wixstatic.com/media/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png/v1/fill/w_1156,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png')`,
          }}
        >
            <div className="container mx-auto px-4 text-center">
                <div
                  role="img"
                  aria-label="CryptoAX07 Coach"
                  className="h-64 w-64 rounded-full bg-brand-surface/50 bg-no-repeat mx-auto mb-6 shadow-lg border-4 border-brand-surface"
                  style={{
                    backgroundImage: `url('https://static.wixstatic.com/media/4a78c1_a8c4d304c7a7403ea0167bfe07a2af8e~mv2.jpg/v1/fill/w_1156,h_428,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_a8c4d304c7a7403ea0167bfe07a2af8e~mv2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Start Your Crypto Journey <span className="inline-block animate-pulse-slow">Today</span></h2>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button onClick={onOpenBookingModal} className="text-lg py-3 px-8 flex items-center gap-2 transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
                        <PhoneIcon className="h-6 w-6"/>
                        Book a Call with a Coach
                    </Button>
                    <button onClick={onStart} className="font-bold py-3 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center gap-2 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">
                        <CheckCircleIcon className="h-6 w-6"/>
                        Start Learning with the App
                    </button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-brand-surface border-t border-gray-700/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left Side: Social & Nav Links */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-16">
            <div className="flex flex-col items-center md:items-start">
              <p className="font-semibold text-white mb-4">Follow Us</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                 {socialLinks.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-text-secondary hover:text-brand-primary transition-colors" aria-label={`Follow us on ${label}`}>
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
             <div className="flex flex-col items-center md:items-start">
              <p className="font-semibold text-white mb-4">Navigation</p>
              <nav className="flex flex-col items-center md:items-start gap-2 text-brand-text-secondary">
                  <button onClick={() => onNavigatePage('intro')} className="hover:text-brand-primary transition-colors text-left">Home</button>
                  <button onClick={() => onNavigatePage('about')} className="hover:text-brand-primary transition-colors text-left">About</button>
                  <button onClick={() => onNavigatePage('resources')} className="hover:text-brand-primary transition-colors text-left">Resources</button>
                  <button onClick={onStart} className="hover:text-brand-primary transition-colors text-left">Start Learning</button>
                  <button onClick={onOpenBookingModal} className="hover:text-brand-primary transition-colors">Book a Call</button>
              </nav>
            </div>
          </div>

          {/* Right Side: Existing Content */}
          <div className="flex flex-col items-center text-center">
            <a href="https://www.cryptoax07.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
              <img 
                src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" 
                alt="CryptoAX07 Logo"
                className="h-28 w-auto"
              />
            </a>
            <div className="max-w-md">
                <p className="text-brand-text-secondary mb-4 text-sm">
                Join a seasoned expert with over seven years of experience in the cryptocurrency and blockchain space and learn how take advantage of this technology that is revolutionizing the world.
                </p>
                <p className="text-xs text-gray-500">
                None of the content can be considered financial advice, it is intended for educational purposes only.
                </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;