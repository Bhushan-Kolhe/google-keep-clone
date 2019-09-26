const errors = require('restify-errors');
const Task = require('../Models/Tasks');


module.exports = server => {

    //Get all tasks
    server.get('/tasks', (req,res,next) => {
        Task.find({})
        .then((docs) => {
            res.send(docs);
        })
        .catch(err => next(new errors.InvalidContentError(err)));
    });

    //Add Task
    server.post('/tasks', (req,res,next) => {

        //Check for JSON
        if(!req.is('application/json'))
            return next(new errors.InvalidContentError('Expects "aplication/json"'));

        const { title, task } = req.body;
        const newTask = new Task ({
            title,
            task
        });
        newTask.save()
        .then(() => {
            res.send(201);
            next();
        })
        .catch(err => next(new errors.InternalError(err.message)));

    });

    //Update Task
    server.put('/tasks/:id', (req,res,next) => {

        //Check for JSON
        if(!req.is('application/json'))
            return next(new errors.InvalidContentError('Expects "aplication/json"'));

        Task.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            res.send(200);
            next();
        })
        .catch(err => next(new errors.ResourceNotFoundError(`There is no task with id ${req.params.id}`)));

    });

    //Delete Task
    server.del('/tasks/:id', (req, res, next) => {
        Task.findByIdAndRemove({ _id: req.params.id })
        .then(() => {
            res.send(204);
            next();
        })
        .catch( err => next(new errors.ResourceNotFoundError(`There is no task with id ${req.params.id}`)));
    });


    server.get('/test', ( req, res, next) => {
        res.send("It works");
    });
}