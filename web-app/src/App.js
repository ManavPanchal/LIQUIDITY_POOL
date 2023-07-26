import './App.css';
import Navbar from './components/Navbar';
import { createContext, lazy, Suspense, useState } from 'react';
import AppRoutes from './AppRoutes';
import { WagmiConfig } from 'wagmi';
import { config } from './utils/wagmi_configuration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSlider = lazy(()=> import("./components/profile-slider"))

export const AppContext = createContext();

function App() {
  const [sliderToggle, setSliderToggle] = useState(false);
  const [confirmTransactionFlag, setConfirmTransactionFlag] = useState(false);

  return (
    <WagmiConfig config={config}>
      <AppContext.Provider
        value={{
          sliderToggle,
          setSliderToggle,
          confirmTransactionFlag,
          setConfirmTransactionFlag
        }}
      >
        <div id="App" className="h-screen w-screen overflow-x-hidden">
          {sliderToggle && <Suspense fallback={()=>"Loading"}><ProfileSlider /></Suspense>}
          <header className="App-header">
            <Navbar />
          </header>
          <main>
            <ToastContainer/>
            <AppRoutes />
          </main>
        </div>
      </AppContext.Provider>
    </WagmiConfig>
  );
}

export default App;
