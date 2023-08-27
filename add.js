// Definizione dell'URL dell'API
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

// Ottenimento dei riferimenti agli elementi del form
const form = document.getElementById('user-form');

const userIdInput = document.getElementById('user-id');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('imageURL');




form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const isFormValid = handelformvalidation();
    if (!isFormValid) return false;

    // Creazione dell'oggetto "product" con i dati del form
    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        price: priceInput.value,
        imageUrl: imageInput.value
    }


    // Invio della richiesta POST all'API per creare un nuovo prodotto
    try {

        const URL = userIdInput.value ? `${API_URL}${userIdInput.value}` : `${API_URL}`
        const HTTP_METHOD = userIdInput.value ? 'PUT' : 'POST'
       
        //POST
        const response = await fetch(URL, {
            method: HTTP_METHOD,
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZWU0MGRmZmI4YjAwMTQ0MTNjZmQiLCJpYXQiOjE2OTI4NzY1NDIsImV4cCI6MTY5NDA4NjE0Mn0.GlmcbaOIMkkQh_jSDOvlPlS1zN_iPHL4AdnWrHR1SuE"

            }

        })

        if (response.ok) {
            window.location.href = 'Main.html'
        } else {
            alert('Si è verificato un errore durante la creazione del prodotto.')
        }



    } catch (error) {
        console.log('errore nel salvataggio del prodotto:', error);
        alert('errore nel salvataggio del prodotto');
    }

});



// Funzione per ottenere e visualizzare i prodotti
async function displayProducts() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZWU0MGRmZmI4YjAwMTQ0MTNjZmQiLCJpYXQiOjE2OTI4NzY1NDIsImV4cCI6MTY5NDA4NjE0Mn0.GlmcbaOIMkkQh_jSDOvlPlS1zN_iPHL4AdnWrHR1SuE"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        const productListContainer = document.getElementById('productList');

        products.forEach(product => {
            const row = `
          <tr>
            <td>${product._id}</td>
            <td>${product.name}</td>
            <td>${product.description.slice(0,30)}...</td>
            <td>${product.brand}</td>
            <td>${product.price}</td>
            <td>${product.imageUrl.slice(0,15)}...</td>
            <td> <button class="btn btn-primary" onclick="editProduct('${product._id}')">Modifica</button> </td>
            <td> <button class="btn btn-danger" onclick="DeleteProduct('${product._id}')">Cancella</button> </td>
          </tr>
        `;
            productListContainer.innerHTML += row;
        });



    } catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
    }
}





function handelformvalidation() {
    const validation = validateform();
    let isValid = true;

    if (!validation.isValid) {

        for (const field in validation.errors) {
            const errorelement = document.getElementById(field + 'Error');
            errorelement.textContent = "";
            errorelement.textContent = validation.errors[field];
        }

        isValid = false;
    }

    return isValid;

}



function validateform() {
    const errors = {}

    const name = nameInput.value;
    const description = descriptionInput.value;
    const brand = brandInput.value;
    const price = priceInput.value;
    const imageURL = imageInput.value;

    if (!name)
        errors.name = 'Il nome è obbligatorio'
    else errors.name = '';

    if (!description)
        errors.description = 'La descrizione è obbligatoria'
    else errors.description = '';

    if (!brand)
        errors.brand = 'Il brand è obbligatorio'
    else errors.brand = '';

    if (!price)
        errors.price = 'Il prezzo è obbligatorio'
    else errors.price = '';

    if (!imageURL)
        errors.imageURL = 'L\'immagine è obbligatoria'
    else if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(imageURL)) errors.imageURL = '';
    else errors.imageURL = 'Image URL is not valid';

    return {
        isValid: Object.values(errors).every(value => value === ''),
        errors
    }

}


function goBack() {
    window.location.href = 'Main.html';
}

async function getProductData() {
    const qsParams = new URLSearchParams(window.location.search);
    const id = qsParams.get("id");


    if (id) {
        const response = await fetch(API_URL + id, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZWU0MGRmZmI4YjAwMTQ0MTNjZmQiLCJpYXQiOjE2OTI4NzY1NDIsImV4cCI6MTY5NDA4NjE0Mn0.GlmcbaOIMkkQh_jSDOvlPlS1zN_iPHL4AdnWrHR1SuE`
            }
        });
        const product = await response.json();

        userIdInput.value = product._id;
        nameInput.value = product.name;
        descriptionInput.value = product.description;
        brandInput.value = product.brand;
        priceInput.value = product.price;
        imageInput.value = product.imageUrl;

        
    }
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
       window.location.href = 'Add.html';
  
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

displayProducts();


getProductData();