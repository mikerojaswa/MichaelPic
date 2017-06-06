"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        const server = http.createServer(this.express);
        server.listen(3000);
        console.log('We are now listening on 3000');
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(bodyParser.json({ limit: '50mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        //this.express.use(bodyParser.json({));
    }
    // Configure API endpoints.
    routes() {
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
            res.send('DELETE');
        });
        this.express.use('/', router);
        router.get('/users', (req, res) => {
            res.json(users);
            console.log('GET USERS');
        });
    }
}
new App();
/*router.get('/shoes', (req, res, next) => {

    res.json({
        message: 'Hello World!' + req.query.type
    });
});*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFDbkMsMENBQTBDO0FBRTFDLGtEQUFrRDtBQUNsRDtJQUtJLG9EQUFvRDtJQUNwRDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBRS9DLENBQUM7SUFFRCxnQ0FBZ0M7SUFDeEIsVUFBVTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELHVDQUF1QztJQUMzQyxDQUFDO0lBRUQsMkJBQTJCO0lBQ25CLE1BQU07UUFDVjs7MkJBRW1CO1FBQ25CLElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO1lBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsd0JBQXdCO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUNqQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1AsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQUVELElBQUksR0FBRyxFQUFFLENBQUM7QUFFVjs7Ozs7S0FLSyJ9