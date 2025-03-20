module.exports.iniciaChat = function (application, req, res) {
  var dadosForm = req.body;

  req.assert("apelido", "Nome ou apelido é obrigatorio").notEmpty();
  req
    .assert("apelido", "Nome ou apelido deve conter entre 3 e 15 caracteres")
    .len(3, 15);

  var erros = req.validationErrors();

  if (erros) {
    //res.send("Existe um erro no formulário");
    res.render("index", { validacao: erros });
    return;
  }

  application.get("io").emit("msgParaCliente", {
    apelido: dadosForm.apelido,
    mensagem: "ACABOU de entrar no CHAT",
  });
  res.render("chat", { dadosForm: dadosForm });
};
