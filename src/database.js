import Mongoose from "mongoose";

Mongoose .connect( 'mongodb://localhost/db_products', {
    // 'useNewUrlParser': true,
    // 'useUnifiedTopogoly': true
} )
. then( db => console .log( 'Database is connected!' ) )
. catch( err => console .log( 'Database is not connected', err ) );