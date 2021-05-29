const mongoose=require('mongoose');

var emp_modal=mongoose.model('emp_details',{
    results:{type:Array}
});

module.exports={emp_modal}