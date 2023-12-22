const pt = require('puppeteer');

class Exporter{

  constructor(path,nome,page){
    this.path = path;
    this.nome = nome;
    this.page = page;
  }

  async download(){
    return new Promise(async (resolve)=>{
      await pt.launch({headless:true,args: ['--no-sandbox','--headless','--disable-gpu','--disable-dev-shm-usage']})
      .then(async browser => {
        const p = await browser.newPage();
        //await p.setViewport({ width: 1000, height: 500 })
        await p.goto(this.page);
        //await p.waitForTimeout(3000);
        // margin:{ top: '1cm', bottom: '1cm', left:'2cm',right:'2cm'}
        await p.pdf({ path: this.path, fullPage: true, printBackground:true});
        await browser.close();
      }); 
      resolve();
    }); 
  }

}

module.exports = Exporter;
