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

export const ChatMessage = ({ message, taggedWords, isUser = true }: ChatMessageProps) => {
  const words = message.split(/\s+/);
  
  const getTagDisplay = (tagValue: string) => {
    return AVAILABLE_TAGS.find(tag => tag.value === tagValue);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3xl rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-chat-primary text-chat-primary-foreground'
            : 'bg-card border border-border'
        }`}
      >
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {words.map((word, index) => {
              const tag = taggedWords[word];
              const tagDisplay = tag ? getTagDisplay(tag) : null;
              
              return (
                <span key={index} className="relative inline-block">
                  <span className={tag ? 'font-medium' : ''}>{word}</span>
                  {tagDisplay && (
                    <Badge 
                      variant="secondary" 
                      className={`ml-1 text-xs ${tagDisplay.color}`}
                    >
                      {tagDisplay.label}
                    </Badge>
                  )}
                  {index < words.length - 1 && ' '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};