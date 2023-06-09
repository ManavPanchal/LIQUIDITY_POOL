import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <main>
        working...
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
