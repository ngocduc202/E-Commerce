import React from 'react'
import {SideBar , Banner} from '../../components'

const Home = () => {
  return (
    <div className='w-main flex'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
            <SideBar />
            <span>Deal Daily</span>
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto border'>
            <Banner />
            <span>Best Seller</span>
        </div>
    </div>
  )
}

export default Home