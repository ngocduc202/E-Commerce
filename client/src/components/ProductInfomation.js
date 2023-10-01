import React, { memo ,useState , useCallback} from 'react'
import {productInfoTabs} from '../ultils/contanst'
import {Votebar , Button , VoteOptions} from './'
import { renderStarFromNumber } from '../ultils/helpers'
import { apiRatings } from '../apis'
import { useDispatch } from 'react-redux'
import {showModal} from '../store/app/appSlice'


const ProductInfomation = ({totalRatings , totalCount , nameProduct}) => {

  const [activedTab, setActivedTab] = useState(1)
  const dispatch = useDispatch()

  return (
    <div>
      <div className='flex items-center gap-2 relative bottom-[-1px]'>
        {productInfoTabs.map(el => (
          <span
          className={`p-2  px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
          key={el.id}
          onClick={() => setActivedTab(el.id)}
          >
            {el.name}
            </span>
        ))}
          <div
          className={`p-2  px-4 cursor-pointer ${activedTab === 5 ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
          onClick={() => setActivedTab(5)}
          >
            CUSTOMER RIVIEW
            </div>
      </div>
      <div className='w-full border p-4'>
        {productInfoTabs.some(el => el.id === activedTab) && productInfoTabs.find(el => el.id === activedTab)?.content}
        {activedTab === 5 && <div className='flex flex-col p-4'>
          <div className='flex'>
          <div className='flex-4 border flex flex-col items-center justify-center border-red-500'>
              <span className='font-semibold text-3xl '>{`${totalRatings}/5`}</span>
              <span className='flex items-center gap-1'>{renderStarFromNumber(totalRatings)?.map((el , index) => (
                  <span key={index}>{el}</span>
              ))}</span>
              <span className='text-sm'>{`${totalCount} reviewers and commentor`}</span>
            </div>
            <div className='flex-6 border flex gap-2 flex-col p-4'>
              {Array.from(Array(5).keys()).reverse().map(el => (
                <Votebar
                key={el}
                number={el+1}
                ratingCount={2}
                ratingTotal={5}
                />
              ))}
            </div>
          </div>
            <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
              <span>Do you review this product?</span>
              <Button handleOnClick={() => dispatch(showModal({isShowModal : true , modalChildren : <VoteOptions nameProduct={nameProduct}/>}))}>Vote now!</Button>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default memo(ProductInfomation)