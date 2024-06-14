import React , {memo, useEffect , useState} from 'react'
import {ProductCard} from '..'
import {apiGetProducts} from '../../apis/product'
import banner from 'assets/banner.webp'
import banner2 from 'assets/banner2.avif'
import banner3 from 'assets/banner3.avif'
import banner4 from 'assets/banner4.webp'

const FeatureProduct = () => {

  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await apiGetProducts({limit : 9 , sort : "-totalRatings"})
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
      <div className='grid grid-cols-4 grid-rows-2 gap-4'>
        <img src={banner} alt="" className='w-full h-full object-cover col-span-2 row-span-2'/>
        <img src={banner2} alt=""  className='w-full h-full object-cover col-span-1 row-span-1' />
        <img src={banner4} alt=""  className='w-full h-full object-cover col-span-1 row-span-2'/>
        <img src={banner3} alt=""  className='w-full h-full object-cover col-span-1 row-span-1' />

      </div>
    </div>
  )
}

export default memo(FeatureProduct)