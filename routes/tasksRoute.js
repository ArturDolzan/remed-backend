const config = require('../config/apiUrl')

module.exports = app => {

    app.route(`${config.routeProd}/tasks`)
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save)

    app.route(`${config.routeProd}/tasks/:id`)
        .all(app.config.passport.authenticate())
        .delete(app.api.task.remove)

    app.route(`${config.routeProd}/tasks/:id/toggle`)
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)

    app.route(`${config.routeProd}/tasks/:id/uploadPhoto`)
        .all(app.config.passport.authenticate())
        .post(app.api.task.uploadBase64Photo)

    app.route(`${config.routeProd}/tasks/:id/downloadPhoto`)
        .all(app.config.passport.authenticate())
        .get(app.api.task.downloadBase64Photo)

}