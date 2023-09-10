import connectToDB from "src/apiFiles/components/dbConnect"
import Todos from "src/apiFiles/models/todos"

const EditTodo = async ({headers, body}, res) => {
    var response
    const {todoId, todoContent, startTime, finishTime, completed} = body
    try{
        await connectToDB()
        const sessionId = headers["authorization"]
        const todo = await Todos.findOne({
            $or: [
                {
                    _id: todoId,
                    default: true
                },
                {
                    _id: todoId,
                    userId: sessionId
                },
            ]
        })
        if(todo.default){
            await Todos.updateOne({_id: todo._id}, { $addToSet: { deletedBy: sessionId } })
            await Todos.create({
                ...todo,
                title: todoContent,
                date: {
                    startTime,
                    finishTime,
                },
                ...completed && {completed},
                userId: sessionId,
                date_added: new Date()
            })
        }
        else{
            await Todos.updateOne({_id: todo._id, userId: sessionId}, {
                title: todoContent,
                date: {
                    startTime,
                    finishTime,
                },
                completed,
            })
        }

        response = {success: true, message: (completed!==null && completed!==undefined) ? `Marked task as ${completed ? 'completed' : 'not completed'}` : 'Updated task successfully' }
    }
    catch(err){
        console.error(err.message)
        response = {
            error: {
                message : err.message
            }
        }
    }
    finally{
        return res.json(response)
    }
}

export default EditTodo