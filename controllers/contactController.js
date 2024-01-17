const asyncHandler = require("express-async-handler") // we will not need to write different try cath block if we use it
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = async (req, res) => {
    const contacs = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacs);
};


//@desc create contact
//@route POST /api/contacts 
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are necessary");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

//@desc get contact by id
//@route GET /api/contacts/id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    // const result = await Contact.updateOne(
    //     { _id: id }, 
    //     { $set: { name: req.body.name, email: req.body.email, phone: req.body.phone } }
    // ); this is also working but writing another block of code
    if(contact.user_id.toString()!=req.user.id){
        res.statusCode(401);
        throw new Error("User don't have permission to update this contact");
    }
    const result = await Contact.updateOne(
        {_id:id},
        req.body,
        {new: true}
    );
    res.status(202).json(result);
});

//@desc delete contact
//@route DELETE /api/contacts
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!=req.user.id){
        res.statusCode(401);
        throw new Error("User don't have permission to delete this contact");
    }
    let result = await Contact.deleteOne({_id:id},{new:true});
    if(result.ackknowledged){
        console.log("contact deleted");
    }
    res.status(202).json(contact);
});

module.exports = {
    getContacts,
    updateContact,
    createContact,
    getContact,
    deleteContact
};