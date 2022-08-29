import express from 'express'
const app = express();
import {router as routePasswords} from './routes/passwords'
import {router as routeAuth} from './routes/auth'

app.use(express.urlencoded({
    extended: true
}))
app.use('/passwords', routePasswords);
app.use('/users', routeAuth);

app.listen(3000, () => {
    console.log('server has started');
});