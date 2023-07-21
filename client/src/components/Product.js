import React from 'react'
import {formatMoney} from '../ultils/helpers'
import label from '../assets/label.webp'
import labelBlue from '../assets/label-blue.png'

const Product = ({productData , isNew}) => {
  return (
    <div className='w-full text-base px-[10px]'>
      <div className='w-full border p-[15px] flex flex-col items-center'>
          <div className='w-full relative'>
            <img src={productData?.thumb || ''} alt="" className='w-[243px] h-[243px] object-cover' />
            <img src={isNew ? label : labelBlue} alt="" className={`absolute w-[120px]  top-[-33px] left-[-43px] `} />
            <span className={`font-bold absolute top-[-10px] left-[-12px] text-white ${isNew ? '' : 'text-sm'}`}>{isNew ? "New" : "Trending"}</span>
          </div>
          <div className='flex flex-col gap-1 mt-[15px] items-start  w-full '>
            <span className='line-clamp-1'>{productData?.title}</span>
            <span>{`${formatMoney(productData?.price)} VND`}</span>
          </div>
      </div>
    </div>
  )
}

export default Product