const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  createdAt:      { type: Date },
  updatedAt:      { type: Date },

  title:          { type: String, required: true },
  description:    { type: String, required: true },
  remark:         { type: String },
  rating:         { type: Number, required: true },
  comments:       [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

  // category:       { type: String },
  console:        { type: String, required: true },
  author :        { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

GameSchema.pre('save', (next) => {
  // SET createdAt AND updatedAt
  const now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

module.exports = mongoose.model('Game', GameSchema)
