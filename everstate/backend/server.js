const express = require('express'); 
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')
const app = express()
const contactRoute = require('./routes/contactRoute')
const teamRoute = require('./routes/teamRoute')
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const rentRoute = require('./routes/rentRoute')
const buyRoute = require('./routes/buyRoute')


app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  }))
  app.use(express.json())
  app.use('/images', express.static(path.join(__dirname, 'images')))


app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  }))
    app.use(express.json({ limit: "1000mb", extended: true }));

mongoose.connect('mongodb+srv://sindibrahimaj24:project@everstate.pee6xuj.mongodb.net/agency?retryWrites=true&w=majority&appName=EverState')
.then(()=>{console.log("DB connect")}).catch(err => {console.log(err)})

app.use(contactRoute)
app.use(teamRoute)
app.use(signupRoute)
app.use(loginRoute)
app.use(rentRoute)
app.use(buyRoute)




app.get("/", (req,res) => {
        res.send("Hello");
    })
    
    
app.listen(5000, () => {  
        console.log('Server Created!') 
    })
    
    