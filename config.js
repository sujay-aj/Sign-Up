//config file that all secret data will be stored
module.exports = {
    "database":"mongodb+srv://admin:admin@cluster0-ezioj.gcp.mongodb.net/test?retryWrites=true&w=majority",
    "port":process.env.port || 3000 ,
    "secretKey":"SomeSsecretKey"
}