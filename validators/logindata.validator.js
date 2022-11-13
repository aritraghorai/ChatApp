/* eslint-disable quotes */
const zod = require('zod')

const loginDataValidator = zod.object({
    username: zod.string().min(3, {
        message: 'Username must be at least 3 character'
    }),
    password: zod
        .string()
        .min(5, {
            message: 'Password must be at least 3 character'
        })
        .max(16, {
            message: "Password can't be more than 15 character"
        })
})

module.exports = loginDataValidator
