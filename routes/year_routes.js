import {Router} from 'express'
import {YearModel} from '../db.js'
import { authenticateToken, authorizeAdmin } from '../jwt_auth.js'

const router = Router()

// GET Years to display
router.get('/',authenticateToken, async(req,res) => res.send(await YearModel.find()))

// Create a Year POST
router.post('/', authenticateToken, authorizeAdmin, async(req,res) => {
    try
    {
        const newYear = await YearModel.create({name : req.body.name})

        if(newYear)
        {
            res.status(201).send(newYear)

        }
        else
        {
            res.status(400).send({error : 'Error Adding Year'})
        }

    }
    catch(err)
    {
        res.status(500).send({error:err.message})
    }
})

// Display a single Year
router.get('/:id',authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const aYear = await YearModel.findById(req.params.id).populate({path: 'class',select : '-_id'})

        if(aYear)
        {
            res.send(aYear)
        }
        else 
        {
            res.status(404).send({ error: 'Year not found' })
        }
    }
    catch(err)
    {
        res.status(500).send({error:err.message})
    }

})
// Update a Year PUT
router.put('/:id',authenticateToken, authorizeAdmin, async (req,res) => {
    try {
        const updateYear =  await YearModel.findById(req.params.id)

        if(req.body.name)
        {
            const aYear = await YearModel.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new:true})

            if(aYear)
            {
                res.send(aYear)
            }
            else 
            {
                res.status(404).send({error:'Not Found'})
            }
        }
    }
    catch(err){
        res.status(500).send({error: err.message})
    }

})
// Delete a Year DELETE
router.delete('/:id',authenticateToken, authorizeAdmin, async (req,res) => {
    try
    {
        const year = await YearModel.findByIdAndDelete(req.params.id)
      
        if (year){
            res.sendStatus(200)
        } else {
            res.status(404).send({error: 'Not Found'})
        }
    }
    catch (err)
    {
        res.status(500).send(err.message)
    }


})



export default router