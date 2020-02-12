var Project = require('../db/project');

module.exports = function (router) {

    router.route('/project')
        .post((req, res) => {
            console.log(req.authToken)
            let p = new Project(req.body);
            p.createdBy = req.authUser._id;
            p.save((err, done) => {
                if (err) throw err;
                return res.send("ok");
            });
        })
        .put((req, res) => {
            console.log(req.body)
            let projId = req.body._id;
            let data = req.body;
            delete data._id;
            Project.findByIdAndUpdate(projId, data, (err, done) => {
                if (err) throw err;
                return res.send('ok');
            })
        })

    router.get('/project/:id', (req, res) => {
        console.log(req.params);
        Project.findById({ _id: req.params.id }, (err, project) => {
            if (err) throw err;
            console.log(project);
            return res.status(200).json(project);
        })
    })

    router.delete('/project/:id', (req, res) => {
        console.log(req.params);
        Project.deleteOne({ _id: req.params.id }, (err, done) => {
            if (err) throw err;
            console.log(done);
            return res.send("ok");
        })
    })


    router.route('/projects')
        .get((req, res) => {
            console.log("GET PROJECTS CALLED");
            let filter = req.query || {};
            Project.find({
                $and: [
                    filter,
                    { createdBy: req.authUser._id }
                ]
            }, (err, projects) => {
                if (err) throw err;
                return res.json(projects);
            })
        })
}