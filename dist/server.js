"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4400;
const CHAPA_URL = process.env.CHAPA_URL || 'https://api.chapa.co/v1/transaction/initialize';
const CHAPA_AUTH = process.env.CHAPA_AUTH || '';
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// req header with chapa secret key
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
    },
};
// entry for the front end
app.get('/', (req, res) => {
    res.render('index');
});
// initial payment endpoint
app.post('/api/pay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post(CHAPA_URL, data, config);
        res.redirect(response.data.data.checkout_url);
    }
    catch (err) {
        console.error('Error creating payment:', err);
        res.status(500).send('Error creating payment');
    }
}));
// verification endpoint
app.get('/api/verify-payment/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.chapa.co/v1/transaction/verify/${req.params.id}`, config);
        console.log('Payment was successfully verified');
        res.send('Payment was successfully verified');
    }
    catch (err) {
        console.error('Payment can\'t be verified', err);
        res.status(500).send('Payment can\'t be verified');
    }
}));
app.get('/api/payment-success', (req, res) => {
    res.render('success');
});
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
