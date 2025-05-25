import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface Character {
  name: string;
  personality: string;
  gender: string;
  age: string;
}

export interface Message {
  speaker: string;
  content: string;
  timestamp: string;
}

const generateSingleMessage = async (
  speaker: Character,
  listener: Character,
  topic: string,
  context: string,
  history: Message[]
): Promise<Message> => {
  const prompt = `
【会話の設定】
テーマ: ${topic}
${context ? `コンテキスト: ${context}` : ""}

【話者の設定】
名前: ${speaker.name}
性格: ${speaker.personality}
性別: ${speaker.gender}
年齢: ${speaker.age}

【相手の設定】
名前: ${listener.name}
性格: ${listener.personality}
性別: ${listener.gender}
年齢: ${listener.age}

${
  history.length > 0
    ? "【これまでの会話】\n" +
      history.map((m) => `${m.speaker}: ${m.content}`).join("\n")
    : ""
}

上記の設定に基づいて、${speaker.name}の次の発言を1つだけ生成してください。
形式：
${speaker.name}: 発言内容

会話は自然な流れで、設定された性格や背景を反映させてください。
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "あなたは自然な会話を生成するAIアシスタントです。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from API");

    const [speakerName, messageContent] = content
      .split(":")
      .map((s) => s.trim());
    return {
      speaker: speakerName,
      content: messageContent,
      timestamp: new Date(
        Date.now() + history.length * 60000
      ).toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};

export const generateConversation = async (
  person1: Character,
  person2: Character,
  topic: string,
  context: string,
  count: number
): Promise<Message[]> => {
  const messages: Message[] = [];
  let currentSpeaker = person1;
  let currentListener = person2;

  // 最初の発言を生成
  const initialMessage = await generateSingleMessage(
    currentSpeaker,
    currentListener,
    topic,
    context,
    []
  );
  messages.push(initialMessage);

  // 残りの会話を生成
  for (let i = 1; i < count; i++) {
    // 話者を交代
    [currentSpeaker, currentListener] = [currentListener, currentSpeaker];

    const message = await generateSingleMessage(
      currentSpeaker,
      currentListener,
      topic,
      context,
      messages
    );
    messages.push(message);
  }

  return messages;
};
