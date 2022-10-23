import Products from './components/Products';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title-app"> Running App Firebase</h1>
        <Products />
      </header>
    </div>
  );
}

export default App;
