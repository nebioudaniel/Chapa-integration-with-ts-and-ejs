import express, { Request, Response } from 'express';
import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4400;

const CHAPA_URL = process.env.CHAPA_URL || 'https://api.chapa.co/v1/transaction/initialize';
const CHAPA_AUTH = process.env.CHAPA_AUTH || '';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// req header with chapa secret key
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
    },
};

// entry for the front end
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// initial payment endpoint
app.post('/api/pay', async (req: Request, res: Response) => {
    const CALLBACK_URL = 'http://localhost:4400/api/verify-payment/';
    const RETURN_URL = 'http://localhost:4400/api/payment-success/';
    const TEXT_REF = `tx-myecommerce12345-${Date.now()}`;

    const data = {
        amount: '1000',
        currency: 'ETB',
        email: 'ato@ekele.com',
        first_name: 'Ato',
        last_name: 'Ekele',
        tx_ref: TEXT_REF,
        callback_url: `${CALLBACK_URL}${TEXT_REF}`,
        return_url: RETURN_URL,
    };

    try {
        const response = await axios.post(CHAPA_URL, data, config);
        res.redirect(response.data.data.checkout_url);
    } catch (err) {
        console.error('Error creating payment:', err);
        res.status(500).send('Error creating payment');
    }
});

// verification endpoint
app.get('/api/verify-payment/:id', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${req.params.id}`, config);
        console.log('Payment was successfully verified');
        res.send('Payment was successfully verified');
    } catch (err) {
        console.error('Payment can\'t be verified', err);
        res.status(500).send('Payment can\'t be verified');
    }
});

app.get('/api/payment-success', (req: Request, res: Response) => {
    res.render('success');
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
