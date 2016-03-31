module.exports = {
    database: 'mongodb://papajo:papajo123@ds025239.mlab.com:25239/ecommerce',
    port: 3000,
    secretKey: '!!!AdamEve!!!',

    facebook: {
    clientId: process.env.FACEBOOK_ID || 'blah',
    clientSecret: process.env.FACEBOOK_SECRET || 'blah',
    profileFields: ['emails', 'displalyName'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}
}