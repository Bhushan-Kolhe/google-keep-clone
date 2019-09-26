module.exports = {
    ENV: process.env.NODE_ENV || 'deployment',
    PORT: process.env.PORT || '5000',
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MONGODB_URI: process.env.MANGODB_URI || 'mongodb+srv://zoro:zxc@123@api-dln1s.mongodb.net/test?retryWrites=true&w=majority'
}