import { Button, InputForm } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avatarDefault.png'
import { apiUpdateCurrent } from 'apis'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncAction'

const Personal = () => {
  const { register  , formState : {errors , isDirty} ,reset ,handleSubmit} = useForm()
  const {current} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    reset({
      firstname : current?.firstname,
      lastname : current?.lastname,
      email : current?.email,
      mobile : current?.mobile,
      avatar : current?.avatar
    })
  }, [])

  const handleUpdateInfo = async (data) => {
    const formData = new FormData()
    if(data.avatar.length > 0) formData.append('avatar' , data.avatar[0])
      delete data.avatar
    for(let i of Object.entries(current)) {
      formData.append(i[0] , i[1])
    }
    const response = await apiUpdateCurrent(formData)
    if(response.success) {
      dispatch(getCurrent())
      toast.success(response.mes)
    }else{
      toast.error(response.mes)
    }
  }

  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>
        Personal
      </header>
      <form onSubmit={handleSubmit(handleUpdateInfo)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
      <InputForm
            label='Firtname'
            register={register}
            errors={errors}
            id='firstname'
            validate={{
              required : 'Need fill this field'
            }}
            />
        <InputForm
            label='Lastname'
            register={register}
            errors={errors}
            id='lastname'
            validate={{
              required : 'Need fill this field'
            }}
            />
            <InputForm
            label='Email'
            register={register}
            errors={errors}
            id='email'
            validate={{
              required : 'Need fill this field' ,
              pattern : {
                value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message : 'Invalid email address'
              }
            }}
            />
            <InputForm
            label='Phone'
            register={register}
            errors={errors}
            id='mobile'
            validate={{
              required : 'Need fill this field',
              pattern : {
                value : /^[0-9]+$/,
                message : 'Must be only number'
              }
            }}
            />
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Account status:</span>
              <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Role:</span>
              <span>{+current?.role === 2002 ? 'Admin' : 'User'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Created At:</span>
              <span>{moment(current?.createdAt).fromNow()}</span>
            </div>
            <div className='fle flex-col justify-center gap-2'>
              <span className='font-medium'>Profile image : </span>
              <label htmlFor="file">
              <img src={current?.avatar || avatar} alt="" className='w-20 h-20 ml-8 rounded-full object-cover'/>
              </label>
              <input type="file" id="file" {...register('avatar')} hidden />
            </div>
            {isDirty &&  <div className='w-full flex justify-end'>
            <Button type='submit'>
              Update infomation
            </Button>
            </div>}
      </form>
    </div>
  )
}

export default Personal