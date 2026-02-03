import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, Bot, Loader2, X, Sparkles } from 'lucide-react';
import { createSafetyChat, SafetyChat } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';

// Quick questions for users to get started
const QUICK_QUESTIONS = [
  "What spill pallets do you offer?",
  "Tell me about safety cans",
  "What certifications do your products have?",
  "Do you have emergency showers?",
  "What anti-fatigue mats are available?"
];

export const SafetyAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: MessageRole.MODEL,
      text: "Hello! I'm the Justrite Safety Advisor. Ask me about our plunger cans, oily waste containers, or general industrial safety standards."
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const chatSessionRef = useRef<SafetyChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session once
  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createSafetyChat();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = useCallback(async (quickQuestion?: string) => {
    const messageToSend = quickQuestion || input.trim();
    if (!messageToSend || !chatSessionRef.current || isGenerating) return;

    setInput('');
    setIsGenerating(true);
    setShowQuickQuestions(false); // Hide quick questions after first message

    // Add User Message
    setMessages(prev => [...prev, { role: MessageRole.USER, text: messageToSend }]);

    try {
      // Create a placeholder for the model response
      setMessages(prev => [...prev, { role: MessageRole.MODEL, text: '', isThinking: true }]);

      const stream = await chatSessionRef.current.sendMessage(messageToSend);
      
      let fullText = '';
      
      for await (const chunk of stream) {
         fullText += chunk;
         
         // Update the last message (Model's response) in real-time
         setMessages(prev => {
             const newMessages = [...prev];
             const lastMsg = newMessages[newMessages.length - 1];
             if (lastMsg.role === MessageRole.MODEL) {
                 lastMsg.text = fullText;
                 lastMsg.isThinking = false;
             }
             return newMessages;
         });
      }

    } catch (error) {
      console.error("Chat error", error);
      // Remove the thinking placeholder and add error message
      setMessages(prev => {
        const filtered = prev.filter(m => !(m.role === MessageRole.MODEL && m.isThinking));
        return [...filtered, { role: MessageRole.MODEL, text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us at sales.ro@justrite.com or call 0236 325 301." }];
      });
    } finally {
      setIsGenerating(false);
    }
  }, [input, isGenerating]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <section id="safety-assistant" className="fixed bottom-6 right-6 z-40">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-testid="chat-toggle-btn"
          className="bg-brand-yellow text-brand-black p-4 rounded-full shadow-xl hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 font-bold border-2 border-white group"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Ask Safety AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[90vw] md:w-[400px] h-[500px] flex flex-col border border-gray-200 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-black p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-brand-yellow p-1 rounded-full">
                <Bot className="h-5 w-5 text-brand-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Justrite Safety Advisor</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Powered by Llama 3.1
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm
                    ${msg.role === MessageRole.USER 
                      ? 'bg-brand-black text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}
                  `}
                >
                  {msg.isThinking && msg.text === '' ? (
                    <div className="flex gap-1 h-5 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap markdown-body">
                        {/* Very basic bold rendering */}
                        {msg.text.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about plunger cans..."
                disabled={isGenerating}
                data-testid="chat-input"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow disabled:bg-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isGenerating}
                data-testid="chat-send-btn"
                className="bg-brand-yellow text-brand-black p-2 rounded-full hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              AI can make mistakes. Please verify critical safety info.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
