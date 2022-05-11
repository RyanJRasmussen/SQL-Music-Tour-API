//DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db

//ROUTES
//get all stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll()
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get one stage by id
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {name: req.params.stage},
            include: [
                {
                    model: Event,
                    as: "events"
                }
            ]
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})
//create a new stage
stages.post('/', async (req,res) =>{
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new stage',
            data: newStage
        })
    } catch(error) {
        res.status(500).json(error)
    }
    
})
//update a stage
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
//delete a stage
stages.delete(':/id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
    res.status(200).json({
        message: `Successfully deleted ${deletedStage} stage(s)`
    })
    } catch(error) {
        res.status(500).json(error)
    }
})


//EXPORTS
module.exports = stages