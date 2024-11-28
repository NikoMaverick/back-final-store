const Product = require('../models/Product');

const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/style.css">
    <title>Futbol Nostalgia</title>
</head>
<body>
`

function getNavBar(isDashboard) {
    if (isDashboard) {
        return `
    <header class="headerTop">
        <div id="logoContainer">
            <a href="/" id="logoLink">
                <img src="/public/assets/FutbolRetro.webp" alt="Logo" id="logo" style="width: 100px; height: auto;">
            </a>
        </div>
    </header>
    <nav class="nav-Product" id="nav-Product">
            <ul class="navProduct" id="navProduct">
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/dashboard/category/spain">España</a></li>
                <li><a href="/dashboard/category/europa">Europa</a></li>
                <li><a href="/dashboard/category/seleccion">Selecciones</a></li>
                <li><a href="/dashboard/category/mundo">Resto del mundo</a></li>
                <li><a href="/dashboard/category/campeones">Oliver & Benji</a></li>
                <li><a href="/dashboard/new">Nuevo producto</a></li>
                <li><a href="/products">Cerrar Sesion</a></li>
            </ul>
        </nav>
    <main>
`
} 
else {
    return `
    <header class="headerTop">
        <div id="logoContainer">
            <a href="/" id="logoLink">
                <img src="/public/assets/FutbolRetro.webp" alt="Logo" id="logo" style="width: 100px; height: auto;">
            </a>
        </div>
    </header> 
    <nav class="nav-Product" id="nav-Product">
            <ul class="navProduct" id="navProduct">
                <li><a href="/products">Home</a></li>
                <li><a href="/products/category/spain">España</a></li>
                <li><a href="/products/category/europa">Europa</a></li>
                <li><a href="/products/category/selecciones">Selecciones</a></li>
                <li><a href="/products/category/mundo">Resto del mundo</a></li>
                <li><a href="/products/category/campeones">Oliver & Benji</a></li>
                <li><a href="/dashboard/">Iniciar Sesión</a></li>
            </ul>
        </nav> 
    <main>
`};
};


function getProductCards(products) {
    let html = '<section class="productCard id"productCard">';
    for (let product of products) {
      html += `
        <div class="product-card">
          <img src="/public/assets/${product.image}" alt="${product.team} ${product.year}">
          <h2>${product.team} Temp. ${product.year}</h2>
          <button class="homeBtn" onClick="window.location.href='/products/${product._id}'">Ver</button>
        </div>
      `;
    }
    return html;
  }

  function getProductCard(product) {
    let html = '<section class="productCard" id="productCard">';
      html += `
        <div class="product-card">
          <img src="/public/assets/${product.image}" alt="${product.team} ${product.year}">
          <h2>${product.team} Temp. ${product.year}</h2>
          <p>${product.description}</p>
          <p>Categoria: ${product.category}</p>
          <p>Pais: ${product.country}</p>
          <p>Liga: ${product.league}</p>
          <p><strong>${product.price}€</strong></p>
          <select name="size" class="sizeProduct" id="sizeProduct">
              <option value="" disabled selected>Talla</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
          </select>
          <input type="number" id="product-basket" name="product-basket" min="1" max="10" value="1" required>
          <button type="submit">Añadir a la cesta</button>
          <button class="homeBtn" onClick="window.location.href='/dashboard/${product._id}/edit'">Editar</button>
          <button class="homeBtn" id="deleteProduct">Borrar</button>

        </div>
        <script>
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("deleteProduct").addEventListener('click', function() {
            if(confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                fetch("/dashboard/${product._id}/delete", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la red');
                    }
                    return response.json(); 
                })
                .then(data => {
                    console.log('Éxito:', data);
                    alert('Producto eliminado correctamente');
                    window.location.href = '/dashboard'; 
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                console.log('Eliminación cancelada por el usuario');
            }
        });
    });
</script>
        
      `;
    
    return html;
  }

  const showProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        const productCards = getProductCards(products);
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + productCards + '</section></body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accessing products." });
    };
};


const createProduct = async (req, res) => {

    try {
        const { team, year, description, category, country, league, image, size, price } = req.body
        if (!team || !year || !description || !category || !country || !league || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await Product.create({
            team,
            year,
            description,
            category,
            country,
            league,
            image,
            size,
            price

        });
        res.redirect(`/dashboard/${product._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating the product" });
    };
};


const showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product) {
            return res.status(400).json({ messenge: "Product not found" })
        }
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + getProductCard(product) + '</section></body></html>';
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error accessing product", error});
    };
}


const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const html = baseHtml + getNavBar() + `
                <form method="POST" id="formEditProduct" action="/dashboard/${product._id}" enctype="multipart/form-data">
                
                    <div>
                            <h2 class="editH2">EDITAR PRODUCTO</h2>
                        </div>

                    <div>
                        <label for="name">Producto</label>
                        <input type="text" id="name" name="name" value="${product.team}" required>
                    </div>
                    

                    <div>
                        <label for="description">Descripción</label>
                        <textarea id="description" name="description" required>${product.description}</textarea>
                    </div>
                    

                    <div>
                        <label for="category">Categoría</label>
                        <select name="category" required>${product.category} class="categoryProduct" id="categoryProduct">
                            <option value="" disabled selected>Producto</option>
                            <option value="spain">España</option>
                            <option value="europa">Europa</option>
                            <option value="seleccion">Selecciones</option>
                            <option value="mundo">Resto del mundo</option>
                            <option value="campeones">Oliver & Benji</option>
                        </select>
                    </div>


                     <div>
                        <label for="image">Imagen</label>
                        <input type="file" id="image" name="image"
                        src="${product.image}" value="${product.team}">
                    </div>
                    

                    <div>
                        <label for="size">Talla</label>
                        <select name="size" class="sizeProduct" id="sizeProduct">
                            <option value="" disabled selected>Talla</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                    
                    
                    <div>
                        <label for="price">Precio</label>
                        <input type="number" id="price" name="price" value="${product.price}" required>
                    </div>
                    

                    <div>
                        <button type="submit">Actualizar producto</button>
                        <button type="button" class="cancelButton" id="cancelButton">Cancelar</button>    
                    </div>
                    
                </form>
            </main>
        </body>
        <script>
            document.getElementById('formEditProduct').addEventListener('submit', function(event) {
                    event.preventDefault();

                    const formData = new FormData(this);

                    
                    const data = {};
                    formData.forEach((value, key) => {
                        data[key] = value;
                    });

                    fetch("/dashboard/${product._id}", {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la red');
                        }
                        return response.json(); 
                    })
                    .then(data => {
                        console.log('Éxito:', data);
                        window.location.href="/dashboard/${product._id}"
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                });
                document.getElementById('cancelButton').addEventListener('click', function() {
                    window.history.back();
                });
        </script>
        </html>
        `;
        console.log(html)
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while accessing the product" });
    };
};

const showNewProduct = async (req, res) => {
    try {
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + `
                
                <div class="formProduct" id="formProduct">
                    <form action="/dashboard" method="POST">

                        <div>
                            <h2 class="createH2">Añadir Producto</h2>
                        </div>
                        

                        <div>
                            <label for="team">Equipo</label>
                            <input type="text" id="name" name="name" required>
                        </div>

                        <div>
                            <label for="year">Temporada</label>
                            <input type="text" id="year" name="year" required>
                        </div>
                        

                        <div>
                            <label for="description">Descripción</label>
                            <textarea id="description" name="description" required></textarea>
                        </div>
                        

                        <div>
                            <label for="category">Categoría</label>
                            <select name="category" class="categoryProduct" id="categoryProduct">
                                <option value="" disabled selected>Procedencia</option>
                                <option value="spain">España</option>
                                <option value="europa">Europa</option>
                                <option value="seleccion">Selecciones</option>
                                <option value="mundo">Resto del mundo</option>
                                <option value="campeones">Oliver & Benji</option>
                            </select>
                        </div>
                        

                        <div>
                            <label for="image">Imagen</label>
                            <input type="file" id="image" name="image">
                        </div>    
                        

                        <div>
                            <label for="size">Talla</label>
                            <select name="size" class="sizeProduct" id="sizeProduct">
                                <option value="" disabled selected>Talla</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                        

                        <div>
                            <label for="price">Precio</label>
                            <input type="number" id="price" name="price" min="0" value="0" required>
                        </div>
                        

                        <div>
                            <button type="submit" class="formCreateProduct" >Añadir producto</button>
                        </div>
            
                    </form>
                </div>
            </main>
        </body>
    </html>
    `;
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "The form cannot be accessed"});
    }
    
};





module.exports = {
    showProducts,
    createProduct,
    showProductById,
    showEditProduct,
    showNewProduct
}