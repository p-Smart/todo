import connectToDB from "src/apiFiles/components/dbConnect"
import Todos from "src/apiFiles/models/todos"

const TodosApi = async ({headers, body}, res) => {
    var response
    let {date, start, end, perPage} = body
    try{
        await connectToDB()
        const sessionId = headers["authorization"]

        const fetchQuery = {
            $and: [
                {
                    $or: [
                        {userId: sessionId},
                        {
                            $and: [
                                {
                                    deletedBy: {
                                        $nin: [sessionId]
                                    }
                                },
                                { userId: { $exists: false } },
                            ]
                        }
                    ]
                },
                {
                    "date.startTime": {
                        $gte: new Date(date?.from),
                        $lte: new Date(date?.to)
                    }
                }
            ]
        }
        const totalTodos = await Todos.countDocuments(fetchQuery)

        const todos = await Todos.find(fetchQuery).sort({date_added: -1}).skip(start-1 || 0).limit(perPage || 5)
        response = {success: true, data: todos, total: totalTodos}
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

export default TodosApi