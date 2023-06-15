import './App.css';
import Navbar from './components/Navbar';
import { createContext, useState } from 'react';
import ProfileSlider from './components/ProfileSlider';
import AppRoutes from './AppRoutes';
import { WagmiConfig } from 'wagmi';
import { config } from './utils/wagmi_configuration';

export const AppContext = createContext();

function App() {
  const [sliderToggle, setSliderToggle] = useState(false);

  return (
    <WagmiConfig config={config}>
      <AppContext.Provider
        value={{
          sliderToggle,
          setSliderToggle,
        }}
      >
        <div id="App" className="h-screen w-screen overflow-x-hidden">
          {sliderToggle && <ProfileSlider />}
          <header className="App-header">
            <Navbar />
          </header>
          <main>
            <AppRoutes />
          </main>
        </div>
      </AppContext.Provider>
    </WagmiConfig>
  );
}

export default App;
