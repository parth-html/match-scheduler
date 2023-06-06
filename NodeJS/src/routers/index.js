const express = require("express");
const Fixture = require("../models/fixture");

const router = new express.Router();

// Your code goes here
// Write a route to get fetch the matches i.e., GET /fixtures
// You should also implement below filters
//   * filter to list matches that will be held between given start and end date
//   * filter for venue


// Write a route to create a match fixture i.e., POST /fixtures
// POST route will take all of these below params
//   * team1
//   * team2
//   * venue
//   * date

router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

router.get("/fixtures", async (req, res) => {
  if(req.query.start_date && req.query.end_date){
    const response = await Fixture.find({$and:[{ "date": { $gte: req.query.start_date } },{ "date": { $lte: req.query.end_date } },{ "venue": req.query.venue }]})
    res.json({ count: response.length, records: response })
  }else if (req.query.start_date) {
    const response = await Fixture.find({ "date": { $gte: req.query.start_date } })
    res.json({ count: response.length, records: response })
  } else if (req.query.end_date) {
    const response = await Fixture.find({ "date": { $lte: req.query.end_date } })
    res.json({ count: response.length, records: response })
  } else if (req.query.venue) {
    const response = await Fixture.find({ "venue": req.query.venue })
    res.json({ count: response.length, records: response })
  } else {
    const response = await Fixture.find();
    res.json({ count: response.length, records: response });
  }
})

router.post("/fixtures", async (req, res) => {
  try{
    var temp = req.body
    var response = await Fixture.create(temp);
    res.json(response);
  }catch(ex){
    res.json({error:ex.message}).status(500)
  }
  
})

module.exports = router;