const bodyParser = require('body-parser');
const express= require('express');

const cors= require('cors')
const app = express();
const addroute= require('./routes/add-user');
const getroute= require('./routes/get-user');
const deleteroute= require('./routes/delete-user');
const sequelize= require('./connection/database');
app.use(bodyParser.json({extended:false}));
app.use(cors());



app.use('/user', getroute)
app.use('/user', addroute)
app.use('/user', deleteroute)


sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000, ()=>
{
    console.log("Server Is Started!");
})})
  .catch(err => {
    console.log(err);
});

