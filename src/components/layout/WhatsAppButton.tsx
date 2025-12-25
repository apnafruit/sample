import { MessageCircle } from 'lucide-react';
import { openGeneralChat } from '@/lib/whatsapp';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const WhatsAppButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={openGeneralChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-primary-foreground shadow-elevated hover:scale-110 transition-transform flex items-center justify-center animate-float"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" fill="currentColor" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-card">
        <p>Chat with us on WhatsApp</p>
      </TooltipContent>
    </Tooltip>
  );
};
