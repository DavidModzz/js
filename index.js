const request = require('request');
const cheerio = require('cheerio');


async function xvideos(query) {
    const url = `https://www.xvideos.com/?k=${query}`;

    // Realizar la petición HTTP a la página
    request(url, (error, response, body) => {
      if (error) {
        console.error(`Error: ${error}`);
        return error;
      }
    
      // Cargar el cuerpo de la respuesta en Cheerio para analizarlo
      const $ = cheerio.load(body);
    
      // Extraer los datos deseados del HTML
      const videos = [];
      $('.thumb-block').each((index, element) => {
        const title = $(element).find('.title').text();
        const duration = $(element).find('.duration').text();
        const views = $(element).find('.views').text();
        const thumbnail = $(element).find('.thumb img').attr('src');
        const videoUrll = $(element).find('.thumb a').attr('href');
        const videoUrl = "https://www.xvideos.com" + videoUrll
    
        videos.push({ title, duration, views, thumbnail, videoUrl });
      });
    
      // Imprimir los datos extraídos
      console.log(videos)
    });
    
}
