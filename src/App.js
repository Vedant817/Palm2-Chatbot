import { useState } from "react";
const App = () => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const getResponse = async () => {
    const response = await fetch(`http://localhost:8000/prompt/:${text}`)
    const data = await response.json()
    setMessages([...messages, {
      author: data.messages.content,
      bot: data.candidates.content
    }])
  }
  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          <h3>Chat with</h3>
          <h2>PaLM 2 Bot</h2>
        </div>
      </div>
      <div className="feed">
        {messages?.map((message, _index) => (
          <div key={_index}>
            <div className="question bubble">{message.author}</div>
            <div className="response bubble">{message.bot}</div>
          </div>
        ))}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={getResponse}>GO</button>
    </div>
  );
}

export default App;
