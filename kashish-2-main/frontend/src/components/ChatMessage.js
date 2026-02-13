import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { User, GraduationCap, Languages, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

export const ChatMessage = ({ message, isLast, userName, activeMode }) => {
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;
  const sources = message.sources || [];
  const [sourcesExpanded, setSourcesExpanded] = useState(false);

  const getAIBubbleStyle = () => {
    if (activeMode === 'learn') {
      return 'bg-[#81B29A]/10 text-[#3D405B] border border-[#81B29A]/20';
    }
    if (activeMode === 'english') {
      return 'bg-[#E07A5F]/10 text-[#3D405B] border border-[#E07A5F]/20';
    }
    if (activeMode === 'startup') {
      return 'bg-[#F2CC8F]/10 text-[#3D405B] border border-[#F2CC8F]/30';
    }
    return 'bg-[#F4F1DE] text-[#3D405B] shadow-sm';
  };

  const getAIAvatar = () => {
    if (activeMode === 'learn') {
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#81B29A]/20 flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-[#81B29A]" />
        </div>
      );
    }
    if (activeMode === 'english') {
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E07A5F]/20 flex items-center justify-center">
          <Languages className="w-4 h-4 text-[#E07A5F]" />
        </div>
      );
    }
    if (activeMode === 'startup') {
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F2CC8F]/20 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-[#D4A84B]" />
        </div>
      );
    }
    return (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#81B29A]/20 flex items-center justify-center">
        <span className="text-[#81B29A] font-semibold text-sm">N</span>
      </div>
    );
  };

  // Function to render content with inline source badges
  const renderContentWithSources = (content) => {
    if (!sources.length) {
      return content;
    }

    // Split content by potential source markers like [1], [2], etc.
    const parts = content.split(/(\[\d+\])/g);
    
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const sourceIndex = parseInt(match[1]) - 1;
        const source = sources[sourceIndex];
        
        if (source) {
          return (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-5 h-5 mx-0.5 text-[10px] 
                       font-medium text-[#81B29A] bg-[#81B29A]/10 hover:bg-[#81B29A]/20 
                       rounded border border-[#81B29A]/30 hover:border-[#81B29A] 
                       transition-all cursor-pointer no-underline align-baseline"
              title={source.title}
              data-testid={`inline-source-${sourceIndex}`}
            >
              {match[1]}
            </a>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}
      data-testid={`chat-message-${message.id}`}
    >
      <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && getAIAvatar()}

        <div
          className={`
            relative max-w-[80%] px-5 py-3.5 rounded-2xl
            ${isUser 
              ? 'bg-[#E07A5F] text-white rounded-tr-sm' 
              : `${getAIBubbleStyle()} rounded-tl-sm`
            }
          `}
        >
          <div className="font-['Plus_Jakarta_Sans'] text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {isUser ? message.content : renderContentWithSources(message.content)}
            {isTyping && (
              <span className="inline-flex ml-1">
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce mx-0.5" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E07A5F]/20 flex items-center justify-center">
            <span className="text-[#E07A5F] font-semibold text-sm">
              {userName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </span>
          </div>
        )}
      </div>

      {/* Collapsible Sources Button */}
      {!isUser && sources.length > 0 && (
        <div className="ml-12">
          <button
            onClick={() => setSourcesExpanded(!sourcesExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6D6F7C] 
                     hover:text-[#3D405B] bg-white hover:bg-[#F4F1DE] border border-[#EAE7DC] 
                     rounded-lg transition-all"
            data-testid="sources-toggle-btn"
          >
            {sourcesExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            <span>{sources.length} {sources.length === 1 ? 'Source' : 'Sources'}</span>
          </button>

          {/* Expandable Sources List */}
          <AnimatePresence>
            {sourcesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 overflow-hidden"
              >
                <div className="bg-white border border-[#EAE7DC] rounded-lg divide-y divide-[#EAE7DC]">
                  {sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F1DE]/50 
                               transition-colors group"
                      data-testid={`source-item-${index}`}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded bg-[#81B29A]/10 
                                    flex items-center justify-center text-xs font-medium 
                                    text-[#81B29A]">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#3D405B] group-hover:text-[#81B29A] 
                                      line-clamp-1 transition-colors">
                          {source.title}
                        </div>
                        <div className="text-xs text-[#9CA3AF] truncate">
                          {new URL(source.url).hostname}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};
