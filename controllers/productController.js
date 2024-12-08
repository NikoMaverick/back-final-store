const Product = require('../models/Product');

  const showProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al acceder a los datos." });
    };
};


const createProduct = async (req, res) => {

    try {
        const { team, year, description, category, country, league, image, size, price } = req.body;
        if (!team || !year || !description || !category || !country || !league || !size || !price) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
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
        return res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se ha podido crear el pruducto" });
    };
};


const showProductById = async (req, res) => {
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


const showEditProduct = async (req, res) => {
        try {
            const product = await Product.findById(req.params.productId);

            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            const formEditData = {
                form: {
                    method: "POST",
                    action: `/dashboard/${product._id}`,
                    enctype: "multipart/form-data",
                    fields: [
                        {
                            label: "Equipo",
                            type: "text",
                            id: "team",
                            name: "team",
                            value: product.team,
                            required: true
                        },
                        {
                            label: "Temporada",
                            type: "text",
                            id: "year",
                            name: "year",
                            value: product.year,
                            required: true
                        },
                        {
                            label: "Descripción",
                            type: "textarea",
                            id: "description",
                            name: "description",
                            value: product.description,
                            required: true
                        },
                        {
                            label: "Categoría",
                            type: "select",
                            id: "categoryProduct",
                            name: "category",
                            value: product.category,
                            options: [
                                { value: "spain", label: "España" },
                                { value: "europa", label: "Europa" },
                                { value: "seleccion", label: "Selecciones" },
                                { value: "mundo", label: "Resto del mundo" },
                                { value: "campeones", label: "Oliver & Benji" }
                            ],
                            required: true
                        },
                        {
                            label: "País",
                            type: "text",
                            id: "country",
                            name: "country",
                            value: product.country,
                            required: true
                        },
                        {
                            label: "Liga",
                            type: "text",
                            id: "league",
                            name: "league",
                            value: product.league,
                            required: true
                        },
                        {
                            label: "Imagen",
                            type: "file",
                            id: "image",
                            name: "image",
                            value: product.image
                        },
                        {
                            label: "Talla",
                            type: "select",
                            id: "size",
                            name: "size",
                            value: product.size,
                            options: [
                                { value: "XS", label: "XS" },
                                { value: "S", label: "S" },
                                { value: "M", label: "M" },
                                { value: "L", label: "L" },
                                { value: "XL", label: "XL" },
                                { value: "XXL", label: "XXL" }
                            ],
                            required: true
                        },
                        {
                            label: "Precio",
                            type: "number",
                            id: "price",
                            name: "price",
                            value: product.price,
                            min: 0,
                            required: true
                        }
                    ]
                },
                buttons: [
                    { type: "submit", text: "Actualizar producto" },
                    { type: "button", text: "Cancelar", action: "window.history.back();" }
                ]
            };
            res.json(formEditData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "No se puede acceder al producto" });
        }
    };
    
    

const showNewProduct = async (req, res) => {
    try {
        const formNewData = {
            action: "/dashboard",
            method: "POST",
            fields: [
                { type: "text", id: "team", name: "team", label: "Equipo", required: true },
                { type: "text", id: "year", name: "year", label: "Temporada", required: true },
                { type: "textarea", id: "description", name: "description", label: "Descripción", required: true },
                { 
                    type: "select", 
                    id: "category", 
                    name: "category", 
                    label: "Categoría", 
                    required: true,
                    options: [
                        { value: "", text: "Añada categoria", disabled: true, selected: true },
                        { value: "spain", text: "España" },
                        { value: "europa", text: "Europa" },
                        { value: "seleccion", text: "Selecciones" },
                        { value: "mundo", text: "Resto del Mundo" },
                        { value: "campeones", text: "Oliver & Benji" }
                    ]
                },
                { type: "text", id: "country", name: "country", label: "País", required: true },
                { type: "text", id: "league", name: "league", label: "Liga", required: true },
                { type: "file", id: "image", name: "image", label: "Imagen" },
                { 
                    type: "select", 
                    id: "size", 
                    name: "size", 
                    label: "Talla", 
                    required: true,
                    options: [
                        { value: "", text: "Añada talla", disabled: true, selected: true },
                        { value: "XS", text: "XS" },
                        { value: "S", text: "S" },
                        { value: "M", text: "M" },
                        { value: "L", text: "L" },
                        { value: "XL", text: "XL" },
                        { value: "XXL", text: "XXL" }
                    ]
                },
                { type: "number", id: "price", name: "price", label: "Precio", min: 0, required: true },
                { type: "submit", label: "Añadir producto" }
            ]
        };
        res.json(formNewData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede acceder al formulario" });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se ha podido eliminar el producto" });
    }
}

const showProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({category: req.params.category}); 
        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede acceder al producto" });
    };
}

const updateProduct = async (req, res) => {
    try {
        let { team, year, description, category, country, league, image, size, price } = req.body;
        image = '';
        
        if (!team || !year || !description || !category || !country || !league || !size || !price) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
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
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto actualizado", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se ha podido actualizar el producto" });
    };
};




module.exports = {
    showProducts,
    createProduct,
    showProductById,
    showEditProduct,
    showNewProduct,
    deleteProduct,
    showProductsByCategory,
    updateProduct
}

