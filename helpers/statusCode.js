const statusCode = {
    'success':{
        code: 200,
        reason: {
            message: 'Success',
            status: true
        }
    },
    'unauthorised':{
        code: 401,
        reason: {
            message: 'Unauthorised',
            status: false
        }
    },
    'fieldMissing':{
        code: 400,
        reason: {
            message: 'Invalid Request, Required Params Missing',
            status: false
        }
    },
    'notFound':{
        code: 404,
        reason: {
            message: 'Data not found',
            status: false
        }
    },
    'serverFailure':{
        code: 500,
        reason: {
            message: 'Server Crashed',
            status: false
        }
    },
}

module.exports = statusCode;