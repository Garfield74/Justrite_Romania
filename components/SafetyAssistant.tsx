import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, Bot, Loader2, X, Sparkles, RotateCcw } from 'lucide-react';
import { createSafetyChat, SafetyChat } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { useLanguage, translations } from '../i18n';

// LocalStorage key for chat history
const CHAT_HISTORY_KEY = 'justrite_chat_history';

// Load chat history from localStorage
const loadChatHistory = (welcomeText: string): ChatMessage[] => {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure all messages have valid text strings
        const validMessages = parsed.map((msg: any) => ({
          role: msg.role as MessageRole,
          text: String(msg.text || ''),
          isThinking: false
        })).filter((msg: ChatMessage) => msg.text.length > 0);
        
        if (validMessages.length > 0) {
          return validMessages;
        }
      }
    }
  } catch (e) {
    console.error('Failed to load chat history:', e);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  }
  return [{ role: MessageRole.MODEL, text: welcomeText }];
};

// Save chat history to localStorage
const saveChatHistory = (messages: ChatMessage[]) => {
  try {
    // Only save if we have actual conversation (more than welcome message)
    if (messages.length > 1) {
      // Serialize only necessary fields
      const toSave = messages.map(m => ({
        role: m.role,
        text: m.text
      }));
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(toSave));
    }
  } catch (e) {
    console.error('Failed to save chat history:', e);
  }
};

export const SafetyAssistant: React.FC = () => {
  const { language } = useLanguage();
  const t = translations.chatbot;
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChatHistory(t.welcomeMessage[language]));
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const chatSessionRef = useRef<SafetyChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historyRestoredRef = useRef(false);

  // Quick questions based on language
  const quickQuestions = [
    t.quickQuestions.q1[language],
    t.quickQuestions.q2[language],
    t.quickQuestions.q3[language],
    t.quickQuestions.q4[language],
    t.quickQuestions.q5[language],
  ];

  // Initialize Chat Session and restore history
  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createSafetyChat();
      
      // Restore conversation history to the chat session (skip welcome message)
      if (!historyRestoredRef.current && messages.length > 1) {
        const historyToRestore = messages.slice(1).filter(m => !m.isThinking);
        chatSessionRef.current.restoreHistory(historyToRestore);
        historyRestoredRef.current = true;
        setShowQuickQuestions(false); // Hide quick questions if we have history
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    const messagesToSave = messages.filter(m => !m.isThinking);
    saveChatHistory(messagesToSave);
    
    // Hide quick questions if we have conversation history
    if (messages.length > 1) {
      setShowQuickQuestions(false);
    }
  }, [messages]);

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
        return [...filtered, { role: MessageRole.MODEL, text: t.errorMessage[language] }];
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

  // Clear chat history and start fresh
  const handleClearChat = () => {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    setMessages([WELCOME_MESSAGE]);
    setShowQuickQuestions(true);
    // Reset the chat session
    chatSessionRef.current = createSafetyChat();
    historyRestoredRef.current = false;
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
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button 
                  onClick={handleClearChat}
                  data-testid="clear-chat-btn"
                  title="Start new conversation"
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
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
            
            {/* Quick Questions Section */}
            {showQuickQuestions && messages.length === 1 && !isGenerating && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500 px-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Try asking:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      data-testid={`quick-question-${idx}`}
                      className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-black transition-all duration-200 shadow-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
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
