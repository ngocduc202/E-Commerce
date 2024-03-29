import React, {useEffect , useState , useCallback} from 'react'
import { apiGetUsers ,apiUpdateUsers , apiDeleteUsers } from 'apis/user'
import { roles ,blockStatus } from 'ultils/contanst'
import moment from 'moment'
import { InputField , Pagination , InputForm , Select , Button} from 'components'
import  useDebounce  from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import clsx from 'clsx'

const ManageUser = () => {

  const {handleSubmit , register ,formState : {errors} , reset} = useForm({
    email : '' ,
    firstname : '',
    lastname : '',
    role : '' ,
    phone : '',
    isBlocked : ''
  })
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q : ''
  })
  const [update, setUpdate] = useState(false)
  const [editEl, setEditEl] = useState(null)
  const [params] = useSearchParams()

  const fetchUsers = async (params) => {
    const response = await apiGetUsers({...params , limit : process.env.REACT_APP_LIMIT})
    if(response.success) {setUsers(response)}
  }
  const render = useCallback(() => {
    setUpdate(!update)
  } , [update])
  const queriesDebounce = useDebounce(queries.q , 800)

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if(queriesDebounce) {
      queries.q =queriesDebounce
    }
    fetchUsers(queries)
  }, [queriesDebounce , params , update])

  const handleUpdate = async (data) => {
    const response = await apiUpdateUsers(data , editEl._id)
    console.log(editEl._id)
    if(response.success){
      setEditEl(null)
      render()
      toast.success(response.mes)
    }
    else{
      toast.error(response.mes)
    }
  }
  const handleDeleteUser =  (uid) => {
    Swal.fire({
      title : 'Delete User' ,
      text : 'Are you sure you want to delete user?' ,
      showCancelButton : true
    }).then( async (result) => {
      if(result.isConfirmed){
        const response = await apiDeleteUsers(uid)
        if(response.success){
          render()
          toast.success(response.mes)
        }
        else{
          toast.success(response.mes)
        }
      }
    })
  }

  useEffect(() => {
    if(editEl) {
      reset({
        email : editEl.email ,
        firstname : editEl.firstname,
        lastname : editEl.lastname,
        role : editEl.role ,
        phone : editEl.mobile,
        isBlocked : editEl.isBlocked
      })
    }
  }, [editEl])


  return (
    <div className={clsx('w-full' ,editEl && 'pl-16')}>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border border-b-gray-400'>
          <span>Manage users</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
          <InputField
          nameKey={'q'}
          value={queries.q}
          setValue={setQueries}
          style={'w500'}
          placeholder="Search name or mail user..."
          isHideLabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editEl && <Button type="submit">Update</Button>}
          <table className='table-auto mb-6 text-left w-full'>
            <thead className='font-bold bg-gray-700 text-[13px] text-white'>
              <tr className='border border-gray-500'>
              <th className='px-4 py-2 '>#</th>
              <th className='px-4 py-2 '>Email address</th>
              <th className='px-4 py-2 '>Firstname</th>
              <th className='px-4 py-2 '>Lastname</th>
              <th className='px-4 py-2 '>Role</th>
              <th className='px-4 py-2 '>Mobile</th>
              <th className='px-4 py-2 '>Status</th>
              <th className='px-4 py-2 '>Created At</th>
              <th className='px-4 py-2 '>Actions</th>
              </tr>
            </thead>
            <tbody>
                {users?.users?.map((el , index) => (
                  <tr key={el._id} className='border border-gray-500'>
                      <td className='py-2 px-4'>{index + 1}</td>

                      <td className='py-2 px-4'>
                        {editEl?._id === el._id ?
                      <InputForm
                      register={register}
                      fullWidth
                      errors={errors}
                      defaultValue={editEl?.email}
                      id={'email'}
                      validate={{
                        required : 'Require' ,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      }}
                      /> : <span>{el.email}</span>}
                      </td>

                      <td className='py-2 px-4'>{editEl?._id === el._id ?
                      <InputForm
                      register={register}
                      fullWidth errors={errors}
                      defaultValue={editEl?.firstname}
                      id={'firstname'}
                      validate={{required : 'Require'}}
                      /> : <span>{el.firstname}</span>}</td>

                      <td className='py-2 px-4'>
                        {editEl?._id === el._id ?
                      <InputForm
                      register={register}
                      fullWidth errors={errors}
                      defaultValue={editEl?.lastname}
                      id={'lastname'}
                      validate={{required : 'Require'}}
                      /> : <span>{el.lastname}</span>}</td>

                      <td className='py-2 px-4'>
                        {editEl?._id === el._id ?
                      <Select
                      register={register}
                      fullWidth
                      errors={errors}
                      defaultValue={el.role}
                      id={'role'}
                      validate={{required : "Required"}}
                      options={roles}
                      /> : <span>{roles.find(role => +role.code === +el.role)?.value}</span>}</td>

                      <td className='py-2 px-4'>
                        {editEl?._id === el._id ?
                        <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editEl?.mobile}
                        id={'mobile'}
                        validate={{required : 'Require' ,
                        pattern: {
                          value: /^[62|0]+\d{9}/gi,
                          message: "invalid phone number"
                        }
                      }}
                        /> : <span>{el.mobile}</span>}</td>

                      <td className='py-2 px-4'>
                        {editEl?._id === el._id ?
                        <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={el.isBlocked}
                        id={'isBlocked'}
                        validate={{required : "Required"}}
                        options={blockStatus}
                        /> : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>}</td>

                      <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                      <td className='py-2 px-4 '>
                        {editEl?._id === el._id ?  <span onClick={() => setEditEl(null)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Back</span>
                      :  <span onClick={() => setEditEl(el)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Edit</span>
                      }
                          <span onClick={() => handleDeleteUser(el._id) } className='px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
          <div className='w-full flex justify-end'>
            <Pagination
            totalCount={users?.counts}
            />
          </div>
      </div>
    </div>
  )
}

export default ManageUser