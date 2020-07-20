const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect(
        'mongodb+srv://otabek:otb1997mr@cluster0-1jbek.mongodb.net/duo_telegram_bot',
        {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        }); 
    mongoose.connection.on('open',()=>{
        console.log('Connected DB');
    });
    mongoose.connection.on('finish',(err)=>()=>{
        console.log(err);
        
    })
    mongoose.Promise = global.Promise
}