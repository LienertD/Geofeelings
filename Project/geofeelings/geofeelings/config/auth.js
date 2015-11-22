/**
 * Created by Lienert on 22/11/2015.
 */
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1648387408774861', // your App ID
        'clientSecret'  : 'ab3fbd183a96add8eead7434dbf8b98c', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : { //twitter en google mss later toevoegen
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};