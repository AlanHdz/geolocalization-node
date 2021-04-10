require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {
        
        opt = await inquirerMenu()

        switch ( opt ) {

            case 1:
                //Mostrar mensaje
                const busqueda = await leerInput('Ciudad: ');
                //Buscar los lugares
                const lugares = await busquedas.ciudad(busqueda)
                //Seleccionar el lugar
                const idSelected = await listarLugares(lugares)
                const lugarSelected = lugares.find(lugar => lugar.id == idSelected)
                //Clima
                const clima = await busquedas.climaLugar(lugarSelected.lat, lugarSelected.lng)
                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad:', lugarSelected.nombre)
                console.log('Lat:', lugarSelected.lat)
                console.log('Lng:', lugarSelected.lng)
                console.log('Descripción:', clima.desc)
                console.log('Temperatura:', clima.temp)
                console.log('Minima:', clima.min)
                console.log('Maxima:', clima.max)
                break;

        }

        if (opt !== 0) await pausa()
    } while (opt !== 0);

}

main()