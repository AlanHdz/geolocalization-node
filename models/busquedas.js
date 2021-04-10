const axios = require('axios')

class Busquedas {

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': '5',
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        //peticion HTTP
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get()
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return []
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async climaLugar(lat, lon) {

        try {
            
            //instance axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })
            
            const resp = await instance.get()
            const { weather, main } = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
            throw error
        }

    }

}

module.exports = Busquedas