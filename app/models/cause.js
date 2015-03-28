
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

/**
 * Cause Schema
 */

var CauseSchema = new Schema({
    creator: {type: ObjectId, ref: 'User'} ,
    creationDate: {type: Date, default: Date.now},
    title: {type: String, default: ''},
    ngo:{type: ObjectId, ref:'Ngo'}, //all models will be loaded on the server.js file
    text: String,
    place: String,
    time: String,
    closingDate: Date,
    isOpen: {type: Boolean, default: true},
    status: {type: String, default: 'Aberta'},
    maxVolunteers: Number,
    volunteers: [{type:ObjectId, ref:'Volunteer'}],
    tags:[String]
    //eventDate: Date //includes the right time...
    //type: {type:String}
});

/**
 * Statics
 */

CauseSchema.statics = {

  /**
   * Find cause by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('ngo', 'name website')
      .exec(cb);
  },

  /**
   * List causes
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('ngo', 'name website')
      .sort({'creationDate': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

mongoose.model('Cause', CauseSchema);
