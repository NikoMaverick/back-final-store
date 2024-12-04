const Product = require('../models/Product');


function getProductCards(products) {
    return products.map(product => `
        <div class="product-card">
          <img src="/public/assets/${product.image}" alt="${product.team} ${product.year}">
          <div class="leyend">
            <h2>${product.team}</h2>
            <h3>Temporada ${product.year}</h3>
          </div>
          <button class="homeBtn" onClick="window.location.href='/products/${product._id}'">Ver</button>
        </div>
    `).join('');
  }

  function getProductCard(product) {
    return `
    <section class="productCard" id="productCard">
      <div class="product-card">
        <img src="/public/assets/${product.image}" alt="${product.team} ${product.year}">
        <div class="leyend">
          <h2>${product.team} - Temp. ${product.year}</h2>
          <p>${product.description}</p>
          <p>Categoria: ${product.category}</p>
          <p>Pais: ${product.country}</p>
          <p>Liga: ${product.league}</p>
          <p><strong>${product.price}€</strong></p>
        </div>
        <div class="size-basket">
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
        </div>
        <div class="editDelete">
          <button class="homeBtn" onClick="window.location.href='/dashboard/${product._id}/edit'">Editar</button>
          <button class="homeBtn" id="deleteProduct">Borrar</button>
        </div>
      </div>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          document.getElementById("deleteProduct").addEventListener('click', function() {
            if(confirm("¿Estás seguro de que deseas eliminar este producto?")) {
              fetch("/dashboard/${product._id}/delete", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
              })
              .then(response => response.json())
              .then(data => {
                alert('Producto eliminado correctamente');
                window.location.href = '/dashboard'; 
              })
              .catch(error => console.error('Error:', error));
            }
          });
        });
      </script>
    </section>
`;
  }

  const showProductsApi = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al acceder a los datos." });
    };
};


const createProductApi = async (req, res) => {

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


const showProductByIdApi = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product) {
            return res.status(404).json({ messenge: "Producto no encontrado" })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al acceder a los datos", error});
    };
}


const showEditProductApi = async (req, res) => {
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
                
                    <label for="team">Equipo</label>
                    <input type="text" id="team" name="team" value="${product.team}" required>
                    
                    <label for="year">Temporada</label>
                    <input type="text" id="year" name="year" value"${product.year}" required>
                
                    <label for="description">Descripción</label>
                    <textarea id="description" name="description" required>${product.description}</textarea>
                    
                
                    <label for="category">Categoría</label>
                    <select name="category" id="categoryProduct" ${product.category} class="categoryProduct" required>>
                        <option value="" disabled selected>Producto</option>
                        <option value="spain">España</option>
                        <option value="europa">Europa</option>
                        <option value="seleccion">Selecciones</option>
                        <option value="mundo">Resto del mundo</option>
                        <option value="campeones">Oliver & Benji</option>
                    </select>                                      

                    <label for="country">País</label>
                    <input type="text" id="country" name="country" ${product.country} required>

                    <label for="league">Liga</label>
                    <input type="text" id="league" name="league" ${product.league} required>

                     
                    <label for="image">Imagen</label>
                    <img src="/public/assets/${product.image}" alt="${product.team} ${product.year}" />
                    <input type="file" id="image" name="image">

                    <label for="size">Talla</label>
                    <select name="size" class="size" id="size" ${product.size} required>
                        <option value="" disabled selected>Talla</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    
                    <label for="price">Precio</label>
                    <input type="number" id="price" name="price" min="0" value="${product.price}" required>

                    <button type="submit">Actualizar producto</button>
                    <button type="button" class="cancelButton" id="cancelButton">Cancelar</button>    

                    
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
        res.json(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while accessing the product" });
    };
};

const showNewProductApi = async (req, res) => {
    try {
        const isDashboard = req.url.includes('dashboard');
        const html = baseHtml + getNavBar(isDashboard) + `
                
                <form action="/dashboard" method="POST">

                        <div>
                            <h2 class="createH2">Añadir Producto</h2>
                        </div>

                        <label for="team">Equipo</label>
                        <input type="text" id="team" name="team" required>

                        <label for="year">Temporada</label>
                        <input type="text" id="year" name="year" required>

                        <label for="description">Descripción</label>
                        <textarea id="description" name="description" required></textarea>

                        <label for="category">Categoría</label>
                        <select name="category" id="category" required>
                            <option value="" disabled selected>Añada categoria</option>
                            <option value="spain">España</option>
                            <option value="europa">Europa</option>
                            <option value="seleccion">Selecciones</option>
                            <option value="mundo">Resto del Mundo</option>
                            <option value="campeones">Oliver & Benji</option>
                        </select>

                        <label for="country">País</label>
                        <input type="text" id="country" name="country" required>

                        <label for="league">Liga</label>
                        <input type="text" id="league" name="league" required>

                        <label for="image">Imagen</label>
                        <input type="file" id="image" name="image">

                        <label for="size">Talla</label>
                        <select name="size" id="size" required>
                            <option value="" disabled selected>Añada talla</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>

                        <label for="price">Precio</label>
                        <input type="number" id="price" name="price" min="0" required>

                        <button type="submit">Añadir producto</button>
                    </form>
                </div>
            </main>
        </body>
    </html>
    `;
        res.json(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "The form cannot be accessed"});
    }
    
};

const deleteProductApi = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
}

const showProductsByCategoryApi = async (req, res) => {
    try {
        const products = await Product.find({category: req.params.category}); 
        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al acceder a los datos" });
    };
}

const updateProductApi = async (req, res) => {
    try {
        let { team, year, description, category, country, league, image, size, price } = req.body;
        image = '';
        
        if (!team || !year || !description || !category || !country || !league || !size || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { 
            team,
            year,
            description,
            category,
            country,
            league,
            image,
            size, 
            price 
            }, 
            { new: true } 
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    };
};




module.exports = {
    showProductsApi,
    createProductApi,
    showProductByIdApi,
    showEditProductApi,
    showNewProductApi,
    deleteProductApi,
    showProductsByCategoryApi,
    updateProductApi
}

