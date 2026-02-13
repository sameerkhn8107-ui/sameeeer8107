import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Loader2, AlertCircle, Globe } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function LiveSearch({ className = '' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setResults([]);
        setError(null);
        setIsOpen(false);
        return;
      }

      setIsSearching(true);
      setError(null);
      setIsOpen(true);

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        
        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();

        if (data.success) {
          setResults(data.results || []);
          if (data.results.length === 0) {
            setError('No results found');
          }
        } else {
          setError(data.error || 'Search failed');
          setResults([]);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Network error. Please try again.');
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const handleResultClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setQuery('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length >= 2) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    if (query.trim().length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search the web..."
          className="w-full h-12 pl-12 pr-4 rounded-2xl border border-[#EAE7DC] bg-white 
                     focus:border-[#81B29A] focus:ring-2 focus:ring-[#81B29A]/20 
                     placeholder:text-[#9CA3AF] text-[#3D405B] transition-all
                     outline-none"
          data-testid="live-search-input"
        />
        {isSearching && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#81B29A] animate-spin" />
        )}
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query.trim().length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 right-0 max-h-[500px] overflow-y-auto 
                       bg-white rounded-2xl shadow-xl border border-[#EAE7DC] z-50"
          >
            {/* Loading State */}
            {isSearching && results.length === 0 && !error && (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 text-[#81B29A] animate-spin mb-3" />
                <p className="text-[#6D6F7C] text-sm">Searching...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isSearching && (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <AlertCircle className="w-8 h-8 text-[#E07A5F] mb-3" />
                <p className="text-[#3D405B] font-medium mb-1">
                  {error === 'No results found' ? 'No results found' : 'Something went wrong'}
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  {error === 'No results found' 
                    ? 'Try a different search term' 
                    : 'Please check your connection and try again'}
                </p>
              </div>
            )}

            {/* Results List */}
            {!isSearching && !error && results.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">
                  {results.length} {results.length === 1 ? 'Result' : 'Results'}
                </div>
                {results.map((result, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full p-4 rounded-xl hover:bg-[#F4F1DE]/50 
                               transition-colors text-left group"
                    data-testid={`search-result-${index}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-[#81B29A]/10 flex items-center 
                                    justify-center flex-shrink-0 group-hover:bg-[#81B29A]/20 
                                    transition-colors">
                        <Globe className="w-5 h-5 text-[#81B29A]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="text-[#3D405B] font-medium mb-1 line-clamp-1 
                                     group-hover:text-[#E07A5F] transition-colors">
                          {result.title}
                        </h3>

                        {/* Description */}
                        {result.content && (
                          <p className="text-sm text-[#6D6F7C] line-clamp-2 mb-2">
                            {result.content}
                          </p>
                        )}

                        {/* URL */}
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3 text-[#9CA3AF]" />
                          <span className="text-xs text-[#9CA3AF] truncate">
                            {new URL(result.url).hostname}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
