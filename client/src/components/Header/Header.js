import React ,{Fragment, memo, useEffect, useState} from 'react'
import logo from "assets/logo.png"
import icons from '../../ultils/icons'
import {Link} from "react-router-dom"
import path from "../../ultils/path"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/user/userSlice'

const {RiPhoneFill ,MdEmail ,BsHandbagFill , FaUserCircle} = icons
const Header = () => {
  const {current} = useSelector(state => state.user)
  const [isShowOption, setIsShowOption] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const handleClickoutOptions= (e) => {
      const profile = document.getElementById('profile')
      if(!profile.contains(e.target)) setIsShowOption(false)
    }
    document.addEventListener('click',handleClickoutOptions)
    return () => {
      document.removeEventListener('click',handleClickoutOptions)
    }
  }, [])


  return (
    <div className=' w-main h-[110px] flex justify-between py-[35px]'>
      <Link to={`/${path.HOME}`}>
      <img src={logo} alt="logo"  className='w-[234px] object-contain'/>
      </Link>
      <div className='flex text-[13px] '>
          <div className='flex flex-col px-6 border-r items-center'>
            <span className='flex gap-4 items-center'>
              <RiPhoneFill  color='red'/>
                <span className='font-semibold'>(+1800) 000 8808</span>
            </span>
            <span>Mon-Sat 9:00AM - 8:00PM</span>
          </div>
          <div className='flex flex-col px-6 border-r items-center'>
            <span className='flex gap-4 items-center'>
              <MdEmail  color='red'/>
                <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
            </span>
            <span>Online Support 24/7</span>
          </div>
          {current && <Fragment>
            <div className='flex items-center justify-center gap-2 px-6 border-r cursor-pointer'>
            <BsHandbagFill color='red' />
            <span>o item</span>
          </div>
          <div
          className='flex items-center justify-center px-6 gap-2 cursor-pointer relative'
            onClick={(e) => setIsShowOption(prev => !prev)}
            id='profile'
          >
            <FaUserCircle color='red' />
            <span>Profile</span>
         {isShowOption &&  <div onClick={e => e.stopPropagation()} className='absolute top-full bg-gray-100 border min-w-[150px] py-2 flex flex-col z-999 left-[16px]'>
            <Link className='p-2 hover:bg-sky-100 w-full' to={`/${path.MEMBER}/${path.PERSONAL}`}>Personal</Link>
            {+current?.role === 2002 && <Link className='p-2 hover:bg-sky-100 w-full' to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin workspace</Link>}
          <span onClick={() => dispatch(logout())} className='p-2 hover:bg-sky-100 w-full'>Logout</span>
          </div>}
          </div>
          </Fragment>}
      </div>
    </div>
  )
}

export default memo(Header)