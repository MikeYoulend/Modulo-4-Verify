
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');

    const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

    async function fetchProductDetails() {
      try {
        const response = await fetch(API_URL + productId, {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZWU0MGRmZmI4YjAwMTQ0MTNjZmQiLCJpYXQiOjE2OTI4NzY1NDIsImV4cCI6MTY5NDA4NjE0Mn0.GlmcbaOIMkkQh_jSDOvlPlS1zN_iPHL4AdnWrHR1SuE"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const product = await response.json();
        displayProductDetails(product);

      } catch (error) {
        console.log('Errore nel recupero dei dettagli del prodotto: ', error);
      }
    }

    function displayProductDetails(product) {
      const productImage = document.getElementById('productImage');
      const productName = document.getElementById('productName');
      const productDescription = document.getElementById('productDescription');
      const productBrand = document.getElementById('productBrand');
      const productPrice = document.getElementById('productPrice');
      const backButton = document.getElementById('backButton');

      productImage.src = product.imageUrl;
      productName.textContent = product.name;
      productDescription.textContent = product.description;
      productBrand.textContent = `Brand: ${product.brand}`;
      productPrice.textContent = `Price: $${product.price}`;

      backButton.addEventListener('click', () => {
        window.location.href = 'Main.html';
      });
    }

    fetchProductDetails();
  

    function goBack() {
        window.location.href = 'Main.html';
    }
    