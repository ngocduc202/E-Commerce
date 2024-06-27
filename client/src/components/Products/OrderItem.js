import SelectQuantity from 'components/Common/SelectQuantity'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { useEffect, useState } from 'react'
import { updateCart } from 'store/user/userSlice'
import { formatMoney } from 'ultils/helpers'
const OrderItem = ({color,dfQuantity = 1 ,price ,title ,thumbnail , pid , dispatch}) => {
  const [quantity, setQuantity] = useState(() => dfQuantity)
  const handleQuantity = (number) => {
    if(+number > 1) setQuantity(number)
  }
  const handleChangeQuantity = (flag) => {
    if(flag === 'minus' && quantity === 1) return
    if(flag === 'minus'){
      setQuantity(prev => +prev -1)
    }
    if(flag === 'plus'){
      setQuantity(prev => +prev +1)
    }
  }

  useEffect(() => {
    dispatch(updateCart({ pid : pid , quantity , color }))
  }, [quantity])


  return (
    <div className='w-main mx-auto border-b font-bold grid py-3 grid-cols-10'>
    <span className='col-span-6 w-full text-center'>
    <div className='flex gap-2 px-4 py-2'>
        <img src={thumbnail} alt="" className='w-28 h-28 object-cover' />
        <div className='flex flex-col items-start gap-1'>
          <span className='text-sm text-main'>{title}</span>
          <span className='text-[10px] font-main'>{color}</span>
        </div>
        </div>
    </span>
    <span className='col-span-1 w-full text-center'>
      <div className='flex items-center h-full'>
        <SelectQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          handleChangeQuantity={handleChangeQuantity}
        />
      </div>
    </span>
    <span className='col-span-3 w-full text-center h-full flex items-center justify-center'>
      <span className='text-lg'>{formatMoney(price *  quantity) + ' VND'}</span>
    </span>
  </div>
  )
}

export default withBaseComponent(OrderItem)