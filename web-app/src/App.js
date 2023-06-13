import './App.css';
import Navbar from './components/UI-components/Navbar';
import { createContext, useState } from 'react';
import ProfileSlider from './components/ProfileSlider';
import AppRoutes from './AppRoutes';
import TokenSelector from './components/token-selector';
import { WagmiConfig } from 'wagmi';
import { config } from './utils/wagmi_configuration';

export const AppContext = createContext();

function App() {

  const [sliderToggle, setSliderToggle] = useState(false);
  const [isWalletConnected, setWalletConnection] = useState(false);
  const [tokens, setTokens] = useState({token1:"", token2:""});
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false)

  return (
    <WagmiConfig config={config}>
      <AppContext.Provider
        value={{sliderToggle, setSliderToggle, isWalletConnected, setWalletConnection, setTokenSelectorToggle}}
        >
        <div id="App" className='h-screen w-screen'>
          {sliderToggle && <ProfileSlider/>}
          <header className="App-header">
            <Navbar/>
          </header>
          <main>
            <AppRoutes/>
          </main>
          { tokenSelectorToggle && <TokenSelector/>}
        </div>
      </AppContext.Provider>
    </WagmiConfig>
  );
}

export default App;
