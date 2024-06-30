import React ,{useEffect} from 'react';
import {Route , Routes} from 'react-router-dom'
import {Login , Home , Public , Blogs ,DetailProduct ,FAQ , Services ,Products ,FinalRegister , ResetPassword, DetailCart} from './pages/public'
import path from './ultils/path';
import { AdminLayout , ManageOrder , ManageProduct , ManageUser , CreateProducts, DashBoard } from 'pages/admin'
import { MemberLayout , Personal , MyCart , Whishlist , History, Checkout } from 'pages/member'
import {getCategories} from './store/app/asyncAction'
import {useDispatch , useSelector} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart, Modal } from './components';
import { showCart } from 'store/app/appSlice';


function App() {
  const dispatch = useDispatch()
  const {isShowModal , modalChildren , isShowCart} = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main h-screen">
      {isShowCart &&
      <div onClick={() => dispatch(showCart())} className='absolute inset-0 bg-overlay z-50 flex justify-end'>
        <Cart />
      </div>}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
              <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.PUBLIC} element={<Public/>}>
              <Route path={path.HOME} element={<Home />} />
              <Route path={path.BLOGS} element={<Blogs />} />
              <Route path={path.DETAILS_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
              <Route path={path.FAQ} element={<FAQ />} />
              <Route path={path.OUR_SERVICES} element={<Services />} />
              <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
              <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
              <Route path={path.ALL} element={<Home />} />
          </Route>
          <Route path={path.ADMIN} element={<AdminLayout />}>
              <Route path={path.DASHBOARD} element={<DashBoard />} />
              <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
              <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct/>} />
              <Route path={path.MANAGE_USER} element={<ManageUser />} />
              <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
          </Route>
          <Route path={path.MEMBER} element={<MemberLayout />}>
              <Route path={path.PERSONAL} element={<Personal />} />
              <Route path={path.MY_CART} element={<DetailCart />} />
              <Route path={path.WHISHLIST} element={<Whishlist />} />
              <Route path={path.HISTORY} element={<History />} />
          </Route>
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
    </div>
  );
}

export default App;
