import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import HomeHome from './components/HomeHome';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <NoteState>
    <Router>
      <Navbar />
      <Alert msg="this is alert" />
      <div className="container">
      <Routes>
        <Route path="/" element={<HomeHome />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
