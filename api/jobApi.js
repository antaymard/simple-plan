var Job = require('../db/job');

module.exports = function(router) {

    router.route('/job')
    .get((req, res) => {
        res.send('post job is working !');
    })
    .post((req, res) => {
        console.log(req.body);
        var j = new Job(req.body);
        j.createdBy = req.authUser._id;
        j.save((err, done) => {
            if (err) throw err;
            res.send("ok");
        });
    })
    .put((req, res) => {
        let jobId = req.body._id;
        let data = req.body;
        delete data._id;
        Job.findByIdAndUpdate(jobId, data, (err, done) => {
            if (err) throw err;
            res.send('ok');
        })
    })
    // Supprime un job
    router.delete('/job/:id', (req, res) => {
        console.log(req.params);
        Job.deleteOne({ _id : req.params.id }, (err, done) => {
            if (err) throw err;
            console.log(done);
            res.send("ok");
        })
    })

    // Récupère la liste des jobs
    router.route('/jobs')
    .get((req, res) => {
        console.log(req.body)
        let filter = req.query || {};
        Job.find({
            $and: [
                filter,
                { createdBy : req.authUser._id }
            ]
        }, (err, jobs) => {
            if (err) throw err;
            res.json(jobs);
        }).populate(' projectId ')
    })
}