const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,

    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));
router.post('/', async (req, res) => {
    /*
   const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
*/

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save().then(function (){
       console.log("Customer saved");
        res.send(customer);
    }).catch(reason => {
        console.log('validation error',reason.message);
        res.status(400).send(reason.message);
    })


});
router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name},{phone:req.boby.phone},{new:true});
    if ((!customer)) {
        return res.status(404).send('The customer with the given ID was not found.');
    }
    res.send(customer);
});

router.put('/:id', async (req, res) => {
        const customer = await Customer.findOneAndUpdate({_id:req.params.id},{name:req.params.name},{new:true});
            $set:{name:req.params.name}
        });
   


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

    router.get('/:id',async (req, res) =>{
    const customer= await Customer.findById(req.params.id) 
        if (!customer) {
        return res.status(404).send('The customer with the given ID was not found.');
        }
        res.send(customer);

    });

    router.get('/:name',async (req, res) =>{
        const customer= await Customer.find({}) 
            if (!customer) {
            return res.status(404).send('The customer with the given ID was not found.');
            }
            res.send(customer);
    
        });
    
    router.delete('/:id', async (req, res) => {
        const customer = await Customer.findByIdAndRemove({_id: req.params.id});
        if (!customer) {
                return res.status(404).send('The customer with the given ID was not found.');
            }
        res.send(customer);
    });

module.exports = router;