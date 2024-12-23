import React, { useEffect, useState } from "react";
import "./Admin.css";
import Loading from "../components/Loading/Loading";
import NewProduct from "../Dashboard/NewProduct";
import UpdateAdminModel from "../Dashboard/Users.jsx/updateAdimModel";
import ShippingLabel from "../Dashboard/AllProductAdminDetails/UpdateProduct";



const Admin = () => {
  const [homeProducts,setHomeProducts] = useState([]);
  const [isadd,setisadd] = useState(false);
  const [isupdate,setisupdate] = useState(false);
  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const response = await fetch(`https://varahiorganics.onrender.com/getproducts`,{
          method : "GET"
        });
        const data = await response.json();
        if(data.products){
          console.log(data.products)
          setHomeProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  },[]);

  if(!homeProducts || homeProducts.length <=0){
    return <Loading/>
  }
  
  return (
    <div>
    <div className="table-container-a" style={{marginTop:"50px",minHeight:"100vh",position:"relative"}}>
      <div className="header-as">
        <h1>All Products</h1>
        <button className="download-button" onClick={()=>setisadd(true)}>Add Product</button>
      </div>
      <table className="products-table-ad">
        <thead>
        <tr>
            <th>Sr No</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homeProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.createdAt}</td>
              <td className="ac-btns">
                <button style={{color:"orange"}} onClick={()=>setisupdate(true)}>Update</button>
                <button style={{color:"red"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    {  
    isadd &&
    <div
    style={{
      height:"100vh",
      width:"100%",
      position:'absolute',
      top:0,
      left:0,
      display:"flex",
      alignItems:"center",
      marginTop:"100px",
      justifyContent:"center"
    }}
  >
    <NewProduct setisadd={setisadd}/>
    </div>
    }
    {/* <UpdateAdminModel/> */}
   {
    isupdate &&
   <div
    style={{
      height:"100vh",
      width:"100%",
      position:'absolute',
      top:0,
      left:0,
      display:"flex",
      alignItems:"center",
      // marginTop:"100px",
      justifyContent:"center"
    }}
  >
      <ShippingLabel/>
    </div>
}
    </div>
    </div>
  );
};

export default Admin;
