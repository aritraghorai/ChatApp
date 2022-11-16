/* eslint-disable quotes */
const zod = require('zod')

const messageValidator = zod.object({
    content: zod.string().min(1, {
        message: "Message can't be empty"
    }),
    to: zod.string().min(1, {
        message: "Can't be empty"
    })
})

module.exports = messageValidator
