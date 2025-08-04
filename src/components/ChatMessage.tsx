import { Badge } from "@/components/ui/badge";

interface ChatMessageProps {
  message: string;
  taggedWords: Record<string, string>;
  isUser?: boolean;
}

const AVAILABLE_TAGS = [
  { value: "person", label: "Person", color: "bg-blue-100 text-blue-800" },
  { value: "place", label: "Place", color: "bg-green-100 text-green-800" },
  { value: "object", label: "Object", color: "bg-purple-100 text-purple-800" },
  { value: "action", label: "Action", color: "bg-orange-100 text-orange-800" },
  { value: "emotion", label: "Emotion", color: "bg-pink-100 text-pink-800" },
  { value: "time", label: "Time", color: "bg-yellow-100 text-yellow-800" },
];

const parseMessageForTagging = (text: string): string[] => {
  // Handle quoted phrases as single words
  const quotedPhrases = text.match(/"[^"]+"|'[^']+'/g) || [];
  let processedText = text;
  
  // Replace quoted phrases with placeholders
  quotedPhrases.forEach((phrase, index) => {
    const placeholder = `__QUOTED_${index}__`;
    processedText = processedText.replace(phrase, placeholder);
  });
  
  // Split by whitespace and process each word
  const words = processedText.split(/\s+/).filter(word => word.length > 0);
  
  // Replace placeholders back with original quoted text (without quotes)
  const finalWords = words.map(word => {
    const quotedIndex = word.match(/__QUOTED_(\d+)__/);
    if (quotedIndex) {
      const originalPhrase = quotedPhrases[parseInt(quotedIndex[1])];
      return originalPhrase.slice(1, -1); // Remove quotes
    }
    // Remove trailing punctuation for regular words
    return word.replace(/[.,!?;:]+$/, '');
  });
  
  return finalWords;
};

export const ChatMessage = ({ message, taggedWords, isUser = true }: ChatMessageProps) => {
  const cleanedWords = parseMessageForTagging(message);
  const displayWords = message.split(/\s+/);
  
  const getTagDisplay = (tagValue: string) => {
    return AVAILABLE_TAGS.find(tag => tag.value === tagValue);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3xl rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-muted/30 text-foreground border border-border'
            : 'bg-muted/20 text-foreground border border-border'
        }`}
      >
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {displayWords.map((word, index) => {
              // Extract the actual word without punctuation and the punctuation separately
              const wordMatch = word.match(/^(["']?)(.+?)(["']?)([.,!?;:]*)$/);
              const leadingQuote = wordMatch ? wordMatch[1] : '';
              const actualWord = wordMatch ? wordMatch[2] : word;
              const trailingQuote = wordMatch ? wordMatch[3] : '';
              const punctuation = wordMatch ? wordMatch[4] : '';
              
              // Find matching cleaned word for tagging
              const cleanedWord = cleanedWords.find(clean => 
                actualWord.toLowerCase() === clean.toLowerCase()
              );
              const tag = cleanedWord ? taggedWords[cleanedWord] : null;
              const tagDisplay = tag ? getTagDisplay(tag) : null;
              
              return (
                <span key={index} className="relative inline-block group">
                  {leadingQuote}
                  <span 
                    className={`relative ${tag ? 'font-medium px-2 py-1 rounded-md bg-primary/20 border border-primary/30' : ''}`}
                    title={tagDisplay ? tagDisplay.label : undefined}
                  >
                    {actualWord}
                    {tagDisplay && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {tagDisplay.label}
                      </span>
                    )}
                  </span>
                  {trailingQuote}
                  {punctuation}
                  {index < displayWords.length - 1 && ' '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};