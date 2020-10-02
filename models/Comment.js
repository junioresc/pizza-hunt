const { Schema, model, Types } = require(`mongoose`);
const moment = require(`moment`);

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            trim: true,
            required: `You need to include something in the reply!`
        },
        writtenBy: {
            type: String,
            required: `You need to associate a name with this reply!`
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format(`MMM DD, YYYY [at] hh:mm a`)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: `You need to include a name!`
        },
        commentBody: {
            type: String,
            trim: true,
            required: `You need to include something in the comment!`
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format(`MMM DD, YYYY [at] hh:mm a`)
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

CommentSchema.virtual(`replyCount`).get(function() {
    return this.replies.length;
});

const Comment = model(`Comment`, CommentSchema);

module.exports = Comment;