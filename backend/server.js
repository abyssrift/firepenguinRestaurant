require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// POST /api/upload: Upload image to Supabase Storage
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileName = `${Date.now()}_${file.originalname}`;
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);

        res.json({ imageUrl: publicUrl });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/products: Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/products/:id: Fetch a single product
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Product not found' });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/orders: Submit a new order
app.post('/api/orders', async (req, res) => {
    const { cartItems, totalPrice, customerId, customerAddress, customerPhone, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([
                {
                    item_details: cartItems,
                    total_price: totalPrice,
                    customer_id: customerId || null,
                    customer_address: customerAddress,
                    customer_phone: customerPhone,
                    payment_method: paymentMethod,
                    status: 'pending'
                }
            ])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Order placed successfully', order: data[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/products: Create a new product
app.post('/api/products', async (req, res) => {
    const { name, description, price, imageURL, category, avaliable } = req.body;
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([{
                name,
                description,
                price: parseFloat(price),
                imageURL,
                category,
                avaliable: !!avaliable
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/products/:id: Update an existing product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageURL, category, avaliable } = req.body;
    try {
        const { data, error } = await supabase
            .from('products')
            .update({
                name,
                description,
                price: parseFloat(price),
                imageURL,
                category,
                avaliable: !!avaliable
            })
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/products/:id: Delete a product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Basic Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
