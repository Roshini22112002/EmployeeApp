const express = require('express')
const app = express()
const port = 5000

const path = require('path');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.static('style'));
console.log("Views directory:", app.get('views'));

const navbar = [{ link: '/basic', name: 'home' },
{ link: '/basic/form', name: 'addEmployee' }
];

const basicroutes = require('./routes/basicRoutes')(navbar);
console.log("Basic routes loaded ");
app.use('/basic', basicroutes);

app.get('/', (req, res) => {
    res.send("Server is running . Go to /basic");
  });

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
});