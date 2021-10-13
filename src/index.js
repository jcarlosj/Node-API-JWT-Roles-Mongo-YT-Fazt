import app from './app';
import './database';

const port = 4001;

app .listen( port );
console.log( 'Server listen on port: ', port );