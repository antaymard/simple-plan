var Project = require('../db/project');

module.exports = function(router) {
    
    router.route('/project')
    .get((req, res) => {
        res.send("working");
    })
    .post((req, res) => {
        console.log(req.authToken)
        let p = new Project(req.body);
        p.createdBy = req.authUser._id;
        p.save((err, done) => {
            if (err) throw err;
            res.send("ok");
        });
    })
    .put((req, res) => {
        let projId = req.body._id;
        let data = req.body;
        delete data._id;
        Project.findByIdAndUpdate(projId, data, (err, done) => {
            if (err) throw err;
            res.send('ok');
        })
    })
    
    router.delete('/project/:id', (req, res) => {
        console.log(req.params);
        Project.deleteOne({ _id : req.params.id }, (err, done) => {
            if (err) throw err;
            console.log(done);
            res.send("ok");
        })
    })


    router.route('/projects')
    .get((req, res) => {
        console.log("GET PROJECTS CALLED")
        Project.find({ createdBy : req.authUser._id }, (err, projects) => {
            if (err) throw err;
            res.json(projects);
        })
    })
}