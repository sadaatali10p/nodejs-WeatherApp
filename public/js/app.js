console.log('client side javascript is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('#txtLocation')
const location1 = document.querySelector('#lblLocation')
const forecast1 = document.querySelector('#lblForecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    location1.textContent = 'Loading...'
    forecast1.textContent = ''
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error){
                location1.textContent = data.error
            }   
            else{
                location1.textContent = data.location
                forecast1.textContent = data.forecast
            }
        })
    })
})