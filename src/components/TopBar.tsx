import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopBarProps {
  onReset: () => void;
}

export const TopBar = ({ onReset }: TopBarProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 max-w-4xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Chat</span>
          </div>

          {/* Right side - Reset button and Profile */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-blue-500 text-white">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};