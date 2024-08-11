import React from 'react';
import Guest from './components/Guest';
import { currentUser } from '@clerk/nextjs/server';
import AddTransactions from './components/AddTransactions';


const Home = async () => {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <section>
      <h1 className='bg-green-500 text-white  rounded-full px-[10%]'>Kaabo, {user.firstName}</h1>
      <AddTransactions/>
    </section>
  )
}

export default Home;