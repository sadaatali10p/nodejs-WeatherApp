const express = require('express')
const path = require('path')
const weather = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs');

const app = express()

const publicDir = path.join(__dirname, '../public')
const partialsDir = path.join(__dirname, '../templates/partials') // thse lines can be used to setup a customized views directory
app.use(express.static(publicDir))
app.set('view engine', 'hbs') // handlebars used to serve dynamic views
hbs.registerPartials(partialsDir) // this is the way to register partials views. please note it uses hbs not app

//const viewsDir = path.join(__dirname, '../templates') // thse lines can be used to setup a customized views directory
//app.set('views', viewsDir)

app.get('', (req, res) => {
    res.render('index',{
        title: 'Node Learning - Weather App',
        heading: 'Weather'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        }
        weather(latitude, longitude, (error, data) => {
            if (error){
                return res.send({ error })
            }   
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Node Learning - Weather App',
        heading: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Node Learning - Weather App',
        content:'this is very helpful',
        heading: 'Help'
    })
})

// it should come as last route just befor app.listen
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'Node Learning - Weather App',
        content:'Help child pages not found',
        heading: '404'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title: 'Node Learning - Weather App',
        content:'Page Not Found',
        heading: '404'
    })
})

app.get('/weather', (req, res) => {
    res.send(console.log('Pleasant!'))
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})