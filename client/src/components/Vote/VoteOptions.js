import React, { memo, useRef , useEffect , useState } from 'react'
import logo from 'assets/logo.png'
import { voteOptions } from 'ultils/contanst'
import {AiFillStar} from 'react-icons/ai'
import {Button} from 'components'

const VoteOptions = ({nameProduct , handleSubmitVoteOption}) => {
  const modalRef = useRef()
  const [choosenScore, setChoosenScore] = useState(null)
  const [comment, setComment] = useState('')
  const [score, setScore] = useState(null)


  useEffect(() => {
    modalRef.current.scrollIntoView({block : 'center' , behavior : 'smooth'})
  }, [])

  return (
    <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center'>
      <img src={logo} alt="logo" className='w-[300px] my-8 object-contain' />
      <h2 className='text-center text-medium text-lg'>{`Voting product ${nameProduct}`}</h2>
      <textarea
      className='form-textarea w-full placeholder:italic placeholder:text-sm placeholder:text-gray-500'
      placeholder='Type something'
      value={comment}
      onChange={e => setComment(e.target.value)}
      ></textarea>
      <div className='w-full flex flex-col gap-4'>
        <p>How do you like this product?</p>
        <div className='flex justify-center gap-4 items-center'>
          {voteOptions.map(el =>(
            <div
            className=' w-[100px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2'
            key={el.id}
            onClick={() =>{
              setChoosenScore(el.id)
              setScore(el.id)
            }}
            >
              {(Number(choosenScore) && choosenScore >= el.id) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
      fw
      handleOnClick={() => handleSubmitVoteOption({comment , score })}
      >
        Submit
      </Button>
    </div>
  )
}

export default memo(VoteOptions)