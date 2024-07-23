const express = require('express');
const userRouter = require('./routers/userRouter');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000; 

require('./db/connect');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user',userRouter);

app.listen(port,() => console.log(`server started at port ${port}`));