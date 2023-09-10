import connectToDB from "src/apiFiles/components/dbConnect"
import Todos from "src/apiFiles/models/todos"

const AddTodo = async ({headers, body}, res) => {
    var response
    const {todoContent, startTime, finishTime, completed} = body
    try{
        await connectToDB()
        const sessionId = headers["authorization"]

        await Todos.create({
            title: todoContent,
            date: {
                startTime,
                finishTime,
            },
            completed,
            userId: sessionId,
            date_added: new Date()
        })

        response = {success: true, message: 'Todo added successfully'}
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

export default AddTodo