require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

//ket noi mongoosedb
mongoose.connect(process.env.DATABASE_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err) => {
        if(!err) {
            console.log("Connected to mongoDB!");
        }
        else {
            console.log("Error");
        }
    }
);

//set up 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
})


app.listen(3000, () => console.log("okay"));