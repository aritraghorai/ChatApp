const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { appConfig } = require('../../config/appConfig')
const User = require('../../models/user')

module.exports = async (ctx) => {
    if (
        ctx.req.headers.authorization &&
        ctx.req.headers.authorization.toLowerCase().startsWith('bearer')
    ) {
        const token = ctx.req.headers.authorization.substring(7)
        const decode = jwt.decode(token, appConfig().JWT_SECRET)
        if (decode) {
            const user = await User.findOne({
                where: {
                    username: { [Op.eq]: decode.username }
                }
            })
            ctx.user = user.dataValues
        }
    }
    return ctx
}
