import { useState } from 'react';
import { Search as SearchIcon, X, TrendingUp } from 'lucide-react';
import { dummyContent } from '../data';
import { ContentCard } from './ContentCard';
import { motion } from 'motion/react';

export function SearchPage({ onWatch }: { onWatch: (title: string) => void }) {
  const [query, setQuery] = useState('');
  
  const trending = ['Inception', 'Stranger Things', 'Anime', 'Action Movies', 'Squid Game'];
  
  const results = query 
    ? dummyContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.genre.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen pb-24 pt-4 px-4 flex flex-col gap-6"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <SearchIcon size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series, genres..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all shadow-inner"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {!query ? (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl text-gray-300 flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            Trending Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {trending.map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="glass-panel px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl text-gray-300">
            Results for "{query}"
          </h3>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {results.map(item => (
                <div key={item.id} className="w-full">
                  <ContentCard item={item} onWatch={onWatch} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No results found.</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
