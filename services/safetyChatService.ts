export class SafetyChat {
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  async sendMessage(message: string, language: string): Promise<AsyncIterable<string>> {
    const response = await fetch('/api/safety-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: this.sessionId,
        message,
        language
      })
    });

    if (!response.ok || !response.body) {
      throw new Error('Chat request failed');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    async function* streamChunks() {
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          yield decoder.decode(value, { stream: true });
        }
      }
    }

    return streamChunks();
  }
}

export const createSafetyChat = (sessionId: string): SafetyChat => {
  return new SafetyChat(sessionId);
};
