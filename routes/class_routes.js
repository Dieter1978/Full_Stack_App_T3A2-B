import {Router} from 'express'
import {ClassModel} from '../db.js'

const router = Router()


// GET Classes
router.get('/', async(req,res) => res.send(await ClassModel.find()))


router.get('/:year_id', async(req,res) => {
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
router.post('/:year_id', async(req,res) => {
    try
    {
        // create the new class instance
        const newClass = await ClassModel.create({class : req.body.class})
        // add the class to the year object
        const updateYear = await YearModel.findById(req.params.year_id)
        
        if(updateYear)
        {
            updateYear.class.append(newClass)

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


// Update a Class PUT
router.put('/:id', async (req, res)=>{
    try {
        const updateClass = {}

        if(req.body.content)
        {
            updateClass.content = req.body.content
        }

        const aClass = await ClassModel.findByIdAndUpdate(req.params.id, updateClass, {new:true})

        if(aClass)
        {
            res.send(aClass)
        }
        else 
        {
            res.status(404).send({error:'Not Found'})
        }
    }
    catch(err){
        res.status(500).send({error: err.message})
    }


})

// Delete a Class DELETE

router.delete('/:id', async (req,res) => {
    try
    {
        const aClass = await ClassModel.findByIdandDelete(req.params.id)
      
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