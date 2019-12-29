'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostitSchema = new Schema({
	title: {
		type: String,
		validate: [validateLocalStrategyProperty, 'Please fill in your title'],
		required: true
	},
    text: {
		type: String,
		max: 140,
		validate: [validateLocalStrategyProperty, 'Please fill in your text'],
		required: true
    }
});

mongoose.model('Postit', PostitSchema);