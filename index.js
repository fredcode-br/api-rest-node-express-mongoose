const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();


app.use(
    express.urlencoded({
        extended: true,
    }),
);

//forma de ler JSON
app.use(express.json());

//rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);


// rota inicial / endpoint
app.get('/', async (req,res) => {
    res.json({ message: 'Oi Express' });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.4ihpapo.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    console.log('Conectamos ao MongoDB');
    app.listen(3000);
})
.catch((err) => console.log(err));

