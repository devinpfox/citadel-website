'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Lock, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Password for accessing the presentation
const PRESENTATION_PASSWORD = 'citadelgold';

// Slide data
const slides = [
  {
    id: 1,
    type: 'video',
    title: 'Welcome to Citadel Gold',
    videoSrc: '/CITADEL-GOLD-VIDEO.mp4',
  },
  {
    id: 2,
    type: 'quote',
    title: 'What Experts Say About Gold',
    person: 'Warren Buffett',
    role: 'CEO of Berkshire Hathaway',
    quote: '"Gold is a way of going long on fear. You really have to hope people become more afraid in a year or two years than they are now. And if they become more afraid you make money, if they become less afraid you lose money, but the gold itself doesn\'t produce anything."',
    image: '/placeholder-warren.jpg',
    note: 'While Buffett has been historically skeptical, his company invested $500M in Barrick Gold in 2020.',
  },
  {
    id: 3,
    type: 'quote',
    title: 'What Experts Say About Gold',
    person: 'Ray Dalio',
    role: 'Founder of Bridgewater Associates',
    quote: '"If you don\'t own gold, you know neither history nor economics. Gold is the only financial asset that is not someone else\'s liability. It has maintained its purchasing power for thousands of years."',
    image: '/placeholder-ray.jpg',
    note: 'Dalio recommends 5-10% portfolio allocation to gold.',
  },
  {
    id: 4,
    type: 'quote',
    title: 'What Experts Say About Gold',
    person: 'Robert Kiyosaki',
    role: 'Author of Rich Dad Poor Dad',
    quote: '"Gold and silver are God\'s money. They have been money for thousands of years and will continue to be money when all paper currencies fail. The key is not to save money, but to save real assets."',
    image: '/placeholder-robert.jpg',
    note: 'Kiyosaki has been a longtime advocate for precious metals investment.',
  },
  {
    id: 5,
    type: 'dashboard-demo',
    title: 'Your Investment Dashboard',
    subtitle: 'Easy to Use, Powerful Insights',
    features: [
      { icon: '📊', title: 'Real-Time Pricing', desc: 'See live gold & silver prices updated every minute' },
      { icon: '📈', title: 'Portfolio Tracking', desc: 'Track your holdings and see your gains over time' },
      { icon: '🔔', title: 'Price Alerts', desc: 'Get notified when prices hit your target' },
      { icon: '📱', title: 'Mobile Friendly', desc: 'Access your account anywhere, anytime' },
    ],
  },
  {
    id: 6,
    type: 'client-gains',
    title: 'Client Success Story #1',
    clientName: 'Michael R.',
    clientLocation: 'Austin, TX',
    initialInvestment: 50000,
    currentValue: 78500,
    investmentDate: 'March 2022',
    percentGain: 57,
    holdings: [
      { name: '1 oz Gold American Eagles', quantity: 12, purchasePrice: 1920, currentPrice: 2680 },
      { name: '100 oz Silver Bars', quantity: 3, purchasePrice: 24.50, currentPrice: 32.80 },
      { name: '1 oz Gold Buffalos', quantity: 8, purchasePrice: 1950, currentPrice: 2720 },
    ],
  },
  {
    id: 7,
    type: 'client-gains',
    title: 'Client Success Story #2',
    clientName: 'Sarah & David M.',
    clientLocation: 'Phoenix, AZ',
    initialInvestment: 125000,
    currentValue: 198750,
    investmentDate: 'January 2021',
    percentGain: 59,
    holdings: [
      { name: '1 oz Gold American Eagles', quantity: 25, purchasePrice: 1850, currentPrice: 2680 },
      { name: '10 oz Gold Bars', quantity: 3, purchasePrice: 18200, currentPrice: 26500 },
      { name: '1000 oz Silver Bars', quantity: 2, purchasePrice: 22.30, currentPrice: 32.80 },
    ],
  },
  {
    id: 8,
    type: 'calculator',
    title: 'Investment Calculator',
    subtitle: 'See how your investment could grow',
  },
];

export default function PresentationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Calculator state
  const [calcInvestment, setCalcInvestment] = useState(50000);
  const [calcYears, setCalcYears] = useState(10);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PRESENTATION_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAuthenticated) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, currentSlide]);

  // Password Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Citadel Gold</h1>
            <p className="text-gray-300">Internal Presentation</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  passwordError ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all`}
                placeholder="Enter access code"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">Incorrect password. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white font-semibold rounded-lg hover:from-[#b8860b] hover:to-[#9a7209] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Access Presentation
            </button>
          </form>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  // Render current slide content
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'video':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">{slide.title}</h2>
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                src={slide.videoSrc}
                className="w-full h-full object-contain"
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  onClick={togglePlay}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-gray-400 mt-6 text-center">Click play to start the video, or press the right arrow to continue</p>
          </div>
        );

      case 'quote':
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-12 text-center">{slide.title}</h2>
            <div className="max-w-4xl w-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center flex-shrink-0 shadow-xl">
                  <span className="text-5xl md:text-6xl font-bold text-white">
                    {slide.person?.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xl md:text-2xl text-white italic leading-relaxed mb-6">
                    {slide.quote}
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-xl font-bold text-[#d4af37]">{slide.person}</p>
                    <p className="text-gray-400">{slide.role}</p>
                  </div>
                  {slide.note && (
                    <p className="text-sm text-gray-500 mt-4 italic">{slide.note}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard-demo':
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">{slide.title}</h2>
            <p className="text-xl text-[#d4af37] mb-12">{slide.subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-8">
              {slide.features?.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#d4af37]/50 transition-all hover:transform hover:scale-[1.02]"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Mock Dashboard Preview */}
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">Dashboard Preview</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Gold Price</p>
                  <p className="text-2xl font-bold text-[#d4af37]">$2,680</p>
                  <p className="text-green-400 text-sm">+1.2%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Silver Price</p>
                  <p className="text-2xl font-bold text-gray-300">$32.80</p>
                  <p className="text-green-400 text-sm">+0.8%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Your Portfolio</p>
                  <p className="text-2xl font-bold text-white">$127,450</p>
                  <p className="text-green-400 text-sm">+27.4%</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'client-gains':
        const totalGain = (slide.currentValue ?? 0) - (slide.initialInvestment ?? 0);
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-8 text-center">{slide.title}</h2>

            <div className="max-w-5xl w-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              {/* Client Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{slide.clientName?.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{slide.clientName}</p>
                    <p className="text-gray-400">{slide.clientLocation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Invested Since</p>
                  <p className="text-white font-semibold">{slide.investmentDate}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2">Initial Investment</p>
                  <p className="text-2xl font-bold text-white">${slide.initialInvestment?.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2">Current Value</p>
                  <p className="text-2xl font-bold text-green-400">${slide.currentValue?.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 text-center border border-green-500/30">
                  <p className="text-gray-300 text-sm mb-2">Total Gain</p>
                  <p className="text-2xl font-bold text-green-400">+{slide.percentGain}%</p>
                  <p className="text-green-300 text-sm">+${totalGain.toLocaleString()}</p>
                </div>
              </div>

              {/* Holdings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Holdings Breakdown</h3>
                <div className="space-y-3">
                  {slide.holdings?.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                      <div>
                        <p className="text-white font-medium">{holding.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {holding.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">
                          ${holding.purchasePrice.toLocaleString()} → <span className="text-green-400">${holding.currentPrice.toLocaleString()}</span>
                        </p>
                        <p className="text-green-400 text-sm">
                          +{(((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'calculator':
        const estimatedReturn = calcInvestment * Math.pow(1.08, calcYears);
        const goldReturn = calcInvestment * Math.pow(1.165, calcYears);
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">{slide.title}</h2>
            <p className="text-xl text-[#d4af37] mb-12">{slide.subtitle}</p>

            <div className="max-w-4xl w-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Investment Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        value={calcInvestment}
                        onChange={(e) => setCalcInvestment(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Investment Period: {calcYears} years</label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={calcYears}
                      onChange={(e) => setCalcYears(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                    <div className="flex justify-between text-gray-400 text-sm mt-1">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-1">Traditional Investments (8% avg)</p>
                    <p className="text-2xl font-bold text-white">${Math.round(estimatedReturn).toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/20 rounded-xl p-6 border border-[#d4af37]/30">
                    <p className="text-gray-300 text-sm mb-1">Gold Investment (16.5% historical avg)</p>
                    <p className="text-3xl font-bold text-[#d4af37]">${Math.round(goldReturn).toLocaleString()}</p>
                    <p className="text-green-400 text-sm mt-2">
                      +${Math.round(goldReturn - estimatedReturn).toLocaleString()} more than traditional
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-xs mt-6 text-center">
                * Based on historical averages. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="fixed top-4 right-4 text-white/60 text-sm z-50">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8 pt-12">
        <div className="w-full max-w-7xl">
          {renderSlideContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center gap-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-4 rounded-full transition-all ${
            currentSlide === 0
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20 hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slide Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-[#d4af37]'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`p-4 rounded-full transition-all ${
            currentSlide === slides.length - 1
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white hover:scale-110 shadow-lg'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white/40 text-sm">
        Use arrow keys or spacebar to navigate
      </div>
    </div>
  );
}
