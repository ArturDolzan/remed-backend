const config = require('../config/apiUrl')

module.exports = app => {

    app.post(`${config.routeProd}/signup`, app.api.user.save)
    app.post(`${config.routeProd}/signin`, app.api.auth.signin)

}