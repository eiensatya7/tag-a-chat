import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export const ChatInput = ({ onSubmit, placeholder = "Ask anything", className = "" }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="pr-12 h-12 text-base border-border bg-card shadow-sm rounded-xl focus:ring-2 focus:ring-chat-primary focus:border-transparent transition-all duration-200"
        />
        <Button
          type="submit"
          disabled={!message.trim()}
          variant="ghost"
          size="sm"
          className="absolute right-2 h-8 w-8 p-0 hover:bg-chat-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};