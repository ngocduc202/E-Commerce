import React ,{useState , useEffect} from 'react'
import { apiGetProducts } from '../apis/product'
import {Product} from './'
import Slider from 'react-slick'


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

const settings= {
  dots : false,
  infinite : false,
  speed : 500,
  slidesToShow : 3,
  slidesToScroll : 1
}

const BestSeller = () => {

  const [bestSeller, setBestSeller] = useState(null)
  const [newProducts, setNewProducts] = useState(null)
  const [activeTab, setActiveTab] = useState(1)

  const fetchProduct = async () => {
    const response = await Promise.all([apiGetProducts({sort : '-sold'}) , apiGetProducts({sort : '-createdAt'})])
    if(response[0]?.success) {setBestSeller(response[0].products)}
    if(response[1]?.success) {setNewProducts(response[1].products)}
  }

  useEffect(() => {
    fetchProduct()
  } ,[])

  return (
    <div>
        <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
            {tabs.map(el => (
              <span
              key={el.id}
              className={`font-semibold capitalize cursor-pointer border-r text-gray-400 ${activeTab === el.id ? 'text-gray-900' : ''}`}
              onClick={() => setActiveTab(el.id)}
              >{el.name}</span>
            ))}
        </div>
        <div className='mt-4'>
            <Slider {...settings}>
                  {bestSeller?.map(el =>(
                    <Product
                    key={el._id}
                    productData={el}
                    />
                  ))}
              </Slider>
        </div>
    </div>
  )
}

export default BestSeller