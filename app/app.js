const express = require('express');
var cors = require('cors');

var exec = require('child_process').execSync;

const app = express();

require('dotenv').config();

const generate = require('./src/helpers')

var Exporter = require('./src/Exporter');

app.use(express.json());
app.use(cors());

app.post('/exportar', async function (req, res) {
  
  const {page,request} = req.body;

  this.path = "uploads";
  this.nome_arquivo = `${generate(40)}.pdf`;

  this.page = page + request;

  var path = `${this.path}/${this.nome_arquivo}`; 

  var exporter = new Exporter(path,this.nome_arquivo,this.page); 

  await gerar(exporter);

  res.download(path,'file.pdf',function(err){
    if(!err){
      deletar(path);
    }
  });
})


async function gerar(exporter){ 
  return exporter.download();
}

async function deletar(path){
  return new Promise(async (resolve)=>{
    exec(`rm -rf ${path}`, function (err){
      if (err){
        console.error('Ocorreu um erro ao deletar o arquivo local: ' + err)
      }else{
        console.log('Arquivo local deletado!');
      }
    });
    setTimeout(() => {resolve()}, 1000);
  }); 
}

app.listen(4500)
