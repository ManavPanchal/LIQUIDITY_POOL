import React, { useContext } from 'react'
import { AppContext } from '../App'

const ProfileSlider = () => {

  const {setSliderToggle} = useContext(AppContext);

  return (
    <section className='absolute right-0 h-screen py-3 pr-3'>
      <section className='flex relative text-slate-400 h-full bg-transparent hover:bg-gray-600 hover:bg-opacity-5 cursor-pointer rounded-l-xl rounded-bl-xl ease-in-out duration-1000'>
        <span class="profile_container_closer material-symbols-outlined p-3 text-center" onClick={()=>setSliderToggle(false)}>
          keyboard_double_arrow_right
        </span>
        <div className="right-0 prfile_slider bg-white h-full w-96 rounded-xl p-3">
          <div className="header flex justify-between items-center px-2">
            <span className='text-md font-bold text-black'> Connect a wallet</span>
            <span className="material-symbols-outlined bg-gray-600 bg-opacity-5 text-center rounded-xl h-8 w-8 text-slate-800 text-2xl">
              settings
            </span>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ProfileSlider