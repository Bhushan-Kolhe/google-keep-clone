const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TaskScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    task: {
        type: String,
        required: false,
        trim: true,
        default: ""
    }
});

TaskScheme.plugin(timestamp);

const Task = mongoose.model('Task', TaskScheme);
module.exports = Task;