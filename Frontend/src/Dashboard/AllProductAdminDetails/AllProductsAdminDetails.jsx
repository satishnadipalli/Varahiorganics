import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';/
import { DeleteIcon, EditIcon, PlusIcon } from '../../../Heroicons';
import NewProduct from '../NewProduct';
// import { addAdminProducts } from '../../Redux/CartSlice';
import ShippingLabel from './UpdateProduct';
// import LoadingAnimation from '../../../loadingAnimation';
// import { addElectronics } from '../../CategoerySlice/CategerySlice';

const AllProductsAdminDetails = () => {
  const [isOpen,setIsOpen] = useState(false);
  const [isUpdateFormOpen,setIsUpdateForm] = useState(false);
  const [clickedProduct,setClickedProduct] = useState(null);
  // const {loginDetails,adminProducts} = useSelector(state=>state.cart);
  const [loading,SetIsLoading] = useState(true);
  const [allProducts,setAllProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    // if(loginDetails){

    //     async function getProducts(){
    //       try {
    //           const response = await fetch("https://varahiorganics.onrender.com/getallproducts",{
    //           method:"GET",
    //           headers:{
    //             "Authorization" : `Bearer ${loginDetails.token}`
    //           }
    //         })
    //         if(response.ok){
    //           const {products} = await response.json()
    //           setAllProducts(products);
    //           const electronics = products.filter(product=>product.categoery === 'Electronics');
    //           console.log(electronics,"these are your electrinics")
              
    //           dispatch(addAdminProducts(products));
    //           SetIsLoading(false);
    //         }
    //       } catch (error) {
    //         console.log("error while fetching All products",error);
    //       }finally{
    //         SetIsLoading(false);
    //       }
    //     }
    //   getProducts();
    // }
  },[])

  function OpenUpdateForm(element){
    setClickedProduct(element);
    setIsUpdateForm(true);
  }

  async function handleDeleteProduct(element){
    
    
  }

  if(loading){
    return(
      <div className='w-full min-h-screen p-8 '>
        Loading...
     </div>
    )
  }

  return (
    <div className='w-full min-h-screen flex flex-col relative p-10 pt-0'>
      <div className='flex justify-between items-center '>
      <span style={{ fontSize: '18px' }} className='text-center font-semibold text-gray-700 mt-7 mb-4'>
        ALL PRODUCTS
      </span>
      <button onClick={()=>setIsOpen(true)} className='py-2 px-2 h-8 bg-orange-600 flex gap-2 text-sm font-semibold text-white justify-center items-center'>
        <PlusIcon/>
        <span>Add a New Product</span>
      </button>
      </div>
      <table className='pl-4'>

        <tbody>
        <tr className='text-sm font-semibold text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-10 pl-2'>
            <td>Product Id</td>
            <td>Product Name</td>
            <td>Instock</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
          {
           adminProducts && adminProducts.length>0 && adminProducts.map((element)=>{
              return(
                <tr className='text-sm h-7 hover:text-gray-800 text-gray-700 hover:bg-gray-300'>
                  <td>{element._id}</td>
                  <td>{element.title}</td>
                  <td>{element.quantity}</td>
                  <td>{element.price}</td>
                  <td className='flex gap-3 items-center justify-between  h-7'>
                    <div onClick={()=>handleDeleteProduct(element)}><DeleteIcon/></div>
                    <div onClick={()=>OpenUpdateForm(element)}><EditIcon/></div></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {isOpen && <NewProduct setIsOpen={setIsOpen} setAllProducts={setAllProducts} SetIsLoading={SetIsLoading} />}
      {isUpdateFormOpen && <ShippingLabel setIsUpdateForm={setIsUpdateForm} clickedProduct={clickedProduct}/>}
    </div>
  );
};

export default AllProductsAdminDetails;

