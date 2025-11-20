export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
  isThinking?: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}
