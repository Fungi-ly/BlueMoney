const child_process = require('child_process');

let ejecutar = () => {
    
    return new Promise((resolve) => {
    
    child_process.exec(`node core.js dinero txt dolar 1000`, function (err, result) {
        console.log(result)
    resolve(result)
    })
    })
    };

ejecutar()

//node Blue.js