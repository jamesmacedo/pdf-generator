const express = require('express');
var cors = require('cors');

var exec = require('child_process').execSync;

const app = express();

require('dotenv').config();

var Exporter = require('./src/Exporter');

app.use(express.json());
app.use(cors());

app.post('/exportar', async function (req, res) {
  
  const {page,request} = req.body;
  
  console.log(req.body)

  this.path = "uploads";
  this.nome_arquivo = `pdf.pdf`;

  this.page = page + request;
  //console.log(this.page)

  var path = `${this.path}/${this.nome_arquivo}`; 

  var exporter = new Exporter(path,this.nome_arquivo,this.page); 

  await run(exporter);

  res.download(path);
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

app.listen(4500)
