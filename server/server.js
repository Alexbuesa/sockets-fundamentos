const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

/**
 * Socket.io no trabaja diréctamente con express, hay que importar el 'http' ya lo trae el propio node, no hay que instalarlo
 * express por dentro utiliza funciones del 'http' de node, por eso se le pasa 'app' como argumento al 'createServer()'
 */
const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO = es la comunicación del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});