const { Thought, User} = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
// Get a single thought by id
getOneThoughtById(req,res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
    !thought ?
    res.status(404).json({ message: "No thought with that ID"})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
// Create a thought
createThought(req,res) {
    Thought.create(req.body)
    .then((thought) =>
    User.findOneAndUpdate(
        { username: req.body.username},
        { $addToSet: { thoughts: thought._id } },
        { new: true }
    ) 
    )
    .then ((user) =>
    !user 
    ? res.status(404).json({
        message: "Thought created, no user with that id",
    })
    : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
// update a thought
updateThought(req,res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true}
    )
    .then((thought) =>
    !thought ?
    res.status(404).json({ message: 'No thought with this id!'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

// Delete a thought
deleteThought(req,res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought ?
    res.status(404).json({ message: 'No thought with that ID'})
    : User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    )
    ) 
    .then((user) => 
    !user 
    ? res.status(404).json({
        message: "Thought removed, no user with this id",
    })
    : res.json({ message: "Thought deleted"})
    )
    .catch((err) => res.status(500).json(err));
},
// Add a reaction
addReaction(req,res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true}
    )
    .then((thought) =>
    !thought ?
    res.status(404).json({ message: 'No thought with this id!'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
// Deleting reaction
deleteReaction(req,res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId },
        {$pull: {reactions: {reactionId: req.params.reactionId} } },
        { runValidators: true, new: true }
    )
    ,then((thought) => 
    !thought ?
    res.status(404).json({ message: 'No thought with that ID'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};



