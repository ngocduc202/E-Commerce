import React ,{useCallback, useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct  , apiGetProducts} from '../../apis'
import  {Breadcrumb , Button , SelectQuantity , ProductExtraInfoItem ,ProductInfomation ,CustomSlider} from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney , formatPrice , renderStarFromNumber} from "../../ultils/helpers"
import {productExtraInfomation} from '../../ultils/contanst'

const settings= {
  dots : false,
  infinite : false,
  speed : 500,
  slidesToShow : 3,
  slidesToScroll : 1
}

const DetailProduct = () => {
  const {pid , title , category} = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(null)
  const [relatedProduct, setRelatedProduct] = useState(null)
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    if(response.success) {
      setProduct(response.productData)
      setCurrentImage(response.productData?.thumb)
    }
  }
  const fetchProducts = async () => {
    const response = await apiGetProducts({category})
    if(response.success) {
      setRelatedProduct(response.products)
    }
  }
  useEffect(() => {
    if(pid){
      fetchProductData()
      fetchProducts()
    }
    window.scrollTo(0 ,0)
  }, [pid])

  const handleQuantity = useCallback((number) => {

    if(!Number(number)  || Number(number) < 1){
      return
    }else
    {
      setQuantity(number)
    }

  } ,[quantity])
  const handleChangeQuantity = useCallback((flag) => {
    if(flag === 'minus' && quantity === 1) return
    if(flag === 'minus'){
      setQuantity(prev => +prev -1)
    }
    if(flag === 'plus'){
      setQuantity(prev => +prev +1)
    }
  } ,[quantity])

  const handleClickImage = (e ,el) => {
    e.stopPropagation()
    setCurrentImage(el)
  }

  return (
    <div className='w-full'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
        <h3 className='font-semibold'>{title}</h3>
        <Breadcrumb
        title={title}
        category={category}
        />
        </div>
      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className=' flex flex-col gap-4 w-2/5'>
          <div className='w-[458px] h-[458px] border overflow-hidden'>
          <ReactImageMagnify {...{
              smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: currentImage
              },
              largeImage: {
                  src: currentImage,
                  width: 1800,
                  height: 1500
              }
          }} />
          </div>
          <div className='w-[458px]'>
            <Slider
            className='image-slider flex gap-2'
            {...settings}
            >
              {product?.images?.map(el => (
              <div key={el} className=''>
                  <img onClick={e => handleClickImage(e , el)} src={el} alt="product" className='h-[143px] w-[143px] border object-cover cursor-pointer' />
              </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='flex pr-[24px] w-2/5 flex-col gap-4'>
          <div className='flex items-center justify-between'>
          <h2 className='text-[30px] font-semibold'>{`${formatMoney(formatPrice(product?.price))} VNĐ`}</h2>
          <span className='text-sm text-main'>{`In stock: ${product?.quantity}`}</span>
          </div>
          <div className='flex items-center gap-1'>
            {renderStarFromNumber(product?.totalRatings)?.map((el , index) => (
              <span key={index}>{el}</span>
            ))}
            <span className='text-sm text-main italic'>{`(Sold: ${product?.sold} pieces)`}</span>
          </div>
          <ul className='list-square pl-4 text-sm text-gray-500'>
            {product?.description?.map(el =>(
              <li key={el} className='leading-6'>{el}</li>
            ))}
          </ul>
          <div className='flex flex-col gap-8'>
              <div className='flex items-center gap-4'>
              <span className='font-semibold'>Quantity</span>
              <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity= {handleChangeQuantity}
              />
              </div>
              <Button fw>
                  Add to Cart
              </Button>
          </div>
        </div>
        <div className='w-1/5'>
          {productExtraInfomation.map(el => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              icons={el.icons}
              sub={el.sub}
            />
          ))}
        </div>
        </div>
        <div className='w-main m-auto mt-8'>
          <ProductInfomation
          totalRatings={product?.totalRatings}
          totalCount={18}
          nameProduct={product?.title}
          />
        </div>
        <div className='w-main m-auto mt-8'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>OTHER CUSTOMER ALSO LIKED</h3>
        <CustomSlider
        product={relatedProduct}
        normal={true}
        />
        </div>
        <div className='h-[100px] w-full'>

        </div>
    </div>
  )
}

export default DetailProduct