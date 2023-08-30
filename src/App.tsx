import { useState } from 'react';
import { products as initialProducts } from './products.json';
import { priceFormatter } from './utils/formatter';

import './App.scss'

function App() {
  const [products, setProducts] = useState(initialProducts);

  function handleAddToWishList(id: number) {
    const findProductAndAddToWishList = products.map(product =>
      product.id === id ? { ...product, addedToWishlist: !product.addedToWishlist } : product
    );
    setProducts(findProductAndAddToWishList)
  }

  function handleAddToCart(id: number) {
    const findProductAndAddToCart = products.map(product =>
      product.id === id ? { ...product, addedToCart: !product.addedToCart } : product
    );
    setProducts(findProductAndAddToCart)
  }

  return (
    <div className='app'>
      {products.map(product => (
        <div key={product.id} className='card'>
          <div className='top'>
            <img src={product.productImage} alt={product.productName} className='productImage' />
            {product.addedToWishlist ? (
              <div
                role='button'
                className='addedToWishList'
                onClick={() => handleAddToWishList(product.id)}
              />
            ) : (
              <div
                role='button'
                className='wishListButton'
                onClick={() => handleAddToWishList(product.id)}
              />
            )}
          </div>

          <div className='productName'>
            {product.productName}
          </div>

          <div className='productPriceContainer'>
            <p className='productPrice'>
              {priceFormatter.format(product.productPrice)}
            </p>
            <p className='productWithDiscount'>
              {priceFormatter.format(product.productWithDiscount)}
            </p>
            <p className='productInstallments'>
              em até
              <span>
                {product.productInstallments}
              </span>
              sem juros
            </p>
          </div>

          <footer className='addToCartButtonContainer'>
            {product.addedToCart ? (
              <button
                className='addedToCartButton'
                onClick={() => handleAddToCart(product.id)}
              >
                <span>Adicionado</span>
              </button>
            ) : (
              <button
                className='addToCartButton'
                onClick={() => handleAddToCart(product.id)}
              >
                Adicionar
              </button>
            )}
          </footer>
        </div>
      ))}
    </div>
  )
}

export default App
