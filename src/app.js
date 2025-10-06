const express =require('express');
const cors =require('cors');
const app = express();
const PORT = 3000;
const socialMedia = require('./routes/socialMedia.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', socialMedia);

app.listen(PORT,()=>{
    console.log(`Servidor iniciado na porta ${PORT} : http://localhost:${PORT}`);
});