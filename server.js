const express = require('express');
const bodyParser = require('body-parser');
const playersRoutes = require('./routes/players');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use('/api', playersRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
