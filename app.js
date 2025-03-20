/* importar as configurações do servidor */
var app = require("./config/server");

/* parametrizar porta de escuta */
const server = app.listen(3333, function () {
  console.log("Servidor online");
});

var io = require("socket.io").listen(server);

app.set("io", io);
//criar a conexão po websocket

io.on("connection", function (socket) {
  console.log("Usuario conctou");

  socket.on("disconnect", function () {
    console.log("USUARIO desconectou");
  });

  socket.on("msgParaServidor", function (data) {
    socket.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    socket.broadcast.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit("participantesParaCliente", {
        apelido: data.apelido,
      });

      socket.broadcast.emit("participantesParaCliente", {
        apelido: data.apelido,
      });
    }
  });
});
