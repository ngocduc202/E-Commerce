import React ,{useState , useEffect, memo} from 'react'
import { apiGetProducts } from 'apis/product'
import CustomSlider from 'components/Common/CustomSlider'
import {getNewProducts} from 'store/products/asyncAction'
import { useDispatch ,useSelector } from 'react-redux'
import clsx from 'clsx'

const tabs =[
  {
    id : 1,
    name: 'best seller'
  },
  {
    id : 2,
    name : 'new arrivals'
  }
]



const BestSeller = () => {

  const [bestSeller, setBestSeller] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
  const {newProducts} = useSelector(state => state.products)
  const {isShowModal} = useSelector(state => state.app)

  const fetchProduct = async () => {
    const response = await apiGetProducts({sort : '-sold'})
    if(response?.success) {
      setBestSeller(response.products)
      setProduct(response.products)
    }
  }

  useEffect(() => {
    fetchProduct()
    dispatch(getNewProducts())
  } ,[])
  useEffect(() => {
    if(activeTab === 1) {setProduct(bestSeller)}
    if(activeTab === 2) {setProduct(newProducts)}
  }, [activeTab])

  return (
    <div className={clsx(isShowModal ? 'hidden' : 'block')}>
        <div className='flex text-[20px] ml-[-32px]'>
            {tabs.map(el => (
              <span
              key={el.id}
              className={`font-semibold uppercase px-8 cursor-pointer border-r text-gray-400 ${activeTab === el.id ? 'text-gray-900' : ''}`}
              onClick={() => setActiveTab(el.id)}
              >{el.name}</span>
            ))}
        </div>
        <div className='mt-4 mx-[-10px] border-t-2 border-main pt-4'>
            <CustomSlider  product={product} activeTab={activeTab}/>
        </div>
        <div className='w-full flex gap-4 mt-4'>
          <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt=""
          className=' flex-1 object-contain'
          />
          <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt=""
          className=' flex-1 object-contain'
          />
        </div>
    </div>
  )
}

export default memo(BestSeller)