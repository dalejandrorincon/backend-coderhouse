const hbs = handlebars.create({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/', })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

Endpointsapp.get('/products', (req, res) => {
  container.getAll()
    .then(products => {
      res.send(JSON.stringify(products))
    }).catch(error => { res.status(500).json(error) })
})

app.get('/', (req, res) => { res.render('form') })

routerProductos.get('/', (req, res) => {
  container.getAll().then(products => {
    res.render('products', { products })
  }).catch(error => { res.status(500).json(error) })
})

routerProductos.post('/', (req, res) => {
  let product = req.body
  if (!product.title || !product.price || !product.thumbnail) {
    res.status(400).json({ error: 'title, price and thumbnail are required' })
  } else {
    product.price = parseFloat(product.price)
    container.save(req.body).then(data => {
      container.getById(data).then(prod => {
        res.redirect('/api/productos')
      }).catch(error => {
        res.status(500).json(error)
      })
    }).catch(error => { res.status(500).json(error) })
  }
})