import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
// import { logout } from '../Redux/CartSlice';
import { Buy, Buyed, CurrentUsers, DashboardIcon, LogoutIcon, New, OrderIcon,  ProductsIcon,  Saved, SwitchAccount } from '../../Heroicons';
import SavedProducts from './SavedProducts';
import NewProduct from './NewProduct';
import BuyedProducts from './BuyedProducts';
import { Link } from 'react-router-dom';
import Profile from './addnewProduct/Profile';
import Users from './Users.jsx/Users';
import Orders from './Orders/Orders';
import AllProductsAdminDetails from './AllProductAdminDetails/AllProductsAdminDetails';
// import CancellationRequests from './CancellationRequests';
// import AnalizeThings from './AnalizeThings';
import Tabs from './CancellationRequests';



const Dashboard = ({setComponent,component}) => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {loginDetails,userLocation} = useSelector(state=>state.cart)
    const [tab,setTab] = useState('saved')
    const [open,setisOpen] = useState(false);


	function handleTab(tab){
		setTab(tab);
	}

    function logouts(){
        // dispatch(logout());
    }

    function handleProfile(){
        if(tab==='saved'){
            return <SavedProducts tab={tab}/>
        }
        else{
            return <BuyedProducts/>
        }
    }

    function logoutFromAccount(){
        // dispatch(logout())
        window.location = '/Auth'
    }

    function logoutUser(){
        setisOpen(true);
    }

    function handleSwithAccount(){
        window.location = '/Auth'
    }
  return (
    <div className='w-full h-full relative flex relative overflow-hidden pb-24 pt-24 '>
        <div style={{borderRight:"1px solid grey"}} className='flex gap-3 flex-col w-72 p-3 bg-white h-full fixed'>
            <div className='flex items-center gap-2 mt-7'>
                <img className='h-14 w-14' src="https://ativancouver.ca/wp-content/uploads/jet-engine-forms/12/2023/01/lord-krishna-arjuna-logo-small-sig-1536x1536.png" alt="" />
                <span className='font-bold text-gray-700 '>KRI-SA EComerce</span>
            </div>
            {
                true && 
                <div onClick={()=>setComponent("users")} className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                    <CurrentUsers/>
                <span>Users</span>
                </div>
            }
            
            {
                true &&
                    <div onClick={()=>setComponent("products")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                        <ProductsIcon/>
                        <span>Products</span>
                    </div>
            }
            <div onClick={()=>setComponent("orders")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <OrderIcon/>
                <span>Orders</span>
            </div>

            {/* <div onClick={()=>setComponent("profile")}  className='flex gap-4 items-center hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <img 
                    src={loginDetails.profilePhoto ? "https://varahiorganics.onrender.com/uploads/"+loginDetails?.profilePhoto : "https://th.bing.com/th/id/OIP.F8Bj6Mbos5kTCtNPlEElMAHaHa?rs=1&pid=ImgDetMain"} 
                    alt="" className='w-8 h-8 rounded-full' 
                    onError={(e) => {
                        e.target.src = 'https://th.bing.com/th/id/OIP.TpqSE-tsrMBbQurUw2Su-AHaHk?rs=1&pid=ImgDetMain'; 
                    }}
                />
                <span>Profile</span>
            </div> */}
            <div onClick={()=>setComponent("savedproducts")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <Saved/>
                <span>Saved Products</span>
            </div>
            <div onClick={logoutUser}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <LogoutIcon/>
                <span>Logout</span>
            </div>

            <div onClick={()=>setComponent("productsbuyed")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <Buyed/>
                <span>Products Buyed</span>
            </div>
            <div onClick={()=>setComponent("analyse")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <DashboardIcon/>
                <span>Dashboard</span>
            </div>

            <div onClick={()=>navigate("/rewardpoints")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <Saved/>
                <span>Reward points</span>
            </div>


            {   
                true &&
                <Link to={"/delivery-dashboard"}>
                    <div  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                    <SwitchAccount/>
                    <span>Delivery Dashboard</span>
                    </div>
                </Link>
            }

            {
                true &&
                <div onClick={()=>setComponent("canelationrequests")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                    <ProductsIcon/>
                    <span>Cancellation Requests</span>
                </div>
            }
            {/* <div onClick={()=>setComponent("canelationrequests")}  className='flex gap-4 hover:bg-gray-200 py-2 px-3 hover:rounded-lg hover:scale-105'>
                <ProductsIcon/>
                <span>Cancellation Requests</span>
            </div> */}

        </div>
        {
            <div className='w-full ml-72 mt-10 '>
                {component == 'profile' && 
                <Profile handleProfile={handleProfile} handleTab={handleTab} logouts={logouts} tab={tab}/> ||  
                component == 'users' && <Users/> || 
                component=='orders' && <Orders setComponent={setComponent}/> || 
                component ==="productsbuyed" && <BuyedProducts/> ||
                component == "canelationrequests" && <Tabs/> ||
                component == 'products' && <AllProductsAdminDetails/>
                }
            </div>
        }
        {
            open && <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            className=' w-full  h-screen bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-40 absolute top-72 dashboard-main-div'
           >
            <div className='w-80 flex overflow-hidden items-center flex-col h-36 relative bg-white rounded-md dashboard-inner-div'>
                <span className='text-lg  text-gray-800 font-semibold mt-7'>Logging Out</span>
                <span className='text-sm  text-gray-600 font-semibold mt-2'>You need Log back</span>
                <button onClick={logoutFromAccount} style={{borderTop:"1px solid gray"}} className='w-full hover:bg-gray-200  border-t-2 border-gray-700   py-2 mt-1  absolute bottom-0'>Logout</button>
            </div>
           
        </div>
        }
         
        
    </div>
  )
}

export default Dashboard