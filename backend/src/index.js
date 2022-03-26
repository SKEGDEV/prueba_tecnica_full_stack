const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const app = express();

//inicializacion del puerto en caso se haya definido uno
app.set('port', process.env.PORT || 5000);

//midlewares
app.use(morgan('common'));
app.use(express.json());
app.use(cors());

app.use('/trucks', require('./route/trucks_choffers') );
app.use('/travels', require('./route/travels') );



app.listen(app.get('port'),()=>{
  console.log('server listen on port ', app.get('port'));
})
