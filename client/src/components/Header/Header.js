import React ,{Fragment, memo} from 'react'
import logo from "assets/logo.png"
import icons from '../../ultils/icons'
import {Link} from "react-router-dom"
import path from "../../ultils/path"
import { useSelector } from 'react-redux'

const {RiPhoneFill ,MdEmail ,BsHandbagFill , FaUserCircle} = icons
const Header = () => {
  const {current} = useSelector(state => state.user)
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
          <Link
          className='flex items-center justify-center px-6 gap-2 cursor-pointer'
          to={+current?.role === 2002 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}
          >
            <FaUserCircle color='red' />
            <span>Profile</span>
          </Link>
          </Fragment>}
      </div>
    </div>
  )
}

export default memo(Header)