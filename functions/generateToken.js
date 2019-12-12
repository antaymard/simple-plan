module.exports = function(n = 70) {
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < n; i++)  {
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(token)
    return token;
}