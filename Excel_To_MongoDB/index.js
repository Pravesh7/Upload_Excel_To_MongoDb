const express= require('express');
const csv = require('csv-parser')
const fs = require('fs')   // FS to read from file system 
const app=express();
require('./db');
const {emp_modal}= require('./modal');


//  This createReadStream can also be put inside the app.post(); and it will still work
const results=[];
fs.createReadStream('Emp_Data.csv')
.pipe(csv({}))
.on('data', (data) => results.push(data))
.on('end', () => {
 console.log(results);


  app.get('/',(req,res) => res.send('hey there'));

 // Posting Data in Database
  app.post('/route', (req,res)=>{
  
      const emp=new emp_modal({
        results:results
      })
      emp.save()
      .then((req,res)=>{
      res.send('data sent');
      })
      .catch((err)=>{
        console.log(err);
      })
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]  
    });
})

  app.listen(7000, (req,res)=>console.log("listening"));