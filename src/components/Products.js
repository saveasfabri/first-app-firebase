import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { db } from '../firebase/firebase.js';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
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
  /* console.log("🚀 ~ Products ~ products", products) */
  const alertDeleteProducts = (id) => {
    /* Reemplazamos Swal por MySwal declarada arriba */
    MySwal.fire({
      title: 'Are you sure to delete this products?',
      text: "This action don´t have reverse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        deleteProduct(id);       
        MySwal.fire({
          /* Se cambia del original de la documentacion para mantener la realecion con los otros alert */
          title: 'Deleted!',
          text: 'Your Product has been deleted',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  const deleteProduct = async (id) => {
    const productToDelete = doc(db, 'products', id);
    try{
      await deleteDoc (productToDelete);
    } catch(error){
      /* Reemplazamos Swal por MySwal declarada arriba */
      MySwal.fire({
        title: 'Error!',
        text: 'Your Product has not been deleted',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }    
    getProducts();
  }
  useEffect(()=> {
    getProducts();
    /* El comentario eslint de la linea 68, se debe agregar para evitar avertencia (error de React)*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <div className='products-container'>
        <h2> Products</h2>
        <Link to='/create'>
          <Button className='btn-product' variant='success'>Create Product</Button>
        </Link>
        {products.map((product) => {
          return (
            <div className='products'
              key = { product.id }>
              <h3>{ product.title }</h3>
              <p>{ product.description }</p>
              <p>{ product.id }</p>
              <Button  className='btn-delete' variant='danger' onClick={ () => {alertDeleteProducts(product.id)} }>Delete product</Button>
              <Link to='/update'>
                <Button className='btn-update'>Update Products</Button>
              </Link>
            </div>
          )
        })}
    </div>
  );
}

export default Products;
