import React ,{useState , useEffect} from 'react'
import {apiGetCategories} from '../apis/app'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../ultils/helpers'

const SideBar = () => {

  const [categories, setCategories] = useState(null)

  const fetchCategories = async () => {
    const response = await apiGetCategories()
    if(response.success) {
      setCategories(response.productCategories)
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <div>
      {categories?.map(el => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
        >
            {el.title}
        </NavLink>
      ))}
    </div>
  )
}

export default SideBar