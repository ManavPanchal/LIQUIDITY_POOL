import './App.css';
import Navbar from './components/UI-components/Navbar';
import { createContext, useState } from 'react';
import ProfileSlider from './components/ProfileSlider';
import AppRoutes from './AppRoutes';

export const AppContext = createContext();

function App() {

  const [sliderToggle, setSliderToggle] = useState(false);
  const [isWalletConnected, setWalletConnection] = useState(false);


  return (
    <AppContext.Provider value={{sliderToggle, setSliderToggle, isWalletConnected, setWalletConnection}}>
      <div className="App">
      {sliderToggle && <ProfileSlider/>}
        <header className="App-header">
          <Navbar/>
        </header>
        <main>
          <AppRoutes/>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
