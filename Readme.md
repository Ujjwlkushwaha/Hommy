# Phase 0.2.1
* In this we structure our project 
* Kyuki abhi tak hmne apna sara code app.js file ke andar hi likha jisse ki vo or complex and unreadable lagne lgi hai

* Apne project ko thoda organize and we moduler bnane ke liye hm express router ka use krege

### express.Router() 
* first revise the topic => express.Router()

### Start transformation

* ### step 1. Seperate code in different files using express.Router() 
    * Create a folder => routes 
    * first we saparate all the listing routes in saparate file,
    * then we saparate all the review routes in saparate file,

    * abhi to yhi to routes bnaye thee

* ### step 2. Implement session

        
        1. npm i express-session 
        2. require('express-session');

        3. set sessionOptions = {
            secret : 'secretkey',
            resave : true,
            saveUninitialized : true
        }

        4. configureSession middleware
            app.use(session(sessionOptions))

        <!-- that it session set is done  -->
    
    * Check krne ke liye inspect krke dekh lo cookies me session id store ho gyi hogi ✅

* ### Add cookie option
    
    * Session options me ak cookie property hoti hai jisme session se related info hoti hai 
    
    * Uski help se hm session ki expiry date set kr sakte hai.

    * Isse session me store info given time tak store rhegi iske baad delete ho jaygii

            const sessionOptions= {
                secret : 'secretkey',
                resave : true,
                saveUninitialized : true,
                cookie :{
                    <!--✅ here we set expiry date after 7 days -->
                    expires : Date.now()+ 7*24*60*60*1000,
                    maxAge : 7*24*60*60*1000,
                    httpOnly : true,
                }
            }