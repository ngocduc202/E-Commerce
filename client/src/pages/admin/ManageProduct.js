import React ,{useState , useEffect, useCallback} from 'react'
import { CustomizeVarriants, InputForm , Pagination } from 'components'
import { useForm } from 'react-hook-form'
import { apiDeleteProduct, apiGetProducts } from 'apis/product'
import moment from 'moment'
import { useSearchParams , createSearchParams , useNavigate , useLocation } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import icons from '../../ultils/icons'

const {BiCustomize , BiEdit ,RiDeleteBin6Line} = icons

const ManageProduct = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const {register , formState : {errors} , watch} = useForm()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [editProduct, setEditProduct] = useState(null)
  const [update, setUpdate] = useState(false)
  const [customizeVarriants, setCustomizeVarriants] = useState(null)
  const render = useCallback(() => {
    setUpdate(!update)
  })

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({...params , limit : +process.env.REACT_APP_LIMIT})
    if(response.success) {
      setCounts(response.counts)
      setProducts(response.products)
    }
  }
  const queryDebounce = useDebounce(watch('q') , 800)

  useEffect(() => {
    if(queryDebounce){
      navigate({
        pathname : location.pathname ,
        search : createSearchParams({q : queryDebounce}).toString()
      })
    }else{
      navigate({
        pathname : location.pathname
      })
    }
  }, [queryDebounce])


  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchProducts(searchParams)
  }, [params , update])

  const hanldeDeleteProduct = async (pid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this product?",
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => {
      if(result.isConfirmed) {
        const response = await apiDeleteProduct(pid)
        if(response.success) {
          render()
          toast.success(response.mes)
        }else{
          toast.error(response.mes)
        }
      }
    })

  }

  return (
    <div className='w-full flex flex-col gap-4 relative'>
    {editProduct && <div className='absolute inset-0 bg-gray-100 min-h-screen z-50'>
        <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
            />
      </div>}
      {customizeVarriants && <div className='absolute inset-0 bg-gray-100 min-h-screen z-50'>
        <CustomizeVarriants
            customizeVarriants={customizeVarriants}
            render={render}
            setCustomizeVarriants={setCustomizeVarriants}
            />
      </div>}
      <div className='h-[69px] w-full'></div>
        <div className='p-4 border-b w-full flex bg-gray-100 justify-between items-center fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tighter border-b'>Manage products</h1>
        </div>
        <div className='flex w-full justify-end items-center px-4'>
            <form className='w-[45%]'>
              <InputForm
              id='q'
              register={register}
              errors={errors}
              fullWidth
              placeholder='Search products by title , description ,...'
              />
            </form>
        </div>
        <table className='table-auto'>
            <thead>
              <tr className='border bg-sky-900 text-white border-white'>
                <th className='text-center py-2'>Order</th>
                <th className='text-center py-2'>Thumb</th>
                <th className='text-center py-2'>Title</th>
                <th className='text-center py-2'>Brand</th>
                <th className='text-center py-2'>Category</th>
                <th className='text-center py-2'>Price</th>
                <th className='text-center py-2'>Quantity</th>
                <th className='text-center py-2'>Sold</th>
                <th className='text-center py-2'>Color</th>
                <th className='text-center py-2'>Ratings</th>
                <th className='text-center py-2'>Varriants</th>
                <th className='text-center py-2'>UpdatedAt</th>
                <th className='text-center py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((el ,index) =>(
                <tr className='border-b' key={el.id}>
                  <td className='text-center py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                  <td className='text-center py-2'>
                      <img src={el.thumb} alt="Thumb" className='w-12 h-12 object-cover' />
                  </td>
                  <td className='text-center py-2'>{el.title}</td>
                  <td className='text-center py-2'>{el.brand}</td>
                  <td className='text-center py-2'>{el.category}</td>
                  <td className='text-center py-2'>{el.price}</td>
                  <td className='text-center py-2'>{el.quantity}</td>
                  <td className='text-center py-2'>{el.sold}</td>
                  <td className='text-center py-2'>{el.color}</td>
                  <td className='text-center py-2'>{el.totalRatings}</td>
                  <td className='text-center py-2'>{el.varriants?.length || 0}</td>
                  <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                  <td className='text-center py-2'>
                    <span onClick={() => setEditProduct(el)} className='text-blue-500 inline-block hover:text-orange-500 cursor-pointer px-1'><BiEdit /></span>
                    <span onClick={() => hanldeDeleteProduct(el._id)} className='text-blue-500 inline-block hover:text-orange-500 cursor-pointer px-1'><RiDeleteBin6Line /></span>
                    <span onClick={() => setCustomizeVarriants(el)} className='text-blue-500 inline-block hover:text-orange-500 cursor-pointer px-1'><BiCustomize /></span>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        <div className='w-full flex justify-end my-8'>
          <Pagination
          totalCount={counts}
          />
        </div>
    </div>
  )
}

export default ManageProduct