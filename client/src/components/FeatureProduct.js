import React , {useEffect , useState} from 'react'
import {ProductCard} from './'
import {apiGetProducts} from '../apis/product'
import banner from '../assets/banner.webp'
import banner2 from '../assets/banner2.avif'
import banner3 from '../assets/banner3.avif'
import banner4 from '../assets/banner4.webp'

const FeatureProduct = () => {

  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await apiGetProducts({limit : 9 , totalRatings : 5})
    if(response.success) {
      setProducts(response.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className='w-full'>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURE PRODUCTS</h3>
      <div className='flex flex-wrap mt-[15px] mx-[-10px]'>
        {products?.map(el =>(
          <ProductCard
          key={el._id}
          image={el.thumb}
          title={el.title}
          totalRatings={el.totalRatings}
          price={el.price}
          />
        ))}
      </div>
      <div className='flex justify-between'>
        <img src={banner} alt="" className='w-[50%] object-contain'/>
        <div className='flex flex-col justify-between gap-4 w-[24%]'>
            <img src={banner2} alt=""  />
            <img src={banner3} alt=""  />
        </div>
        <img src={banner4} alt="" className='w-[24%] object-contain'/>
      </div>
    </div>
  )
}

export default FeatureProduct