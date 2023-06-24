const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = async (req, res) => {
  console.log("get-conatct-req", req.user?.id);
  const contact = await Contact.find({ user_id: req.user?._id });
  res.status(200).json(contact);
};

const createContact = asyncHandler(async (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    res.status(400);
    throw new Error("All fields are mendetory");
  }
  const contact = await Contact.create({
    name,
    email,
    mobile,
    user_id: req.user?._id,
  });
  res.status(200).json(contact);
});

// by id
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact?.user_id?.toString() !== req.user?._id) {
    res.status(401);
    throw new Error("we don't have user with given id ");
  }
  res.status(200).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id?.toString() !== req.user._id) {
    res.status(401);
    throw new Error("we don't have user with given id ");
  }
  await Contact.deleteOne({ _id: id });

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
