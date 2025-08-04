import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown } from "lucide-react";

interface WordTaggerProps {
  message: string;
  onTaggingComplete: (taggedWords: Record<string, string>) => void;
}

const AVAILABLE_TAGS = [
  { value: "person", label: "Person", color: "bg-blue-100 text-blue-800" },
  { value: "place", label: "Place", color: "bg-green-100 text-green-800" },
  { value: "object", label: "Object", color: "bg-purple-100 text-purple-800" },
  { value: "action", label: "Action", color: "bg-orange-100 text-orange-800" },
  { value: "emotion", label: "Emotion", color: "bg-pink-100 text-pink-800" },
  { value: "time", label: "Time", color: "bg-yellow-100 text-yellow-800" },
];

export const WordTagger = ({ message, onTaggingComplete }: WordTaggerProps) => {
  const [wordTags, setWordTags] = useState<Record<string, string>>({});
  const words = message.split(/\s+/).filter(word => word.length > 0);

  const handleTagWord = (wordIndex: number, tag: string) => {
    const word = words[wordIndex];
    setWordTags(prev => ({
      ...prev,
      [word]: tag
    }));
  };

  const removeTag = (word: string) => {
    setWordTags(prev => {
      const updated = { ...prev };
      delete updated[word];
      return updated;
    });
  };

  const getTagForWord = (word: string) => {
    return wordTags[word];
  };

  const getTagDisplay = (tagValue: string) => {
    return AVAILABLE_TAGS.find(tag => tag.value === tagValue);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-lg font-medium text-muted-foreground mb-6">
          Click on words to tag them
        </h2>
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {words.map((word, index) => {
            const tag = getTagForWord(word);
            const tagDisplay = tag ? getTagDisplay(tag) : null;
            
            return (
              <div key={`${word}-${index}`} className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`text-xl px-4 py-3 h-auto font-normal transition-all duration-200 hover:scale-105 ${
                        tag 
                          ? 'bg-chat-selected text-chat-selected-foreground border-chat-selected shadow-md' 
                          : 'hover:bg-chat-hover'
                      }`}
                    >
                      {word}
                      {tag && <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {AVAILABLE_TAGS.map((tagOption) => (
                      <DropdownMenuItem
                        key={tagOption.value}
                        onClick={() => handleTagWord(index, tagOption.value)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{tagOption.label}</span>
                          {tag === tagOption.value && <Check className="h-4 w-4" />}
                        </div>
                      </DropdownMenuItem>
                    ))}
                    {tag && (
                      <>
                        <div className="border-t my-1" />
                        <DropdownMenuItem
                          onClick={() => removeTag(word)}
                          className="cursor-pointer text-destructive"
                        >
                          Remove tag
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                {tagDisplay && (
                  <Badge 
                    variant="secondary" 
                    className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs ${tagDisplay.color}`}
                  >
                    {tagDisplay.label}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={() => onTaggingComplete(wordTags)}
          className="px-8 py-3 bg-chat-primary hover:bg-chat-primary/90 text-chat-primary-foreground rounded-xl font-medium transition-all duration-200 hover:scale-105"
        >
          Continue to Chat
        </Button>
      </div>
    </div>
  );
};