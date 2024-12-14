require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
let PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
let methodOverride = require("method-override");
var engine = require("ejs-mate");
const CustomError = require("./utils/customError.js");
const reviewsRouter = require("./routes/review.js");
const listRouter = require("./routes/listing.js");
const userRouter = require("./routes/users.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStategy = require('passport-local');
const User = require('./models/User.model.js');



// import method-override
app.use(methodOverride("_method"));

//📌 Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

//📌  parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//📌 Basic middlewares and configuration
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.set("views", path.join(__dirname, "views/layouts/"));

// 📌 static files configuration
app.use(express.static(path.join(__dirname, "public")));

// ✅ Mongo Session store for storing session information online


const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  crypto : {
    secret :process.env.SECRET,
  },
  touchAfter : 24*3600
});

store.on('error', (err) => console.log(err));

//✅  session configuration
const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7 ,
    httpOnly: true,
    secure: false, // set to true if using https
    },
}
app.use(session(sessionOptions));
app.use(flash());



//✅ ye 5 chize must hai jub bhi hm passport ka use krte hai authentication ke liye
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})


app.use('/listings',listRouter);
app.use('/listings/:id/reviews',reviewsRouter);
app.use('/',userRouter);

// 📌------ Rest Api's -------------------


app.get("/", (req, res) => {
  res.redirect("listings");
});

// *****EROOR HANDLERS****************

app.use('*' , (req, res,next) => {
  next(new CustomError(404 , 'Page Not Found'));
})

app.use((err, req, res, next) => {
  let { status, message } = err;
  res.status(status || 500).render('error', { message: message});
});

// 📌server is listening every request
app.listen(PORT, () => console.log(`listening on ${PORT}`));
