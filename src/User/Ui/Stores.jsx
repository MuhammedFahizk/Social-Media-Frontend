import React, { useState} from 'react';
import Modal from '../Ui/Modal'

const Stores = () => {
  const stores = [
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4065187/pexels-photo-4065187.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },{
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      profile: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600',
      story: 'https://images.pexels.com/photos/4067768/pexels-photo-4067768.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ]; const [open, setOpen] = useState(false)
  const handelCloseModal = () => {
      setOpen(false)
  }

  return (
    <div className='lg:h-[150px] lg:w-[270px] mt-4 md:mt-0 p-2   overflow-x-scroll no-scrollbar md:p-3 flex gap-2'>
      {stores.map((store, index) => (
        <div 
        onClick={() => setOpen(true)}
         key={index} className='relative md:h-full h-fit w-[95px] flex-shrink-0'>
          <img
            src={store.story}
            alt="profile"
            className='md:h-full h-[90px] w-full mt-1 md:rounded-2xl  rounded-full  blur-sm object-cover'
          />
          <img
            src={store.profile}
            alt="profile"
            className='h-14 w-14 rounded-full absolute shadow-3xl border-s-fuchsia-200 md:top-2/3 top-2/4  left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover'
          />
        </div>

      ))}

<Modal  isOpen={open} onClose={handelCloseModal}>
            <h1>hai</h1>
             </Modal>
    </div>
  );
}

export default Stores;
