import React, {useEffect, useState} from "react";
import "./Chat.css";
import {generateConversation} from "../api/openai";
import type {Message, Character} from "../api/openai";

interface ChatProps {
  person1: Character;
  person2: Character;
  topic: string;
  context: string;
  conversationCount: number;
}

const Chat: React.FC<ChatProps> = ({
  person1,
  person2,
  topic,
  context,
  conversationCount,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const generatedMessages = await generateConversation(
          person1,
          person2,
          topic,
          context,
          conversationCount
        );
        setMessages(generatedMessages);
      } catch (err) {
        setError("会話の生成中にエラーが発生しました。");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [person1, person2, topic, context, conversationCount]);

  if (isLoading) {
    return (
      <div className="chat-container">
        <div className="loading">
          <p>会話を生成中です...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-container">
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>
          {person1.name} と {person2.name} の会話
        </h2>
        <p className="topic">テーマ: {topic}</p>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.speaker === person1.name ? "person1" : "person2"
            }`}
          >
            <div className="message-header">
              <span className="speaker">{message.speaker}</span>
              <span className="timestamp">{message.timestamp}</span>
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
