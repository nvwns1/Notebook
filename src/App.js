import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import HomeHome from './components/HomeHome';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signp';

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
