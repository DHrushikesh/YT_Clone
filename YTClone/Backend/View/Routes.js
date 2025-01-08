import { addComment, getYtDetails, postYtDetails , getYtDetailsbyID , updateYtDetails,deleteYtDetails ,getVideosByChannelName } from "../Controllers/YtVideoDetails.js";
import { register , login , createChannel } from "../Controllers/UserController.js";
import { authentication } from "../middleware/authentication.js";

function routes(app)
{

    app.get('/ytdata',getYtDetails);
    app.post('/ytdata', authentication , postYtDetails);
    
    app.post('/ytdata/channel', getVideosByChannelName);
    

    app.get('/ytdata/:id' , getYtDetailsbyID);
    app.put('/ytdata/edit/:id', updateYtDetails);
    app.delete('/ytdata/delete/:id', deleteYtDetails);

    app.post('/comment', addComment);
    
    app.post("/register", register);
    app.post("/login", login);
    app.post("/createChannel", createChannel);

}

export default routes;