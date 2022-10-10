const fs = require('fs');
const https = require("https");

const argumentos = process.argv.slice(2);

let nombre = argumentos[0];
let extension = argumentos[1];
let convertTo = argumentos[2];
let pesitos = argumentos[3];



let conversion = (nombre, extension, convertTo, pesitos) => {

    let url = "https://mindicador.cl/api";

    https
        .get(url, (resp) => {

            let data = "";   //Req 2

            resp.on('data', (resp) => {
                data += resp
            })
                .on('end', () => {

                    let dataObj = JSON.parse(data)

                    let monedaext;

                    switch (convertTo) {
                        case 'uf':
                            monedaext = dataObj.uf;
                            break;
                        case 'dolar':
                            monedaext = dataObj.dolar;
                            break;
                        case 'dolar_intercambio':
                            monedaext = dataObj.dolar_intercambio;
                            break;

                        case 'euro':
                            monedaext = dataObj.euro;
                            break;

                        case 'ipc':
                            monedaext = dataObj.ipc;
                            break;
                        case 'utm':
                            monedaext = dataObj.utm;
                            break;

                        case 'imacec':
                            monedaext = dataObj.imacec;
                            break;
                        case 'tpm':
                            monedaext = dataObj.tpm;
                            break;
                        case 'libra_cobre':
                            monedaext = dataObj.libra_cobre;
                            break;
                        case 'bitcoin':
                            monedaext = dataObj.bitcoin;
                            break;

                        default:
                            break;
                    }

                    let total =  (pesitos / monedaext.valor).toFixed(2);

                    let fechapro = new Date();

                    let contenidotxt = `                    
                    A la fecha: ${fechapro} 
                    Fue realizada cotización con los siguientes datos: 
                    Cantidad de pesos a convertir: ${pesitos} pesos 
                    Convertido a "${convertTo}" da un total de: 
                    $${total}`;

                    fs.writeFile(`./${nombre}.${extension}`, contenidotxt, 'utf8', () => { console.log(contenidotxt) });


                    return data
                })

        }).on('error', (err) => {
            console.log("todomal")
        });

}


conversion(nombre, extension,  convertTo, pesitos);



// usar node core.js plata txt dolar 1000