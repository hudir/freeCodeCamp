'use strict';

const Issue = require('../mongodb')

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let query = req.query
      
      if(query) {
         Issue.find({project, ...query})
      .then(data=>{
        res.json(data)})
      .catch(err=>console.log(err))
        
      } else {
         Issue.find({project})
      .then(data=>{
        res.json(data)})
      .catch(err=>console.log(err))
      }     
    })
    
    .post(function (req, res){
      let project = req.params.project;
      Issue.create({project, ...req.body})
      .then(data=>{
        res.json(data)
      })
      .catch(err=>res.json({error: 'required field(s) missing'})) 
    })
    
    .put(function (req, res){
      let project = req.params.project;
      if(!req.body._id)  {
        res.json({ error: 'missing _id' })
      } else if(Object.entries(req.body).length<2) {
        res.json({ error: 'no update field(s) sent', '_id': req.body._id })
      }
      else {
        Issue.findOne({_id: req.body._id}, (err,data)=>{
          if(err || !data) return res.json({ error: 'could not update', '_id': req.body._id})
          const obj = req.body
          const _id = req.body._id
          delete obj._id
          
          Issue.updateOne({_id}, {$set: {...obj, updated_on: Date.now()}}, (err,result)=>{
           
             if(err) {
               return res.json({ error: 'could not update', '_id': _id})
             }
            res.json({  result: 'successfully updated', '_id': _id })
          })
        })
      }     
    })
    
    .delete(function (req, res){
      let project = req.params.project;
         if(!req.body._id)  {
        res.json({ error: 'missing _id' })
      } else {
           const _id=req.body._id
           
           Issue.findOne({_id})
           .then(data=>{
             if(data) {
               Issue.deleteOne({_id}, err =>{
             if(err) res.json({ error: 'could not delete', '_id':_id })
             else {
               res.json({ result: 'successfully deleted',  '_id':_id })
               console.log(123)
             }
           })
             } else res.json({ error: 'could not delete', '_id':_id })
           })
           .catch(err=>res.json({ error: 'could not delete', '_id':_id }))             
      }
    });
    
};
