import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { db } from '../firebase/firebase.js';
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import { Button } from 'react-bootstrap';



const MySwal = withReactContent(Swal);

const Products = () => {  
  const [products,setProducts] = useState ([]);
  

  const productsCollection = collection(db, 'products');

  const getProducts = async () => {
    const dataProducts = await getDocs(productsCollection);
    /* console.log("🚀 ~ getProducts ~ dataProducts", dataProducts) */
    setProducts(
      dataProducts.docs.map((doc) => ({...doc.data(), id: doc.id}))
      )
  };
  console.log("🚀 ~ Products ~ products", products)
  useEffect(()=> {
    getProducts();
  }, [] );

  return (
    <div className='subtitle products'>
        <h2> Products</h2>
        {products.map((product) => {
          return (
            <div key = { product.id }>
              <h3>{ product.title }</h3>
              <p>{ product.description }</p>
              <p>*******************************************</p>
            </div>
          )
        })}
    </div>
  );
}

export default Products;
