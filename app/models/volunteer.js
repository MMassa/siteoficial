
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

/**
 * Volunteer Schema
 */

VolunteerSchema = new Schema({
    name: String,
    email: String,
    fbId: String,
    causes: [{type: ObjectId, ref:'Causes'}],
    creationDate: {type: Date, default: Date.now},
    lastLoginDate: {type: Date, default: Date.now},
    lastUpdate: {type: Date, default: Date.now},
    inactivationDate: Date,
    isActive: {type: Boolean, default: true}
});

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 5 validations only apply if you are signing up traditionally

VolunteerSchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true;
  return firstName.length;
}, 'Nome não pode ser em branco');

VolunteerSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email precisa ser fornecido');


/**
 * Statics
 */

VolunteerSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('Volunteer', VolunteerSchema);
