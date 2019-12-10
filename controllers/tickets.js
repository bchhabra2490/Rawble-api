const createTicket = (req, res)=>{
    // Generate a new ticket on new query
}

const sendMessage = (req, res)=>{
    // Chat received a new message.
}

const updateMessage = (req, res)=>{
    // Mark the message isRead to true. Not to be implemented in first version
}

const getAllTickets = (req, res)=>{
    // Get all Tickets.
}

const getAllTicketsByUserId = (req, res)=>{
    // Fetch tickets of a particular User
}

const getAllMessages = (req, res)=>{
    // Get all messages of a particular ticket.
}

const getTicketData = (req, res)=>{
    // Get Data of a particular ticker (query data)
}

exports.module = {
    createTicket: createTicket,
    sendMessage: sendMessage,
    updateMessage: updateMessage,
    getAllTickets: getAllTickets,
    getAllTicketsByUserId: getAllTicketsByUserId,
    getAllMessages: getAllMessages,
    getTicketData: getTicketData
}