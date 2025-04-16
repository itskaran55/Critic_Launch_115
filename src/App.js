import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './Components/Index';
import Login from './Components/Login';
import StartCreating from './Components/StartCreating';
import AdminIndex from './Components/Admin/AdminIndex'
import Searches from './Components/Admin/Searches';
import MyStudio from './Components/MyStudio';

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-black">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/imageGenerating" element={<StartCreating />} />
          <Route path="/myStudio" element={<MyStudio />} />
          <Route path="/Admin/Index" element={<AdminIndex/>}/>
          <Route path="/Admin/Searches" element={<Searches/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
