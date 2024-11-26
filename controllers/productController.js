const Product = require('../models/Product');

const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/public/style.css">
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
                <img src="../public/assets/FutbolRetro.webp" alt="Logo" id="logo" style="width: 100px; height: auto;">
            </a>
        </div>
    </header>
    <nav class="nav-Product" id="nav-Product">
            <ul class="navProduct" id="navProduct">
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/dashboard/category/espana">España</a></li>
                <li><a href="/dashboard/category/europa">Europa</a></li>
                <li><a href="/dashboard/category/selecciones">Selecciones</a></li>
                <li><a href="/dashboard/category/mundo">Resto del mundo</a></li>
                <li><a href="/dashboard/category/dibujos">Oliver & Benji</a></li>
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
                <img src="../public/assets/FutbolRetro.webp" alt="Logo" id="logo" style="width: 100px; height: auto;">
            </a>
        </div>
    </header> 
    <nav class="nav-Product" id="nav-Product">
            <ul class="navProduct" id="navProduct">
                <li><a href="/products">Home</a></li>
                <li><a href="/products/category/espana">España</a></li>
                <li><a href="/products/category/europa">Europa</a></li>
                <li><a href="/products/category/selecciones">Selecciones</a></li>
                <li><a href="/products/category/mundo">Resto del mundo</a></li>
                <li><a href="/products/category/dibujos">Oliver & Benji</a></li>
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
          <img src="/public/assets/${product.image}" alt="${product.team}">
          <h2>${product.team}</h2>
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
          <img src="/public/assets/${product.image}" alt="${product.team}">
          <h2>${product.team} + / + ${product.year}</h2>
          <p>${product.description}</p>
          <p>Pais: ${product.country}</p>
          <p>Pais: ${product.league}</p>
          <p>Talla: ${product.size}</p>
          <p><strong>${product.price}€</strong></p>
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




module.exports = {
    showProducts
}