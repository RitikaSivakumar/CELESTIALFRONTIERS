import { ChatInterface } from '@/components/chatbot/chat-interface';
import { Card, CardContent } from '@/components/ui/card';

export default function ChatbotPage() {
  return (
    <div className="h-[calc(100vh-8rem)] w-full">
      <Card className="h-full w-full flex flex-col">
        <CardContent className="p-0 flex-1">
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  );
}
