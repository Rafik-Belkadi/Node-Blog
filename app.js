"use strict";

let log = require('npmlog');
Object.defineProperty(log, 'heading', { get: () => { return '[' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ']' } });


log.headingStyle = { bg: '', fg: 'white' };



let express = require('express');
var flash = require("connect-flash");
let app = express();
let http = require('http').Server(app);
let port = process.env.PORT || 3000;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
require('./config/passport')(passport);
var moment = require('moment');
var multer = require('multer');
var path = require('path');

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

var islogged = false;
// Gaming articles
var GamingArticleId = [];
var GamingArticleTitle = [];
var GamingArticleSubTitle = [];
var GamingArticleImage = [];
var GamingArticleDate = [];
var GamingArticleCategorie = [];
var GamingArticleContent = [];

//Mangas
var MangasArticleId = [];
var MangasArticleTitle = [];
var MangasArticleSubTitle = [];
var MangasArticleImage = [];
var MangasArticleDate = [];
var MangasArticleCategorie = [];
var MangasArticleContent = [];

// Apps
var AppArticleId = [];
var AppArticleTitle = [];
var AppArticleSubTitle = [];
var AppArticleImage = [];
var AppArticleDate = [];
var AppArticleCategorie = [];
var AppArticleContent = [];


//Article 
var ArticleTitle = [];
var ArticleSubTitle = [];
var ArticleImage = [];
var ArticleDate = [];
var ArticleCategorie = [];
var ArticleContent = [];


var ProductTitle = [];
var ProductPrice = [];
var ProductId = [];
var ProductPhoto = [];

//Le truc qui va recup les champs dans les formulaires
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Database infos
let mysql = require('mysql');
let connectionDetails = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    dateStrings: true,
    charset: "LATIN1"
};

let connection = mysql.createConnection(connectionDetails);

// Storage Engine

const storage = multer.diskStorage({
    destination: './public/img/img/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');


//check file function
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
app.use(flash());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
//---------------------------------------------------------------

// On met le view sur le template ejs
app.set('view engine', 'ejs');
//---------------------------------------------------------------

// Utilisation du middleware de session
app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));
//---------------------------------------------------------------

// Initialisation
app.use(passport.initialize());
app.use(passport.session());
//---------------------------------------------------------------
//---------------------------------------------------------------


// Get Requests 
//---------------------------------------------------------------
app.get('/', function (req, res) {

    res.setHeader('200', { "Content-Type": "application/json; charset=utf-8" });

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');


    
    let GamingqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM gaming ORDER BY date_creation DESC LIMIT 0, 5';

    let MangasqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM mangas ORDER BY date_creation DESC LIMIT 0, 5';

    let AppqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM apps ORDER BY date_creation DESC LIMIT 0, 5';

    connection.query(GamingqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);

         
        for(var i = 0; i < results.length; i++ ){
            GamingArticleId[i] = results[i].id;
            GamingArticleTitle[i] = entities.decode(results[i].titre);
            GamingArticleSubTitle[i] = entities.decode(results[i].sous_titre);
            GamingArticleImage[i] = '/img/img/' + results[i].photo;
            GamingArticleDate[i] = results[i].date_creation;
            GamingArticleCategorie[i] = entities.decode(results[i].categorie) ;
            GamingArticleContent[i] = entities.decode(results[i].contenu) ;
        }
        connection.query(MangasqueryArticle, (error2, results2, fields2) => {
            if (error)
                return console.error(error.message);
            for (var i = 0; i < results2.length; i++) {
                MangasArticleId[i] = results2[i].id;
                MangasArticleTitle[i] = entities.decode(results2[i].titre);
                MangasArticleSubTitle[i] = entities.decode(results2[i].sous_titre);
                MangasArticleImage[i] = '/img/img/' + results2[i].photo;
                MangasArticleDate[i] = results2[i].date_creation;
                MangasArticleCategorie[i] = entities.decode(results2[i].categorie);
                MangasArticleContent[i] = entities.decode(results2[i].contenu);
            }
            connection.query(AppqueryArticle, (error3, results3, fields3) => {
                if (error)
                    return console.error(error.message);

                for (var i = 0; i < results3.length; i++) {
                    AppArticleId[i] = results3[i].id;
                    AppArticleTitle[i] = entities.decode(results3[i].titre);
                    AppArticleSubTitle[i] = entities.decode(results3[i].sous_titre);
                    AppArticleImage[i] = '/img/img/' + results3[i].photo;
                    AppArticleDate[i] = results3[i].date_creation;
                    AppArticleCategorie[i] = entities.decode(results3[i].categorie);
                    AppArticleContent[i] = entities.decode(results3[i].contenu);
                }

                        res.charset = 'utf-8';

                res.render('index', {
                    logged : islogged,
                    GamingId : GamingArticleId,
                    GamingCategorie: GamingArticleCategorie,
                    GamingTitre: GamingArticleTitle,
                    GamingSous_titre: GamingArticleSubTitle,
                    GamingPhoto: GamingArticleImage,
                    GamingDate: GamingArticleDate,
                    GamingContent : GamingArticleContent,

                    MangasId : MangasArticleId,
                    MangasCategorie:  MangasArticleCategorie,
                    MangasTitre: MangasArticleTitle,
                    MangasSous_titre:MangasArticleSubTitle,
                    MangasPhoto:MangasArticleImage,
                    MangasDate: MangasArticleDate,
                    MangasContent : MangasArticleContent,

                    AppId : AppArticleId,
                    AppCategorie: AppArticleCategorie,
                    AppTitre: AppArticleTitle,
                    AppSous_titre: AppArticleSubTitle,
                    AppPhoto: AppArticleImage,
                    AppDate: AppArticleDate,
                    AppContent : AppArticleContent,


                    Day : date,
                    Time : time

                }); 
            });
        });    
    });    

    // Gaming articles
     GamingArticleId = [];
     GamingArticleTitle = [];
     GamingArticleSubTitle = [];
     GamingArticleImage = [];
     GamingArticleDate = [];
     GamingArticleCategorie = [];
     GamingArticleContent = [];

    //Mangas
     MangasArticleId = [];
     MangasArticleTitle = [];
     MangasArticleSubTitle = [];
     MangasArticleImage = [];
     MangasArticleDate = [];
     MangasArticleCategorie = [];
     MangasArticleContent = [];

    // Apps
     AppArticleId = [];
     AppArticleTitle = [];
     AppArticleSubTitle = [];
     AppArticleImage = [];
     AppArticleDate = [];
     AppArticleCategorie = [];
     AppArticleContent = [];
});

//---------------------------------------------------------------

app.get('/login', function (req, res) {
            res.charset = 'utf-8';

    res.render('login');
});
//---------------------------------------------------------------

app.get('/profile', isLoggedIn, function (req, res) {

    islogged = true;
    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');


    
            res.charset = 'utf-8';

    res.render('profile',{Day: date,Time: time, logged: islogged});
});
//---------------------------------------------------------------

app.get('/boutique', function(req,res){
    
    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');
/*
    let sqlQuery = "select * from products";

    connection.query(sqlQuery, (error, results, fields) => {
        if (error)
            console.log(error.message);
        for(var i = 0; i < results.length; i++)
        {
            ProductId[i] = entities.decode(results[i].id);
            ProductTitle[i] = entities.decode(results[i].product_name);
            ProductPrice[i] = entities.decode(results[i].product_price);
            ProductPhoto[i] = entities.decode(results[i].product_photo);
        }
*/
        res.render('boutique', {
/*
            id = ProductId,
            nom = ProductTitle,
            prix = ProductPrice,
            image = ProductPhoto,
*/
            Day: date,
            Time: time,
            logged: islogged 
            });
 //   });

    
});

//---------------------------------------------------------------

app.get('/logout', function (req, res) {
    req.logout();
    islogged = false;
    res.redirect('/');
});
//---------------------------------------------------------------

app.get('/single/Gaming/:id', function (req,res){

  let GamingqueryArticle = "SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation  FROM gaming WHERE id ='"+req.params.id+"'";

    // set a variable
    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');
 
    connection.query(GamingqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);
        if (results[0].id == req.params.id) {
            ArticleTitle[0] = entities.decode(results[0].titre);
            ArticleSubTitle[0] = entities.decode(results[0].sous_titre);
            ArticleImage[0] = '/img/img/' + results[0].photo;
            ArticleDate[0] = results[0].date_creation;
            ArticleCategorie[0] = entities.decode(results[0].categorie);
            ArticleContent[0] = entities.decode(results[0].contenu);

            
                res.charset = 'utf-8';

            res.render('single', {
            Categorie: ArticleCategorie,
            Titre: ArticleTitle,
            Sous_titre: ArticleSubTitle,
            Photo: ArticleImage,
            ArticleDate: ArticleDate,
            Content: ArticleContent,
            Day: date,
            Time: time
            });
        }
    });
});
//---------------------------------------------------------------


app.get('/single/Mangas/:id', function (req, res) {

    let MangasqueryArticle = "SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation FROM mangas WHERE id ="+ req.params.id;
    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(MangasqueryArticle, (error, results2, fileds) => {

        if (error)
            return console.error(error.message);


        if (results2[0].id == req.params.id) {
            ArticleTitle[0] = entities.decode(results2[0].titre);
            ArticleSubTitle[0] = entities.decode(results2[0].sous_titre);
            ArticleImage[0] = '/img/img/' + results2[0].photo;
            ArticleDate[0] = results2[0].date_creation;
            ArticleCategorie[0] = entities.decode(results2[0].categorie);
            ArticleContent[0] = entities.decode(results2[0].contenu);

                    res.charset = 'utf-8';

            res.render('single', {
                Categorie: ArticleCategorie,
                Sous_titre: ArticleSubTitle,
                Photo: ArticleImage,
                ArticleDate: ArticleDate,
                Content: ArticleContent,
                Day: date,
                Time: time,
                Titre: ArticleTitle
            });
        }
    });
});
//---------------------------------------------------------------

app.get('/single/app/:id', function (req, res) {

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    let AppqueryArticle = "SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation  FROM apps WHERE id =" + req.params.id; 

    connection.query(AppqueryArticle, (error3, results3, fields3) => {

        if (error3)
            return console.error(error3.message);


        if (results3[0].id == req.params.id) {

            ArticleTitle[0] = entities.decode(results3[0].titre);
            ArticleSubTitle[0] = entities.decode(results3[0].sous_titre);
            ArticleImage[0] = '/img/img/' + results3[0].photo;
            ArticleDate[0] = results3[0].date_creation;
            ArticleCategorie[0] = entities.decode(results3[0].categorie);
            ArticleContent[0] = entities.decode(results3[0].contenu);

                    res.charset = 'utf-8';

            res.render('single', {
                Categorie: ArticleCategorie,
                Titre: ArticleTitle,
                Sous_titre: ArticleSubTitle,
                Photo: ArticleImage,
                ArticleDate: ArticleDate,
                Content: ArticleContent,
                Day: date,
                Time: time
            });
        }
    });
});

app.get('/Gaming', function(req,res) {

    let GamingqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM gaming ORDER BY date_creation DESC LIMIT 0, 10';

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(GamingqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);


        for (var i = 0; i < results.length; i++) {
            GamingArticleId[i] = results[i].id;
            GamingArticleTitle[i] = entities.decode(results[i].titre);
            GamingArticleSubTitle[i] = entities.decode(results[i].sous_titre);
            GamingArticleImage[i] = '/img/img/' + results[i].photo;
            GamingArticleDate[i] = results[i].date_creation;
            GamingArticleCategorie[i] = entities.decode(results[i].categorie);
            GamingArticleContent[i] = entities.decode(results[i].contenu);
        }
                res.charset = 'utf-8';

        res.render('Gaming', {
            logged: islogged,
            GamingId: GamingArticleId,
            GamingCategorie: GamingArticleCategorie,
            GamingTitre: GamingArticleTitle,
            GamingSous_titre: GamingArticleSubTitle,
            GamingPhoto: GamingArticleImage,
            GamingDate: GamingArticleDate,
            GamingContent: GamingArticleContent,

            Day : date,
            Time : time


        });
    });
    // Gaming articles
    GamingArticleId = [];
    GamingArticleTitle = [];
    GamingArticleSubTitle = [];
    GamingArticleImage = [];
    GamingArticleDate = [];
    GamingArticleCategorie = [];
    GamingArticleContent = [];
    
});

//------------------------------------------------------------------------------------------------------------
app.get('/Applications', function(req,res) {

    let AppqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM apps ORDER BY date_creation DESC LIMIT 0, 10';

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(AppqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);


        for (var i = 0; i < results.length; i++) {
            AppArticleId[i] = results[i].id;
            AppArticleTitle[i] = entities.decode(results[i].titre);
            AppArticleSubTitle[i] = entities.decode(results[i].sous_titre);
            AppArticleImage[i] = '/img/img/' + results[i].photo;
            AppArticleDate[i] = results[i].date_creation;
            AppArticleCategorie[i] = entities.decode(results[i].categorie);
            AppArticleContent[i] = entities.decode(results[i].contenu);
        }
                res.charset = 'utf-8';

        res.render('Applications', {
            logged: islogged,
            AppId: AppArticleId,
            AppCategorie: AppArticleCategorie,
            AppTitre: AppArticleTitle,
            AppSous_titre: AppArticleSubTitle,
            AppPhoto: AppArticleImage,
            AppDate: AppArticleDate,
            AppContent: AppArticleContent,

            Day : date,
            Time : time


        });
    });
    // App articles
    AppArticleId = [];
    AppArticleTitle = [];
    AppArticleSubTitle = [];
    AppArticleImage = [];
    AppArticleDate = [];
    AppArticleCategorie = [];
    AppArticleContent = [];
    
});

//---------------------------------------------------------------

app.get('/Mangas', function(req,res) {

    let MangasqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM Mangas ORDER BY date_creation DESC LIMIT 0, 10';

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(MangasqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);


        for (var i = 0; i < results.length; i++) {
            MangasArticleId[i] = results[i].id;
            MangasArticleTitle[i] = entities.decode(results[i].titre);
            MangasArticleSubTitle[i] = entities.decode(results[i].sous_titre);
            MangasArticleImage[i] = '/img/img/' + results[i].photo;
            MangasArticleDate[i] = results[i].date_creation;
            MangasArticleCategorie[i] = entities.decode(results[i].categorie);
            MangasArticleContent[i] = entities.encode(results[i].contenu);
            
        }

                res.charset = 'utf-8';

        res.render('Mangas', {
            logged: islogged,
            MangasId: MangasArticleId,
            MangasCategorie: MangasArticleCategorie,
            MangasTitre: MangasArticleTitle,
            MangasSous_titre: MangasArticleSubTitle,
            MangasPhoto: MangasArticleImage,
            MangasDate: MangasArticleDate,
            MangasContent: MangasArticleContent,

            Day : date,
            Time : time


        });
    });
    // Mangas articles
    MangasArticleId = [];
    MangasArticleTitle = [];
    MangasArticleSubTitle = [];
    MangasArticleImage = [];
    MangasArticleDate = [];
    MangasArticleCategorie = [];
    MangasArticleContent = [];
    
});



// Les gets du profils 
//---------------------------------------------------------------
app.get('/profileGaming', isLoggedIn, function(req,res){

    let GamingqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM gaming ORDER BY date_creation DESC LIMIT 0, 10';

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(GamingqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);


        for (var i = 0; i < results.length; i++) {
            GamingArticleId[i] = results[i].id;
            GamingArticleTitle[i] = entities.decode(results[i].titre);
            GamingArticleSubTitle[i] = results[i].sous_titre;
            GamingArticleImage[i] = '/img/img/' + results[i].photo;
            GamingArticleDate[i] = results[i].date_creation;
            GamingArticleCategorie[i] = results[i].categorie;
            GamingArticleContent[i] = results[i].contenu;
        }
        res.charset = 'utf-8';

        res.render('profileGaming', {
            logged: islogged,
            GamingId: GamingArticleId,
            GamingCategorie: GamingArticleCategorie,
            GamingTitre: GamingArticleTitle,
            GamingSous_titre: GamingArticleSubTitle,
            GamingPhoto: GamingArticleImage,
            GamingDate: GamingArticleDate,
            GamingContent: GamingArticleContent,

            Day: date,
            Time: time


        });
    });
    // Gaming articles
    GamingArticleId = [];
    GamingArticleTitle = [];
    GamingArticleSubTitle = [];
    GamingArticleImage = [];
    GamingArticleDate = [];
    GamingArticleCategorie = [];
    GamingArticleContent = [];
});
//---------------------------------------------------------------
app.get('/profileMangas', isLoggedIn, function(req,res){

    let MangasqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM Mangas ORDER BY date_creation DESC LIMIT 0, 10';

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(MangasqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);


        for (var i = 0; i < results.length; i++) {
            MangasArticleId[i] = results[i].id;
            MangasArticleTitle[i] = entities.decode(results[i].titre);
            MangasArticleSubTitle[i] = results[i].sous_titre;
            MangasArticleImage[i] = '/img/img/' + results[i].photo;
            MangasArticleDate[i] = results[i].date_creation;
            MangasArticleCategorie[i] = results[i].categorie;
            MangasArticleContent[i] = results[i].contenu;
        }
        res.charset = 'utf-8';

        res.render('profileMangas', {
            logged: islogged,
            MangasId: MangasArticleId,
            MangasCategorie: MangasArticleCategorie,
            MangasTitre: MangasArticleTitle,
            MangasSous_titre: MangasArticleSubTitle,
            MangasPhoto: MangasArticleImage,
            MangasDate: MangasArticleDate,
            MangasContent: MangasArticleContent,

            Day: date,
            Time: time
        });
    });
    // Mangas articles
    MangasArticleId = [];
    MangasArticleTitle = [];
    MangasArticleSubTitle = [];
    MangasArticleImage = [];
    MangasArticleDate = [];
    MangasArticleCategorie = [];
    MangasArticleContent = [];
});
//---------------------------------------------------------------
app.get('/profileApps', isLoggedIn, function(req,res){

    let AppqueryArticle = 'SELECT id, titre,sous_titre,photo,categorie, contenu,date_creation, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM apps ORDER BY date_creation DESC LIMIT 0, 10';

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');

    connection.query(AppqueryArticle, (error, results, fields) => {
        if (error)
            return console.error(error.message);


        for (var i = 0; i < results.length; i++) {
            AppArticleId[i] = results[i].id;
            AppArticleTitle[i] = entities.decode(results[i].titre);
            AppArticleSubTitle[i] = results[i].sous_titre;
            AppArticleImage[i] = '/img/img/' + results[i].photo;
            AppArticleDate[i] = results[i].date_creation;
            AppArticleCategorie[i] = results[i].categorie;
            AppArticleContent[i] = results[i].contenu;
        }
        res.charset = 'utf-8';

        res.render('profileApps', {
            logged: islogged,
            AppId: AppArticleId,
            AppCategorie: AppArticleCategorie,
            AppTitre: AppArticleTitle,
            AppSous_titre: AppArticleSubTitle,
            AppPhoto: AppArticleImage,
            AppDate: AppArticleDate,
            AppContent: AppArticleContent,

            Day: date,
            Time: time


        });
    });
    // App articles
    AppArticleId = [];
    AppArticleTitle = [];
    AppArticleSubTitle = [];
    AppArticleImage = [];
    AppArticleDate = [];
    AppArticleCategorie = [];
    AppArticleContent = [];
});



//---------------------------------------------------------------
// Posts Requests 
//---------------------------------------------------------------
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}),
    function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        islogged = true;
        res.redirect('/profile');
    }
);
//---------------------------------------------------------------

app.post('/', function(req,res){

    var user_mail = req.body.subscribe;
    let insert_mail_query = "INSERT INTO mails (mail_add) VALUES('"+user_mail+"')";

    connection.query(insert_mail_query, (error,results,fields) => {
        if(error)
            console.log(error.message);

        console.log("L'address mail suivante vient d'être inséré :");
        console.log(user_mail);
        res.redirect('/');
    });
});


// Les posts de suppresions de champs 
//---------------------------------------------------------------
app.post('/profileGaming', isLoggedIn, function(req,res){

    let buttonValue = req.body.deleteButton;
    console.log("Ceci est la valeur du boutton :");
    console.log(buttonValue);
    let sqlDelete = "DELETE FROM gaming WHERE id ='"+buttonValue+"'";
    connection.query(sqlDelete, (error,results,fields) => {
        if(error)
            console.log(error.message);

            console.log("Row deleted");
    });
    res.redirect('/profileGaming');
})


//---------------------------------------------------------------
app.post('/profileMangas', isLoggedIn, function(req,res){

    let buttonValue = req.body.deleteButton;
    console.log("Ceci est la valeur du boutton :");
    console.log(buttonValue);
    let sqlDelete = "DELETE FROM mangas WHERE id ='"+buttonValue+"'";
    connection.query(sqlDelete, (error,results,fields) => {
        if(error)
            console.log(error.message);

            console.log("Row deleted");
    });
    res.redirect('/profileMangas');
})


//---------------------------------------------------------------
app.post('/profileApps', isLoggedIn, function(req,res){

    let buttonValue = req.body.deleteButton;
    console.log("Ceci est la valeur du boutton :");
    console.log(buttonValue);
    let sqlDelete = "DELETE FROM Apps WHERE id ='"+buttonValue+"'";
    connection.query(sqlDelete, (error,results,fields) => {
        if(error)
            console.log(error.message);

            console.log("Row deleted");
    });
    res.redirect('/profileApps');
})


//---------------------------------------------------------------
app.post('/profile', isLoggedIn, function(req,res){

    var date = moment().format('dddd');
    var time = moment().format('MMMM Do YYYY');
    var timeNow = moment().format('YYYY-MM-DD');

    console.log(timeNow);
    

   
   

        upload(req, res, (err) => {
            if (err) {
                res.render('profile', {
                    msg: err,
                    Day: date,
                    Time: time,
                    logged: islogged
                });
            } else {
                if (req.file == undefined) {
                    res.render('profile', {
                        msg: 'Error: No File Selected!',
                        Day: date,
                        Time: time,
                        logged: islogged
                    });
                } else {
                    let titre = entities.encode(req.body.titre);
                    let sousTitre = entities.encode(req.body.sousTitre);
                    let text = entities.encode(req.body.text);
                    let categorie = entities.encode(req.body.categorie);
                    console.log(categorie);

                    let knowYourCategory = req.body.categorie;

                    let imageName = req.file.filename;
                    let GamingInsertQuery = "INSERT INTO gaming (titre,sous_titre,photo,categorie,contenu,date_creation) VALUES('" + titre + "','" + sousTitre + "','" + imageName + "','" + categorie + "','" + text + "','" + timeNow + "')";
                    let MangaInsertQuery = "INSERT INTO mangas (titre,sous_titre,photo,categorie,contenu,date_creation) VALUES('" + titre + "','" + sousTitre + "','" + imageName + "','" + categorie + "','" + text + "','" + timeNow + "')";
                    let AppInsertQuery = "INSERT INTO apps (titre,sous_titre,photo,categorie,contenu,date_creation) VALUES('" + titre + "','" + sousTitre + "','" + imageName + "','" + categorie + "','" + text + "','" + timeNow + "')";
                    
                    if(knowYourCategory == 'Gaming'){
                    connection.query(GamingInsertQuery, (error,results,fields)=> {
                        if(error)
                            console.log(error.message);

                        res.render('profile', {
                            msg: 'Article Successfully uploaded',
                            file: `img/img/${req.file.filename}`,
                            Day: date,
                            Time: time,
                            logged: islogged
                        });
                    })
                    
                    console.log("-----------------------------------");
                    console.log(imageName);
                    }
                    if(knowYourCategory == 'Mangas'){
                    connection.query(MangaInsertQuery, (error,results,fields)=> {
                        if(error)
                            console.log(error.message);

                        res.render('profile', {
                            msg: 'Article Successfully uploaded',
                            file: `img/img/${req.file.filename}`,
                            Day: date,
                            Time: time,
                            logged: islogged
                        });
                    })
                    
                    console.log("-----------------------------------");
                    console.log(imageName);
                    }
                    if(knowYourCategory == 'Gadgets'){
                    connection.query(AppInsertQuery, (error,results,fields)=> {
                        if(error)
                            console.log(error.message);

                        res.render('profile', {
                            msg: 'Article Successfully uploaded',
                            file: `img/img/${req.file.filename}`,
                            Day: date,
                            Time: time,
                            logged: islogged
                        });
                    })
                    
                    console.log("-----------------------------------");
                    console.log(imageName);
                    }
                }
            }
        });
    


});

//---------------------------------------------------------------


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


http.listen(port, function () {
    log.info('Web', 'Server listening on *:' + port);
});


