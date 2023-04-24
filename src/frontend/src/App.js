import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  // Fetching message from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "1", title: "Tab 1" },
    { id: "2", title: "Tab 2" },
    { id: "3", title: "Tab 3" },
    { id: "4", title: "Tab 4" },
    { id: "5", title: "Tab 5" },
    { id: "6", title: "Tab 6" },
    { id: "7", title: "Tab 7" },
    { id: "8", title: "Tab 8" },
    { id: "9", title: "Tab 9" },
    { id: "10", title: "Tab 10" },
    { id: "11", title: "Tab 11" },
    { id: "12", title: "Tab 12" },
    { id: "13", title: "Tab 13" },
  ];

  const messages = [
    { id: 1, question: "siapa pengampu matkul stima K1?", answer: "pak rin" },
    { id: 1, question: "siapa pengampu matkul stima K2?", answer: "bu ulfa" },
    { id: 2, question: "kenapa tubes banyak?", answer: "biar keos" },
    { id: 2, question: "dimana spongebob tinggal?", answer: "bikini bottom" },
    {
      id: 2,
      question:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available (mau coba pertanyaan yang panjang, jadinya bisa berbaris-baris ga ya?)",
      answer:
        "yoi bisa dong, ini juga mau coba jawaban yang panjang, tampilannya kurang lebih kayak gini",
    },
    {
      id: 3,
      question: "apa kepanjangan dari ITB",
      answer: "Institut Teknologi Bandung",
    },
    { id: 2, question: "bagaimana cara membuat chatGPT?", answer: "pake AI" },
    { id: 3, question: "siapa saudaranya upin?", answer: "ipin" },
    {
      id: 1,
      question: "apa yang mempunyai 12 kaki dan bisa terbang?",
      answer: "6 ekor burung",
    },
    { id: 2, question: "apa yang ada di ujung langit?", answer: "huruf 't'" },
  ];

  return (
    <Router>
      <div className="flex">
        <div className="fixed h-full bg-gray-800 text-white p-6">
          <Link to="/">
            <h1 className="font-bold text-lg mb-4">ChatDOA</h1>
          </Link>
          <nav className="h-full overflow-auto">
            <ul className="flex flex-col space-y-4 pr-4 pb-8">
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
                    messages={messages.filter(
                      (msg) => msg.id === parseInt(tab.id)
                    )}
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

function ChatWindow({ messages }) {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion("");
  }, [messages]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
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
