import "./App.css";
import {useState} from "react";
import Chat from "./components/Chat";

function App() {
  const [isFirstFormOpen, setIsFirstFormOpen] = useState(false);
  const [isSecondFormOpen, setIsSecondFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [person1, setPerson1] = useState({
    name: "おばあちゃん",
    personality: "おばあちゃんはとても優しい人です。",
    gender: "female",
    age: "70",
  });
  const [person2, setPerson2] = useState({
    name: "おじいちゃん",
    personality: "おじいちゃんはとても優しい人です。",
    gender: "male",
    age: "75",
  });
  const [topic, setTopic] = useState("日本の未来");
  const [context, setContext] = useState("");
  const [conversationCount, setConversationCount] = useState(5);

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleStartConversation = () => {
    setShowChat(true);
  };

  if (showChat) {
    return (
      <div className="chat-view">
        <Chat
          person1={person1}
          person2={person2}
          topic={topic}
          context={context}
          conversationCount={conversationCount}
        />
        <button className="back-button" onClick={() => setShowChat(false)}>
          設定に戻る
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="form-container">
            <div
              className="form-header"
              onClick={() => setIsFirstFormOpen(!isFirstFormOpen)}
            >
              <h2>{person1.name}</h2>
              <span>{isFirstFormOpen ? "▼" : "▶"}</span>
            </div>
            {isFirstFormOpen && (
              <form className="form">
                <div className="form-group">
                  <label>名前</label>
                  <input
                    type="text"
                    value={person1.name}
                    onChange={(e) =>
                      setPerson1({...person1, name: e.target.value})
                    }
                  />
                </div>
                <div className="form-group">
                  <label>性格</label>
                  <textarea
                    value={person1.personality}
                    onChange={(e) =>
                      setPerson1({...person1, personality: e.target.value})
                    }
                  />
                </div>
                <div className="form-group">
                  <label>性別</label>
                  <select
                    value={person1.gender}
                    onChange={(e) =>
                      setPerson1({...person1, gender: e.target.value})
                    }
                  >
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>年齢</label>
                  <input
                    type="number"
                    value={person1.age}
                    onChange={(e) =>
                      setPerson1({...person1, age: e.target.value})
                    }
                  />
                </div>
              </form>
            )}
          </div>
          <h1>と</h1>
          <div className="form-container">
            <div
              className="form-header"
              onClick={() => setIsSecondFormOpen(!isSecondFormOpen)}
            >
              <h2>{person2.name}</h2>
              <span>{isSecondFormOpen ? "▼" : "▶"}</span>
            </div>
            {isSecondFormOpen && (
              <form className="form">
                <div className="form-group">
                  <label>名前</label>
                  <input
                    type="text"
                    value={person2.name}
                    onChange={(e) =>
                      setPerson2({...person2, name: e.target.value})
                    }
                  />
                </div>
                <div className="form-group">
                  <label>性格</label>
                  <textarea
                    value={person2.personality}
                    onChange={(e) =>
                      setPerson2({...person2, personality: e.target.value})
                    }
                  />
                </div>
                <div className="form-group">
                  <label>性別</label>
                  <select
                    value={person2.gender}
                    onChange={(e) =>
                      setPerson2({...person2, gender: e.target.value})
                    }
                  >
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>年齢</label>
                  <input
                    type="number"
                    value={person2.age}
                    onChange={(e) =>
                      setPerson2({...person2, age: e.target.value})
                    }
                  />
                </div>
              </form>
            )}
          </div>
          <h1>が</h1>
        </div>
        <div className="container">
          <form className="form-group topic-form">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </form>
          <h1>の話をする</h1>
        </div>
        <div className="container">
          <button className="start-button" onClick={handleStartConversation}>
            会話を開始
          </button>
        </div>
        <div className="container">
          <div className="setting" onClick={() => setIsModalOpen(true)}>
            <p>詳細設定</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content">
            <h2>詳細設定</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>コンテキスト</label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="会話の背景や状況を入力してください"
                />
              </div>
              <div className="form-group">
                <label>会話数</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={conversationCount}
                  onChange={(e) => setConversationCount(Number(e.target.value))}
                />
              </div>
              <div className="modal-buttons">
                <button onClick={() => setIsModalOpen(false)}>
                  キャンセル
                </button>
                <button onClick={() => setIsModalOpen(false)}>保存</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
