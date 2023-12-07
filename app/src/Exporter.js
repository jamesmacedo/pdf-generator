const pt = require('puppeteer');

class Exporter{

  constructor(path,nome,page){
    this.path = path;
    this.nome = nome;
    this.page = page;
  }

  async download(){
    var path = `${this.path}/${this.nome}`; 
    return new Promise(async (resolve)=>{
      await pt.launch({headless:true,args: ['--no-sandbox','--headless','--disable-gpu','--disable-dev-shm-usage']})
      .then(async browser => {
        const p = await browser.newPage();
        await p.setViewport({ width: 1000, height: 500 })
        await p.goto(this.page);
        await p.waitForTimeout(3000);
        await p.pdf({ path: path, fullPage: true, printBackground:true, margin:{ top: '1cm', bottom: '1cm', left:'2cm',right:'2cm'} });
        await browser.close();
      }); 
      console.log('PDF renderizado!');
      resolve();
    }); 
  }

}

module.exports = Exporter;
