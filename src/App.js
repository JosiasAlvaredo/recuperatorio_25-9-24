import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]); 
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleCategoryChange = (event) => setCategory(event.target.value)

  const handleFilterProducts = () => {
    const filtered = products.filter(product => product.category === category);
    setFilter(filtered);
  }

  const handleError = () =>  setErrorMessage("Seleccione una categoria valida");

  return (
    <main>

      <h1>Recuperatorio Requests con React</h1>

      <div>
        <h2>Lista de todos los productos disponibles:</h2>
        <p className="result-box">
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
              </li>
            ))}
          </ul>
        </p>
      </div>

      <div>
        <h2>Obtener productos de una categoría determinada</h2>

        <h3>Ingrese una categoría:</h3>
        {
        /* <input type="text" value={category} onChange={handleCategoryChange}/>  */
        //esta parte es la del input, solo esta comentanada para que no se pierda la actividad 2
        } 

        <select onChange={handleCategoryChange} defaultValue={""} className="result-box">
          <option value="">Seleccione una categoría</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <button onClick={handleFilterProducts}>Enviar</button>
        
        <h3>Productos de la categoría ingresada:</h3>
        <p className="result-box">
          <ul>
            {filter.map(product => (
              <li key={product.id}>
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
              </li>
            ))}
          </ul>
        </p>
      </div>

      <div>
        <h2>Mensaje en caso de error:</h2>
        <p className="result-box" onSubmit={handleError}>{errorMessage}</p>
      </div>

      <div>
        <h2>Carritos con al menos 2 productos:</h2>
        <p className="result-box"></p>
      </div>

    </main>
  );
}

export default App;
