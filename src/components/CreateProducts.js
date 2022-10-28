import '../Styles/styles.css'
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import whitReactContent from "sweetalert2-react-content";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';

const CreateProducts = () => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [stock,setStock] = useState(0);

  const navigate = useNavigate();

  const mySwal = whitReactContent(swal);

  const productCollection = collection(db, 'products');

  const addProduct = async (event) => {
    event.preventDefault();
    try{
      await addDoc(productCollection, {title, description, stock});
      mySwal.fire({
        title: 'Created!',
        text: 'Your Product has been created successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      navigate('/');
    }catch{
      mySwal.fire({
        title: 'Error!',
        text: 'Your Product has not been created',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    };
  };

  return (
    <div className='create-products-container'>
        <h2 className='title-create'> Create Products</h2>
        <form onSubmit={ addProduct } className='form-create'>
          <input 
            name = 'title'
            type='text'
            placeholder="Title"
            value={ title }
            onChange = {(e) => setTitle(e.target.value)}
          />

          <input 
            name = 'description'
            type='text'
            placeholder="Description"
            value={ description }
            onChange = {(e) => setDescription(e.target.value)}
          />

          <input 
            name = 'stock'
            type='number'
            placeholder='Stock'
            value={stock}
            onChange = {(e) => setStock(e.target.value)}
          />
            
          <Button className='btn-create' variant='success' type='submit'>Create Product</Button>
        </form>
    </div>
  );
}

export default CreateProducts;
