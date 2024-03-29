import React, { memo } from 'react'
import Slider from 'react-slick'
import {Product} from '..'

const settings= {
  dots : false,
  infinite : false,
  speed : 500,
  slidesToShow : 3,
  slidesToScroll : 1
}

const CustomSlider = ({product , activeTab , normal}) => {
  return (
    <>
    {product && <Slider className='custom-slider' {...settings}>
                  {product?.map((el , index) =>(
                    <Product
                    key={index}
                    pid={el._id}
                    productData={el}
                    isNew={activeTab === 1 ? false :  true}
                    normal = {normal}
                    />
                  ))}
              </Slider>}
    </>
  )
}

export default memo(CustomSlider)