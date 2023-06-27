import './App.css';
import Navbar from './components/Navbar';
import { createContext, useEffect, useState } from 'react';
import ProfileSlider from './components/ProfileSlider';
import AppRoutes from './AppRoutes';
import { WagmiConfig } from 'wagmi';
import { config } from './utils/wagmi_configuration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const AppContext = createContext();

function App() {
  const [sliderToggle, setSliderToggle] = useState(false);
  const [confirmTransactionFlag, setConfirmTransactionFlag] = useState(false);

  // useEffect(() => {
  //   const crntPath = window.location.pathname
  //   if( crntPath === "/pools" || crntPath === "/swap" || crntPath === "/pools/addliquidity" || crntPath === "/pools/removeliquidity" ){
  //     window.addEventListener("beforeunload", alertUser);
  //     return () => {
  //       window.removeEventListener("beforeunload", alertUser);
  //     };
  //   }
  // }, []);
  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };


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
          {sliderToggle && <ProfileSlider />}
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
