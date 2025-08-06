import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { WordTagger } from "@/components/WordTagger";
import { ChatMessage } from "@/components/ChatMessage";
import { TaggingModal } from "@/components/TaggingModal";
import { TopBar } from "@/components/TopBar";

type ChatState = 'initial' | 'tagging' | 'chat';

interface Message {
  id: string;
  text: string;
  taggedWords: Record<string, string>;
  timestamp: Date;
}

const Index = () => {
  const [chatState, setChatState] = useState<ChatState>('initial');
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTaggingModal, setShowTaggingModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string>("");

  const handleInitialSubmit = (message: string) => {
    setCurrentMessage(message);
    setChatState('tagging');
  };

  const handleTaggingComplete = (taggedWords: Record<string, string>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      taggedWords,
      timestamp: new Date(),
    };
    setMessages([newMessage]);
    setChatState('chat');
    setCurrentMessage("");
  };

  const handleChatSubmit = (message: string) => {
    setPendingMessage(message);
    setShowTaggingModal(true);
  };

  const handleModalTaggingComplete = (taggedWords: Record<string, string>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: pendingMessage,
      taggedWords,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setShowTaggingModal(false);
    setPendingMessage("");
  };

  const handleReset = () => {
    setChatState('initial');
    setMessages([]);
    setCurrentMessage("");
    setPendingMessage("");
    setShowTaggingModal(false);
  };

  if (chatState === 'initial') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TopBar onReset={handleReset} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl text-center animate-fade-in">
            <h1 className="text-4xl font-semibold mb-8 text-foreground">
              What can I help with?
            </h1>
            <ChatInput 
              onSubmit={handleInitialSubmit} 
              placeholder="Ask anything"
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  if (chatState === 'tagging') {
    return (
      <div className="min-h-screen bg-background">
        <TopBar onReset={handleReset} />
        <div className="animate-slide-up pt-8">
          <div className="w-full max-w-2xl mx-auto px-4 mb-8">
            <ChatInput 
              onSubmit={() => {}} 
              placeholder="Ask anything"
              className="w-full opacity-50 pointer-events-none"
            />
          </div>
          <div className="container mx-auto px-4">
            <WordTagger 
              message={currentMessage} 
              onTaggingComplete={handleTaggingComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar onReset={handleReset} />
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              taggedWords={message.taggedWords}
              isUser={true}
            />
          ))}
        </div>
      </div>
      
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <ChatInput 
            onSubmit={handleChatSubmit} 
            placeholder="Type your message..."
          />
        </div>
      </div>

      <TaggingModal
        isOpen={showTaggingModal}
        message={pendingMessage}
        onComplete={handleModalTaggingComplete}
      />
    </div>
  );
};

export default Index;
