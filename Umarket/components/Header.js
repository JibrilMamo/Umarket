import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export let searchValue = '';
export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');


  
  
  useEffect(() => {
    if (currentUser) {
      const splitEmail = currentUser.email.split('@')[0]; 
      setEmail(splitEmail);
    } else {
      const splitEmail = ''; 
      setEmail(splitEmail);
      
    }
  }, [currentUser]);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className='sticky top-0 w-full left-0 bg-red-900 flex flex-wrap items-center justify-between p-4 border-b border-solid border-yellow-500'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl select-none flex-1'>
          UMARKET
        </h1>
        
        <div className='flex items-center'>
          <i
            onClick={() => setOpenModal(true)}
            className='fa-solid fa-user text-center text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl ml-2'
          >
            <h3 className='select-none text-xs ' >{email}</h3>
          </i>
         
        </div>
      </div>
    </>
  );
}
