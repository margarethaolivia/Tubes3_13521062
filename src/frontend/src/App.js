import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [chats, setChats] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [send, setSend] = useState(false);
  const [newTab, setNewTab] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  // Fetching message from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000/chat")
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
      });
  }, [send]);

  useEffect(() => {
    fetch("http://localhost:4000/tab")
      .then((res) => res.json())
      .then((data) => {
        const tabs = data.map((tab) => ({
          id: tab.tab_id.toString(),
          title: `Tab ${tab.tab_id}`,
        }));
        setTabs(tabs);
      });
  }, [newTab]);

  const handleNewTab = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/tab");
      console.log(response.data);
      setNewTab(!newTab);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Router>
      <div className="flex">
        <div className="fixed h-full bg-gray-800 text-white p-6">
          <Link to="/">
            <h1 className="font-bold text-lg mb-4">ChatDOA</h1>
          </Link>
          <form className="flex items-center mt-auto" onSubmit={handleNewTab}>
            <div className="flex flex-col items-start pb-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
                New Tab
              </button>
            </div>
          </form>
          <nav className="h-4/6 overflow-auto">
            <ul className="flex flex-col h-full space-y-4 pr-4 pb-8 ">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`${
                    activeTab === tab.id ? "bg-gray-900" : "bg-gray-800"
                  } px-3 py-2 rounded`}
                >
                  <Link
                    to={`/${tab.id}`}
                    className="flex items-center space-x-2"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <i className={tab.icon}></i>
                    <span>{tab.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start mx-3 mt-5">
            <label className="inline-flex items-center m-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-option"
                checked
              />
              <span className="ml-2">KMP</span>
            </label>
            <label className="inline-flex items-center m-2">
              <input type="radio" className="form-radio" name="radio-option" />
              <span className="ml-2">BM</span>
            </label>
          </div>
        </div>
        <main className="flex-1 p-4 ml-64 h-screen overflow-y-hidden">
          <Routes>
            <Route path="/" element={<h2>Welcome to ChatDOA</h2>} />
            {tabs.map((tab) => (
              <Route
                key={tab.id}
                path={`/${tab.id}`}
                element={
                  <ChatWindow
                    key={tab.id}
                    id={tab.id}
                    messages={chats.filter(
                      (msg) => msg.chat_id === parseInt(tab.id)
                    )}
                    send={send}
                    setSend={setSend}
                  />
                }
              />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function ChatWindow({ id, messages, send, setSend }) {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion("");
  }, [messages]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/chat/${id}`, {
        question: question,
        answer: "jawaban default",
      });
      console.log(response.data);
      console.log(id);
      setSend(!send);
      // Update UI or display success message to the user
    } catch (error) {
      console.error(error.message);
      // Update UI or display error message to the user
    }
  };

  return (
    <div className="flex flex-col h-screen pb-12">
      <div className="flex-1 overflow-y-auto min-h-0 pr-4">
        {messages.map((message) => (
          <>
            <div className="bg-gray-100 p-2 rounded-lg max-w-md ml-auto my-2">
              <p>{message.question}</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg max-w-md self-start my-2">
              <p>{message.answer}</p>
            </div>
          </>
        ))}
      </div>
      <form className="flex items-center mt-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 rounded-l-lg p-2 border border-gray-400"
          placeholder="Type your question..."
          value={question}
          onChange={handleQuestionChange}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
