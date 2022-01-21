var mongoose = require('mongoose');
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;
var h = "Hello".toLowerCase
var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
var fullname = '';
if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
}
if (!this.first_name || !this.family_name) {
    fullname = '';
}    
return fullname;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function() {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED): '';
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function() {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED): '';
});

AuthorSchema
.virtual('lifespan')
.get(function() {
  return this.date_of_birth_formatted + ' - ' + this.date_of_death_formatted;
});

AuthorSchema
  .virtual('date_of_birth_for_form')
  .get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
  });

AuthorSchema
  .virtual('date_of_death_for_form')
  .get(function () {
    return DateTime.fromJSDate(this.date_of_death).toISODate();
  });


//Export model
module.exports = mongoose.model('Author', AuthorSchema);