/* eslint-disable quotes */
const zod = require('zod')

const registerUserDataValidator = zod
    .object({
        username: zod.string().min(3, {
            message: 'Username must be at least 3 character'
        }),
        email: zod.string().email({
            message: 'Email must be valid email'
        }),
        password: zod
            .string()
            .min(5, {
                message: 'Password must be at least 3 character'
            })
            .max(16, {
                message: "Password can't be more than 15 character"
            }),
        confirmPassword: zod.string().min(5).max(16)
    })
    .refine((args) => args.password === args.confirmPassword, {
        message: 'Password Did not match',
        path: ['password', 'confirmPassword']
    })

module.exports = registerUserDataValidator
