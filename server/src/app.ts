import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        const server = http.createServer(this.express);
        server.listen(3000);
        console.log('We are now listening on 3000')

    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json({limit: '50mb'}));
        this.express.use(bodyParser.urlencoded({extended: false}));
        //this.express.use(bodyParser.json({));
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        var users = ['stewie', 'brian', 'cartman'];
        var j = [];
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json(j);
        });

        router.post('/', (req, res) => {
            j.push(req.body);
            res.json({
                success: true
            });
            //console.log(req.body);
        });
        router.delete('/', function (req, res) {
            j = [];
            res.send('DELETE')
        });
        this.express.use('/', router);

        router.get('/users', (req, res) => {
            res.json(users);
            console.log('GET USERS')
        });
    }

}

new App();

/*router.get('/shoes', (req, res, next) => {

    res.json({
        message: 'Hello World!' + req.query.type
    });
});*/
