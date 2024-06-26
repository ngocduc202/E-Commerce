import { Breadcrumb, Button, OrderItem } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatMoney } from 'ultils/helpers'
import path from 'ultils/path'

const DetailCart = ({location}) => {
  const { currentCart} = useSelector(state => state.user)
  return (
    <div className='w-full'>
        <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
        <h3 className='font-semibold text-2xl uppercase'>My Cart</h3>
        {/* <Breadcrumb
        category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')}
        /> */}
        </div>
      </div>
    <div className='flex flex-col border mt-8 w-main mx-auto my-8 '>
    <div className='w-main mx-auto bg-gray-600 text-white font-bold grid py-3 grid-cols-10'>
        <span className='col-span-6 w-full text-center'>Products</span>
        <span className='col-span-1 w-full text-center'>Quantity</span>
        <span className='col-span-3 w-full text-center'>Price</span>
      </div>
      {currentCart?.map(el => (
          <OrderItem
          key={el._id}
          dfQuantity={el?.quantity}
          color={el?.color}
          title={el?.title}
          thumbnail={el?.thumbnail}
          price={el?.price}
          pid={el?.product?._id}
          />
      ))}
    </div>
    <div className='w-main mx-auto flex flex-col mb-12 items-end gap-3'>
      <span className='flex items-center gap-8 text-sm'>
        <span>Subtotal:</span>
        <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum , el) => sum + +el?.price * el?.quantity , 0))} VND`}</span>
      </span>
      <span className='text-xs italic'>Shipping , taxes and discounts will be calculated at checkout</span>
      <Link target='_blank' className='bg-main text-white px-4 py-2 rounded-md' to={`/${path.CHECKOUT}`}>Checkout</Link>
    </div>
    </div>
  )
}

export default withBaseComponent(DetailCart)