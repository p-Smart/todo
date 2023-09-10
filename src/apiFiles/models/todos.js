const mongoose = require('mongoose')
const { Schema } = mongoose;


const TodosModel = new Schema({
    userId: String,
    title: String,
    date: {
        startTime: Date,
        finishTime: Date
    },
    completed: Boolean,

    'default': Boolean,
    deletedBy: Array,
    date_added: Date
  })

const Todos = mongoose.models.Todos ||  mongoose.model('Todos', TodosModel)

export default Todos