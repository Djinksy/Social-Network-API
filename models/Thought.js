const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: function() { return new Types.ObjectId() }

    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,

    },
    username: {
        type: String,
        required: true,

    },
    createdAt: {

        type: Date,
        default: Date.now,
        get: (createdAtDate) => moment(createdAtDate).format('DD MMMM YYYY, h:mm a')

    },
}, {
    toJSON: {
        getters: true,
    },
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtDate) => moment(createdAtDate).format('DD MMMM YYYY, h:mm a')

    },
    username: {
        type: String,
        required: true,

    },
    reactions: [reactionSchema],

}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

// thoughtSchema.virtual('reactionCount').get(function() {
  //  return this.reactions.length;
//});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;