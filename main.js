const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

async function fetchUsers() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZWU0MGRmZmI4YjAwMTQ0MTNjZmQiLCJpYXQiOjE2OTI4NzY1NDIsImV4cCI6MTY5NDA4NjE0Mn0.GlmcbaOIMkkQh_jSDOvlPlS1zN_iPHL4AdnWrHR1SuE"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayUsers(data);

  } catch (error) {
    console.log('Errore nel recupero dei prodotti: ', error);
  }
}

function displayUsers(products) {
  const productlist = document.getElementById('productList');
  productlist.innerHTML = '';

  products.forEach(product => {
    const card = `
    <div class="card shadow-lg m-2 bg-dark text-white" style="width: 15rem; height: 500px;">
    <a href="product.html?id=${product._id}"> <!-- Aggiunto il link all'immagine -->
        <img src="${product.imageUrl}" style="width: 238px; height: 180px; object-fit: cover;" class="card-img-top rounded">
      </a>
    <div class="card-body w-100 h-25 pb-0">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text text-truncate">${product.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item bg-dark text-white">Brand: ${product.brand}</li>
      <li class="list-group-item bg-dark text-white">Price: $${product.price}</li>
    </ul>
    <div class="card-body d-flex flex-row justify-content-center mb-0 h-0">
      <button class="btn btn-primary" onclick="editProduct('${product._id}')">Modifica</button>
      <button class="btn btn-danger ms-3" onclick="DeleteProduct('${product._id}')">Cancella</button>
    </div>
  </div>
    `;
    productlist.innerHTML += card;
  });
}





function addUsers() {
  window.location.href = 'Add.html';
}


async function DeleteProduct(productId) {
  console.log(productId);
  const headers = {
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZWU0MGRmZmI4YjAwMTQ0MTNjZmQiLCJpYXQiOjE2OTI4NzY1NDIsImV4cCI6MTY5NDA4NjE0Mn0.GlmcbaOIMkkQh_jSDOvlPlS1zN_iPHL4AdnWrHR1SuE`
  };
  if (confirm('Sei sicuro di voler cancellare il prodotto?')) {

    try {
      const response = await fetch(API_URL + productId, {
        method: 'DELETE',
        headers: headers
      });
      window.location.href = 'Main.html';

      if (response.ok) {
        const data = await response.json();
        displayUsers(data);
      }

    } catch (error) {
      console.error('Errore nella cancellazione del prodotto: ', error);
    }
  }
}

async function editProduct(productId) {
 window.location.href = `Add.html?id=${productId}`
}

fetchUsers();