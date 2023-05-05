import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function App() {
  const [chats, setChats] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [send, setSend] = useState(false);
  const [newTab, setNewTab] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(1);

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

  const handleOptionChange = (element) => {
    setSelectedAlgorithm(parseInt(element.target.value));
  };

  const handleNewTab = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/tab");
      console.log(response.data);
      setNewTab(!newTab);
      setSend(!send);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteTab = async (id) => {
    try {
      const responseTab = await axios.delete(
        `http://localhost:4000/tab/delete/${id}`
      );
      const responseHistory = await axios.delete(
        `http://localhost:4000/chat/delete/${id}`
      );
      console.log(responseTab.data);
      console.log(responseHistory.data);
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
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/${tab.id}`}
                      className="flex items-center"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <i className={tab.icon}></i>
                      <span className="pr-6">{tab.title}</span>
                    </Link>
                    <button
                      onClick={() => handleDeleteTab(tab.id)}
                      className="inline-block"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
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
                value="1"
                checked={selectedAlgorithm === 1}
                onChange={handleOptionChange}
              />
              <span className="ml-2">KMP</span>
            </label>
            <label className="inline-flex items-center m-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-option"
                value="2"
                checked={selectedAlgorithm === 2}
                onChange={handleOptionChange}
              />
              <span className="ml-2">BM</span>
            </label>
          </div>
        </div>
        <main className="flex-1 p-4 mr-6 ml-56 h-screen overflow-y-hidden">
          <Routes>
            <Route path="*" element={<WelcomePage />} />
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
                    selectedAlgorithm={selectedAlgorithm}
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

function ChatWindow({ id, messages, send, setSend, selectedAlgorithm }) {
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
        algorithm: selectedAlgorithm,
      });
      console.log(response.data);
      setSend(!send);
    } catch (error) {
      console.error(error.message);
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
              {message.answer.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
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
        <button className="bg-gray-700 hover:bg-gray-800 text-white rounded-r-lg px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">ChatDOA</h1>
      <Card>
        <h2 className="text-xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Answering questions using KMP or BM algorithm</li>
          <li>Multiple chat rooms or tabs</li>
          <li>Has calculator and date features</li>
        </ul>
        <h2 className="text-xl font-bold mb-4">Algorithm</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          hendrerit tortor et finibus tincidunt. Cras eget libero euismod,
          sodales dui vel, fermentum est. Vestibulum iaculis lobortis leo,
          vestibulum ornare dolor ultrices vitae. Aenean et eleifend arcu. Nulla
          elementum neque vel tincidunt pretium.
        </p>
      </Card>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}

export default App;
