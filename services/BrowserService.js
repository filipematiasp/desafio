const puppeteer = require('puppeteer');

class BrowserService {

  //implementar um FACADE, vai virar uma classe abstrata que vai ser responsavel por abrir o browser, fechar o browser, e fazer as buscas

  static async getBrowser(checkin, checkout){

    // const browser = await puppeteer.launch({ headless: false});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({width: 1080, height: 1024});

    const url = `https://reservations3.fasthotel.com.br/188/214?entrada=${checkin}&saida=${checkout}&adultos=1#cotacao`

    await page.goto(url, { waitUntil: 'networkidle2' })

    const alertaExiste = await page.$('.alert.alert-warning small')

    if(alertaExiste){
      const mensagem = await page.$eval('.alert.alert-warning small', el => el.textContent.trim())
      console.log('Mensagem de alerta:', mensagem);
      //falta implemntar tratamento de erro no express, por enquanto deixar como retorno de mensagem
      return mensagem;
    }

    const extract = await page.evaluate(() => {
      const resultado = [];

      const container = document.querySelector('[data-name="acomodacoes"]');
      if (!container) return resultado;

      const acomodacoes = container.querySelectorAll('[data-codigo]');

      acomodacoes.forEach(div => {

        //nome
        const nameEl = div.querySelector('[data-campo="titulo"]')
        const name = nameEl ? nameEl.textContent.trim() : null;

        //descriçao
        const descriptionEl = div.querySelector('.quarto.descricao')
        const description = descriptionEl ? descriptionEl.textContent.trim() : null;

        //preço
        const tarifaEl = div.querySelector('[data-campo="tarifas"]');

        let valores = [];

        const valoresEls = tarifaEl.querySelectorAll('[data-campo="valor"]');

        valores = Array.from(valoresEls).map(el => el.textContent.trim())

        const price = valores.length ? valores[1] : ''

        //foto
        const photoUrlEl = div.querySelector('[data-fancybox="images"]')
        const photoUrl = photoUrlEl ? photoUrlEl.getAttribute('href') : null

        resultado.push({ name, description, price, photoUrl});
      })

      return resultado;
    })

    this.closeBrowser(browser)
    return extract
  }

  static closeBrowser(browser) {
    if (!browser) {
      return;
    }
    return browser.close();
  }
}

module.exports = BrowserService;
