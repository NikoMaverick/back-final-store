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
`}
}



module.exports = {}