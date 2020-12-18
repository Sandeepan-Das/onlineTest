
const app = require("./index");

//Declaring the port for connection
const port = process.env.PORT || 3000;

//STARTING A SERVER
app.listen(port,()=>{
    console.log("Server started"+port);
})