const { User, Thought} = require('../models');

module.exports = {
    // Get all users
    getUsers(req,res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
// Get a single user by id
    getOneUserById(req,res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
        !user ?
        res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
// Create a new User
    createNewUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
// Update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
            )
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with that ID!' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with that ID!' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } },
            { runValidators: true, new: true }
            )
            .then((user) =>
                !user ?
                res
                .status(404)
                .json({ message: 'No user found with that ID :(' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friends: req.body.friendId } },
            { runValidators: true, new: true }
            )
            .then((user) =>
                !user ?
                res
                .status(404)
                .json({ message: 'No user found with that ID :(' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    }