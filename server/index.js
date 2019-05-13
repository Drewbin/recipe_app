require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const controller = require('./app_controller');

const app = express();

massive(process.env.DB_CONNECTION_STRING, { scripts: __dirname + '/db' }).then(dbInstance => {
    console.log('Connected to the DB.');
    app.set('db', dbInstance);
}).catch(err => {
    console.error(err);
});

passport.use('register', new LocalStrategy({
    usernameField: 'email',
}, (email, password, done) => {
    const db = app.get('db');

    const hashedPassword = bcrypt.hashSync(password, 15);

    db.users.find({ email }).then(userResults => {
        if(userResults > 0) {
            return done(JSON.stringify({ message: 'Username is already in use.'}));
        };

        return db.users.insert({
            email, 
            password: hashedPassword,
        });
    }).then(user => {
        done(null, user);
    }).catch(err => {
        console.error(err);
        done(JSON.stringify({ message: 'Server failure.' }));
    });
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
}, (email, password, done) => {
    if(!email || !password) {
        return done({ message: 'Email and password are required.' });
    };

    const db = app.get('db')

    db.users.find({ email }).then(userResults => {
        if (userResults.length === 0) {
            return done( 'Username or password is invalid' );
        };

        const user = userResults[0];

        const storedPassword = user.password;

        if(!bcrypt.compareSync(password, storedPassword)) {
            return done( 'Username or password is incorrect.' );
        };
        
        delete user.password;

        done(null, userResults[0]);
    }).catch(err => {
        console.error(err);
        done( 'Unknown error occurred.' );
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "I'll never tell!",
}))
app.use(passport.initialize());
app.use(passport.session());

//Auth endpoints
app.post('/register', passport.authenticate('register'), (req,res) => {
    res.send({ message: 'Successfully registered', user: req.user });
});

app.post('/login', passport.authenticate('login'), (req, res) => {
    res.send({ message: 'Login successful.', user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});


//App endpoints
app.get('/api/recipes', controller.getAll);
app.post('/api/recipes', controller.create);
app.delete('/api/recipes/:id', controller.delete);
app.get('/api/recipes/:id', controller.getOne);

app.listen(4000, () => {
    console.log('Backend up and running at localhost:4000.')
})

