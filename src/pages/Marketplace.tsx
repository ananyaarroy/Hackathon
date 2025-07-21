import React, { useState } from 'react';
import { ShoppingCart, Star, Zap, Leaf, DollarSign, Clock, Award, TrendingUp } from 'lucide-react';

interface MarketplaceItem {
  id: string;
  name: string;
  category: 'hardware' | 'software' | 'service' | 'credits';
  price: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  savings: number;
  paybackPeriod: number;
  carbonReduction: number;
  vendor: string;
  image: string;
  inStock: boolean;
  trending: boolean;
}

const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'AI-Powered Smart Grid Controller',
    category: 'hardware',
    price: 15999,
    rating: 4.8,
    reviews: 247,
    description: 'Advanced grid management system with machine learning optimization for industrial facilities.',
    features: ['Real-time load balancing', 'Predictive maintenance', 'Grid stability optimization', '99.9% uptime'],
    savings: 125000,
    paybackPeriod: 1.2,
    carbonReduction: 2500,
    vendor: 'GridTech Solutions',
    image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg',
    inStock: true,
    trending: true
  },
  {
    id: '2',
    name: 'Carbon Credit Portfolio - Verified',
    category: 'credits',
    price: 45,
    rating: 4.9,
    reviews: 1847,
    description: 'Premium verified carbon credits from renewable energy and reforestation projects.',
    features: ['Verified by Gold Standard', 'Immediate delivery', 'Blockchain tracked', 'ESG compliant'],
    savings: 0,
    paybackPeriod: 0,
    carbonReduction: 1,
    vendor: 'CarbonZero Exchange',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
    inStock: true,
    trending: false
  },
  {
    id: '3',
    name: 'Energy Analytics Pro Suite',
    category: 'software',
    price: 2999,
    rating: 4.7,
    reviews: 892,
    description: 'Comprehensive energy analytics platform with AI-driven insights and automated reporting.',
    features: ['Multi-sector analytics', 'Custom dashboards', 'API integration', '24/7 support'],
    savings: 45000,
    paybackPeriod: 0.8,
    carbonReduction: 850,
    vendor: 'EnergyAI Corp',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    inStock: true,
    trending: true
  },
  {
    id: '4',
    name: 'Industrial IoT Sensor Network',
    category: 'hardware',
    price: 8499,
    rating: 4.6,
    reviews: 456,
    description: 'Wireless sensor network for comprehensive energy monitoring across industrial facilities.',
    features: ['100+ sensors included', 'Wireless mesh network', 'Real-time monitoring', '5-year warranty'],
    savings: 75000,
    paybackPeriod: 1.4,
    carbonReduction: 1200,
    vendor: 'IndustrialIoT Inc',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
    inStock: true,
    trending: false
  },
  {
    id: '5',
    name: 'ESG Compliance Consulting',
    category: 'service',
    price: 12500,
    rating: 4.9,
    reviews: 234,
    description: 'Expert consulting services for ESG compliance and sustainability reporting.',
    features: ['ESG assessment', 'Compliance roadmap', 'Report generation', 'Ongoing support'],
    savings: 0,
    paybackPeriod: 0,
    carbonReduction: 0,
    vendor: 'Sustainability Partners',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    inStock: true,
    trending: true
  },
  {
    id: '6',
    name: 'Smart Building Automation Kit',
    category: 'hardware',
    price: 5999,
    rating: 4.5,
    reviews: 678,
    description: 'Complete building automation solution for commercial properties with energy optimization.',
    features: ['HVAC control', 'Lighting automation', 'Occupancy sensing', 'Mobile app'],
    savings: 35000,
    paybackPeriod: 2.1,
    carbonReduction: 650,
    vendor: 'SmartBuild Tech',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
    inStock: false,
    trending: false
  }
];

export const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'savings'>('rating');
  const [cart, setCart] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'software', label: 'Software' },
    { id: 'service', label: 'Services' },
    { id: 'credits', label: 'Carbon Credits' }
  ];

  const filteredItems = mockMarketplaceItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'savings':
          return b.savings - a.savings;
        default:
          return 0;
      }
    });

  const addToCart = (itemId: string) => {
    setCart(prev => [...prev, itemId]);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <ShoppingCart className="w-8 h-8 mr-3 text-emerald-500" />
            Energy Solutions Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Discover cutting-edge solutions to optimize your energy performance
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg">
            <span className="font-medium">{cart.length} items in cart</span>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors
                             ${selectedCategory === category.id
                               ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                               : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                             }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-lg text-gray-900 dark:text-white text-sm"
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
              <option value="savings">Savings Potential</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🚀 Limited Time: AI Revolution Sale</h2>
            <p className="text-emerald-100 mb-4">
              Get 30% off all AI-powered energy solutions. Transform your operations with cutting-edge technology.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Verified Solutions</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>48h Implementation</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Guaranteed ROI</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">30% OFF</div>
            <div className="text-emerald-200">Ends in 5 days</div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                       hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.trending && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  🔥 Trending
                </div>
              )}
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {item.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize
                               ${item.category === 'hardware' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                                 item.category === 'software' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' :
                                 item.category === 'service' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' :
                                 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                               }`}>
                  {item.category}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(item.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {item.savings > 0 && (
                  <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-600 dark:text-gray-400">Savings</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(item.savings)}
                    </div>
                  </div>
                )}
                
                {item.carbonReduction > 0 && (
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Leaf className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-600 dark:text-gray-400">CO₂ Reduction</div>
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">
                      {item.carbonReduction} kg/year
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Features:</div>
                <ul className="space-y-1">
                  {item.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(item.price)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    by {item.vendor}
                  </div>
                </div>
                
                <button
                  onClick={() => addToCart(item.id)}
                  disabled={!item.inStock || cart.includes(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm
                             ${item.inStock && !cart.includes(item.id)
                               ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                               : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                             }`}
                >
                  {cart.includes(item.id) ? 'Added' : item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need Custom Solutions?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Our team of energy experts can design custom solutions tailored to your specific needs. 
          Get a free consultation and discover how to maximize your energy efficiency and sustainability goals.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
            Schedule Consultation
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};