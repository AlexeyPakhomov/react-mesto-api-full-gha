const { Schema, model } = require('mongoose');
const { regexUrl } = require('../utils/constant');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regexUrl.test(v),
        message: 'Некорректная ссылка',
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, default: [] }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

module.exports = model('Card', schema);
