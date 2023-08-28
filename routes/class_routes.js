import {Router} from 'express'
import {ClassModel, YearModel} from '../db.js'
import { authenticateToken, authorizeAdmin, authorizeAdminOrLinkedStudent, authorizeJWT } from '../jwt_auth.js'

const router = Router()


// GET Classes
router.get('/',authenticateToken,async(req,res) => res.send(await ClassModel.find().populate({path : 'year', select: '-_id -__v'})))


router.get('/:year_id',authenticateToken, authorizeAdmin,async(req,res) => {
    try
    {
            // find by year
            const year = await YearModel.findById(req.params.year_id)
            if(year)
            {
                res.send(year.class)
            }
            else
            {
                res.status(400).send({error : 'Error showing Classes'})
            }
    }
    catch (err)
    {
        res.status(500).send({error:err.message})
    }


})
    

// Create a Class POST
router.post('/:year_id',authenticateToken, authorizeAdmin, async(req,res) => {
    try
    {
        // create the new class instance
        const newClass = await ClassModel.create({name : req.body.name})
        // add the class to the year object
        const updateYear = await YearModel.findById(req.params.year_id)
        
        if(updateYear)
        {
            updateYear.class.push(newClass)

            const aYear = await YearModel.findByIdAndUpdate(req.params.year_id, updateYear, {new:true})
            
            if(aYear)
            {
                res.status(201).send(aYear)
    
            }
            else
            {
                res.status(400).send({error : 'Error Adding Class'})
            }
        }
        else
        {
            res.status(400).send({error : 'Error Adding Class'})
        }
    }
    catch(err)
    {
        res.status(500).send({error:err.message})
    }
})


// Create a Class without year POST
router.post('/',authenticateToken, authorizeAdmin, async(req,res) => {
    try
    {
        // check if year exists
        const existedYear = await YearModel.findOne({name: req.body.year})
        
        if(existedYear)
        {
            // create the new class instance
            const newClass = await ClassModel.create({name : req.body.name, year: existedYear})
            res.status(201).send(newClass)
        }
        else
        {
            res.status(400).send({error : 'Error Adding Class - year not found'})
        }
    }
    catch(err)
    {
        res.status(500).send({error:err.message})
    }
})

// Update a Class PUT
router.put('/:id',authenticateToken, authorizeAdmin, async (req, res)=>{
    try {
        const updateClass = {}

        if(req.body)
        {
            //TODO: complete validation - year must exist
            const foundYear = req.body.year && await YearModel.findOne({name: req.body.year.name})
            const aClass = await ClassModel.findByIdAndUpdate(req.params.id, {name : req.body.name, year: foundYear}, {new:true}).populate('year')

            if(aClass)
            {
                res.send(aClass)
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

// Delete a Class DELETE

router.delete('/:id',authenticateToken, authorizeAdmin, async (req,res) => {
    try
    {
        const aClass = await ClassModel.findByIdAndDelete(req.params.id)
      
        if (aClass){
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