// require package used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars') 
const restaurantList = require('./restaurant.json')


// setting template engine
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id) 
  res.render('show', {restaurant})
})

// search setting : name, name_en, category of restaurants
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().replace(/\s+/g, '') // 
  const restaurants = restaurantList.results.filter(item => 
    ( item.name.toLowerCase().includes(keyword) || item.name_en.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword))
  )

  if ( keyword.trim() !== '' ) {
    res.render('index', { restaurants, keyword})
  } else {
    const emptyText = 'Invalid Value'
    console.log(`輸入值為空白鍵: ${emptyText}`)
    res.render('index', {emptyText})
  }
})

// start and listen on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})