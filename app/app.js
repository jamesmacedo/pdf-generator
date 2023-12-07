const express = require('express');
var exec = require('child_process').execSync;

const app = express();

require('dotenv').config();

var Exporter = require('./src/Exporter');

app.use(express.json());

app.post('/exportar', function (req, res) {
  
  const {page,requests} = req.body;
  
  this.path = "uploads";
  this.nome_arquivo = `pdf.pdf`;

  this.page = page + requests;

  var exporter = new Exporter(this.path,this.nome_arquivo,this.page); 

  run(exporter,mail);

  res.send('ok');
})

async function run(exporter){
  await gerar(exporter);
  await deletar();
}

async function gerar(exporter){ 
  return exporter.download();
}

async function deletar(){
  return new Promise(async (resolve)=>{
    exec(`rm -rf ${this.nome_arquivo}`, function (err){
      if (err){
        console.error('Ocorreu um erro ao deletar o arquivo local: ' + err)
      }else{
        console.log('Arquivo local deletado!');
      }
    });
    setTimeout(() => {resolve()}, 1000);
  }); 
}

app.listen(4000)
