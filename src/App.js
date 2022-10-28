import Products from './components/Products';
import CreateProducts from './components/CreateProducts';
import UpdateProducts from './components/UpdateProducts';
import { Link, Routes,Route, } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <Link to='/'>
          <h1 className="title-app"> Running App Firebase</h1>
        </Link>
        
        <Routes>
          <Route path ='/' element={ <Products />} />
          <Route path ='/create' element={ <CreateProducts />} />
          <Route path ='/update' element={ <UpdateProducts />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
