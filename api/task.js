const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada task com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskPhoto = (req, res, photo) => {

        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ 
                photo: app.db.raw(`decode(?, 'base64')`, req.body.photo)
             })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const uploadBase64Photo = (req, res) => {
        
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {

                if (!task) {                                       
                    const msg = `ReMed com id ${req.params.id} não encontrado.`
                    return res.status(400).send(msg)
                }

                if (!req.body.photo) {
                    const msg = `É necessário passar a propriedade photo (base64) no corpo da requisição do tipo Post`
                    return res.status(400).send(msg)
                }

                const photo = req.body

                updateTaskPhoto(req, res, photo)
            })
            .catch(err => res.status(400).json(err))
    }

    const downloadBase64Photo = (req, res) => {

        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id})
        .select(app.db.raw(`'data:image/gif;base64,' || encode(photo, 'base64') AS image_url`))        
        .then(task => {
            res.json(task)
        })
        .catch(err => res.status(400).json(err))

    }

    return { getTasks, save, remove, toggleTask, uploadBase64Photo, downloadBase64Photo }
}