var Job = require('../db/job');

module.exports = function (router) {
    // DEP
    router.route('/job')

        // Create a new job
        .post((req, res) => {
            console.log(req.body);
            var j = new Job(req.body);
            j.createdBy = req.authUser._id;
            j.save((err, job) => {
                if (err) {
                    res.send({
                        success: false,
                        error: err
                    });
                    throw err;
                };
                res.status(200).send({
                    success: true,
                    data: job
                });
            });
        })

        // Update ou créé un job
        .patch((req, res) => {
            let jobId = req.body._id;
            let data = req.body;
            delete data._id;
            console.log("UPDATING JOB");
            console.log(jobId);
            console.log(data);
            Job.findByIdAndUpdate(jobId, data, { new: true },
                //  { upsert: true, new: true, setDefaultsOnInsert: true },
                (err, job) => {
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        })
                        throw err
                    } else if (job) {
                        console.log(job);
                        res.status(200).send({
                            success: true,
                            data: job
                        });
                    }
                }).populate(" projectId ")
        })

    // Récupère un job
    router.get('/job/:id', (req, res) => {
        console.log("OMMMGGGGG")
        console.log(req.params);
        Job.findOne({ _id: req.params.id }, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        })
    })

    // Supprime un job
    router.delete('/job/:id', (req, res) => {
        console.log(req.params);
        Job.deleteOne({ _id: req.params.id }, (err, done) => {
            if (err) throw err;
            console.log(done);
            res.send("ok");
        })
    })

    // Récupère la liste des jobs
    router.route('/jobs')
        .get((req, res) => {
            console.log("JOBS REQUEST")
            console.log(req.query);
            let filter = req.query || {};

            // By default, don't get the jobs from non actiove projects TODO
            let populateOption = {
                path: 'projectId',
                // match: { "status": { $eq: "active" } },
            }

            // If wants to get a specific project (even inactive) don't filter jobs by active project
            // if (filter.projectId) {
            //     populateOption = { path: 'projectId' };
            // }

            Job.find({
                $and: [filter, { createdBy: req.authUser._id }]
            })
                .populate(populateOption)
                .exec((err, jobs) => {
                    if (err) throw err;

                    // IF no project is selcted, only send jobs from active projects
                    if (!filter.projectId) {
                        jobs = jobs.filter(j => j.projectId.status === "active");
                    }
                    res.json(jobs);
                })
        })
}