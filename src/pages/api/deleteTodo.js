import connectToDB from "src/apiFiles/components/dbConnect"
import Todos from "src/apiFiles/models/todos"

const DeleteTodo = async ({headers, body}, res) => {
    var response
    const {todoId} = body
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
        }
        else{
            await Todos.deleteOne({_id: todo._id, userId: sessionId})
        }

        response = {success: true, message: 'Deleted task successful' }
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

export default DeleteTodo