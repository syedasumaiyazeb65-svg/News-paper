import React, { useState } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = ['All', 'National', 'International', 'Technology', 'Sports', 'Lifestyle'];

  const newsArticles = [
    {
      id: 1,
      title: 'Modern Web Development: React and Tailwind CSS Revolution',
      category: 'Technology',
      time: '10 minutes ago',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Discover how developers are building blazing fast single-page web applications with clean, responsive designs.'
    },
    {
      id: 2,
      title: 'Global Markets Reach New Highs Amid Sustainable Tech Growth',
      category: 'International',
      time: '1 hour ago',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
      excerpt: 'International markets experienced a massive surge today as eco-friendly technology stocks led the trading sessions.'
    },
    {
      id: 3,
      title: 'Exciting Championship Final Scheduled for This Weekend',
      category: 'Sports',
      time: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Fans around the world are gearing up for an unforgettable showdown between the two top-ranked teams.'
    },
    {
      id: 4,
      title: 'Healthy Lifestyle Tips for Busy Professionals in 2026',
      category: 'Lifestyle',
      time: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Simple daily routines and dietary habits to maintain high energy levels and mental focus throughout the week.'
    }
  ];

  const filteredNews = activeCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(item => item.category === activeCategory);

  // Handle Newsletter Form Submit
 
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setSuccessMessage('');

    try {
      const webhookUrl = 'https://sumaiyashop.app.n8n.cloud/webhook/1628ccb4-6d07-4956-86da-6ff5d5867fe4';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setSuccessMessage('Successfully subscribed to ZEB News!');
        setEmail('');
      } else {
        setSuccessMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header / Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold tracking-tight text-blue-600">ZEB NEWS</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold uppercase">Portal</span>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 font-medium">
            Tuesday, September 29, 2026 | Live Updates
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 flex space-x-6 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium whitespace-nowrap transition-colors pb-1 border-b-2 ${
                  activeCategory === cat 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-blue-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breaking News Ticker */}
        <div className="bg-blue-600 text-white rounded-lg p-3 mb-8 flex items-center shadow-md">
          <span className="bg-white text-blue-600 text-xs font-bold px-2.5 py-1 rounded uppercase mr-3 animate-pulse">
            Breaking
          </span>
          <p className="text-sm font-medium truncate">
            React and Tailwind CSS integration allows building ultra-responsive and stunning newspaper interfaces seamlessly!
          </p>
        </div>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 text-white group cursor-pointer">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80" 
                alt="Featured News" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            <div className="relative p-6 md:p-12 flex flex-col justify-end h-[400px]">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full w-max mb-3">
                Featured Story
              </span>
              <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                The Future of Digital Journalism and Automated Content Workflows in 2026
              </h1>
              <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4">
                Exploring how modern frontend frameworks and intelligent cloud environments are transforming the way global news is delivered.
              </p>
              <div className="text-xs text-gray-300 font-medium">Published 30 minutes ago • By Editorial Team</div>
            </div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
            {activeCategory} News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-400">{news.time}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-gray-800 hover:text-blue-600 transition cursor-pointer">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <button className="mt-auto text-blue-600 font-semibold text-xs hover:underline flex items-center">
                    Read Full Story &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <span className="bg-blue-700 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Stay Updated
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-2">
              Subscribe to ZEB News Newsletter
            </h3>
            <p className="text-blue-200 text-sm">
              Get the latest top stories, tech breakthroughs, and exclusive global updates directly in your inbox.
            </p>
          </div>
          
          <div className="md:w-1/2 w-full">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..." 
                required
                className="px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white flex-grow text-sm"
              />
              <button 
                type="submit"
                disabled={submitting}
                className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition text-sm whitespace-nowrap shadow-md cursor-pointer"
              >
                {submitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
            {successMessage && (
              <p className="text-green-300 text-xs mt-2 font-medium">
                {successMessage}
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>&copy; 2026 ZEB News Portal. All rights reserved. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
} 
