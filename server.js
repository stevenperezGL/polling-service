const app = require('express')();
var http = require('http').createServer(app);
const port = process.env.PORT || 4000;

// app.listen(port, () => {
//     console.log(`Server running in port ${port}`);
// });

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

http.listen(port, function(){
    console.log(`Server running in port ${port}`);
});
