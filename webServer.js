// simple web server with JADE and less-middleware support
// will render images and server up static files as well
//

// include modules
var    express = require('express'),
     app = express(),
    path = require('path'),
    less = require('less-middleware');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT ||8080;


app.use(compression());
app.use(cookieParser()) // i use express.cookieParser, but connect.cookieParser should also work
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json());
app.set('json spaces', 0)

/** we will need support for web pages to control the mundane functions such
 * as password reset.  Tell express we are using jade and where
 * our views are
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
    if ( req.url.indexOf( "Echo") > 0 ) {
        // let heart beat through
        next();
        return
    }
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
    }
    else
        next();
});

app.use('/', function (err, req, res, next) {
    // handle however you like, special-case based on
    // error properties, messages, request conditions etc
    // here we'll just render an error page
    res.status(err.status || 500);
    res.render('error', { error: err });
});
app.get('/web/Echo', function (req, res) {
    res.render('echo', { title: 'Echo ' + (new Date()).toString() , layout: false });
});


// compile and serve css
app.use(less(path.join(__dirname,'source','less'),{
    dest: path.join(__dirname, 'public'),
    options: {
        compiler: {
            compress: false,
        },
    },
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace('/css/','/'); 
        },
    },
    force: true,
}));
// serve static content
app.use(express.static(path.join(__dirname, 'dist')));

// setup server
var server = app.listen(port,  function () {
    var msg = "Start-up complete, listening on port: " + port;
    console.log(msg);
});