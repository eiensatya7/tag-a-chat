import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WordTagger } from "./WordTagger";

interface TaggingModalProps {
  isOpen: boolean;
  message: string;
  onComplete: (taggedWords: Record<string, string>) => void;
}

export const TaggingModal = ({ isOpen, message, onComplete }: TaggingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Tag Your Message
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Click on words to assign tags that help categorize the content
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <WordTagger message={message} onTaggingComplete={onComplete} />
        </div>
      </DialogContent>
    </Dialog>
  );
};