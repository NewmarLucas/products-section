function formatCurrency(value) {
  return Number(value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
};

function generateRatingStars(value) {
  const filledStars = Array.from(Array(Math.floor(value))).map((_) => `<li><i class="fa fa-star" aria-hidden="true"></i></li>`).join('')
  const halfStarts = value % 1 !== 0 ? `<li><i class="fa fa-star-half-o" aria-hidden="true"></i></li>` : ''
  const emptyStars = Array.from(Array(5 - Math.ceil(value))).map((_) => `<li><i class="fa fa-star-o" aria-hidden="true"></i></li>`).join('')
  return filledStars + halfStarts + emptyStars
}

function createCards(data) {
  document.getElementById('section').innerHTML = data.map(product =>
    `<div class="card">
        <button onClick="handleFavorite()" class="fav-button">
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </button>
        <img
          class="product-image"
          src="${product.thumbnail}"
          alt="${product.title}"
        />
        <div class="product-data">
          <div>
            <span class="product-stock">Stock: ${product.stock}</span>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">
              ${product.description}
            </p>
          </div>
          <div>
            <div class="product-price">
              <h5>${product.price}</h5>
              <small>${product.discountPercentage} OFF</small>
            </div>
            <ul>
              ${generateRatingStars(product.rating)}
            </ul>
          </div>
        </div>
        <button onClick="handleBuy()" class="buy-button">Buy Now</button>
      </div>`
  ).join('')
}

(function getProducts() {
  fetch('https://dummyjson.com/products?limit=10')
    .then(res => res.json())
    .then(res => {
      const data = res?.products?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: formatCurrency(item.price),
        discountPercentage: item.discountPercentage + '%',
        rating: item.rating,
        stock: item.stock,
        brand: item.brand,
        category: item.category,
        thumbnail: item.thumbnail,
      }))

      createCards(data)
    })
})()

function handleFavorite() {
  alert('Favorited!')
}

function handleBuy() {
  alert('Success!')
}