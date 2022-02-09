const express = require('express');
const app = express();

app.use(express.static('frontend')) //elementele statice 
app.use('/passwords', require('./routes/passwords'));
app.use('/users', require('./routes/users'));

app.listen(3000, () => {
    console.log('server has started');
});