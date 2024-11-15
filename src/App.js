import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ChatBox from './Components/Chat/chat';
import UploadPdf from './Components/Uploadpdf/uploadpdf';


function App() {
  const [chat,setChat] = useState(true);
  return (
    <Router>
      <div className="App">
      <button
           onClick={e=>setChat(!chat)}>
               {`Go to${chat?'Upload':'Chat'}`}
          </button>
        {/* <Routes> */}

          {chat ?<ChatBox />:<UploadPdf />}
          {/* <Route path="/chat" element={} />
          <Route path="/upload" element={} /> */}
        {/* </Routes> */}
      </div>
    </Router>
  );
}

export default App;
