//DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db

//ROUTES 
//1. get all
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})
//2. get one by id
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {event_id: req.params.id}
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})
//3. create one
events.post('/', async (req,res) =>{
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new event',
            data: newEvent
        })
    } catch(error) {
        res.status(500).json(error)
    }
    
})
//update one event by id
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
//delete an event
events.delete(':/id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_it: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//EXPORTS
module.exports = events