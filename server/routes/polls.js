const express = require("express");
const router = express.Router();
const Poll= require("../models/Poll.js");
 
//we will create 4 api routes and controller function here , because less routes hai to isley ek file me hi, no need for MVC architecture.
//GET /api/polls - get all polls, new first 

router.get('/',async(req,res)=> {
    try{
        const polls = await Poll.find().sort({createdAt:-1});
        res.json(polls);

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
} )

//POST /api/polls - create a new poll

router.post('/',async(req,res)=>{
    try{
        const { question, options } = req.body;
        if(!question || !options || options.length < 2 || options.length > 5){
            return res.status(400).json({message: "A poll must have a question and at least 2 options and at most 5 options."});
        }
        const formattedOptions = options.map((option) => ({ text:  typeof option === 'string' ? option : option.text, votes: 0 }));
        const poll = new Poll({ question, options: formattedOptions });
        const savedPoll = await poll.save();
        res.status(201).json(savedPoll);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

})

//GET /api/polls/:id - single poll

router.get('/:id',async(req,res)=> {
    try{
        const poll = await Poll.findById(req.params.id);
        if(!poll){
            return res.status(404).json({message: "Poll not found"});
        }
        res.json(poll);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
} )



//POST /api/polls/:id - submit Vote
router.post('/:id/vote',async(req,res)=>{
    try{
        const {optionIndex} = req.body;
        const poll = await Poll.findById(req.params.id);
        if(!poll){
            return res.status(404).json({message: "Poll not found"});
        }
        if(optionIndex < 0 || optionIndex >= poll.options.length){
            return res.status(400).json({message: "Invalid option index"});
        }
        poll.options[optionIndex].votes += 1;
        poll.totalVotes+=1;
        const updatedPoll = await poll.save();
        res.json(updatedPoll);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

})

module.exports = router;