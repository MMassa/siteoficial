
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Volunteer = mongoose.model('Volunteer')
var Ngo = mongoose.model('Ngo');
var Cause = mongoose.model('Cause')


/**
 * Index
 */

exports.index = function (req, res){
    res.render('causes/index');
};


/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var article = req.article;
  utils.findByParam(article.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var article = req.article;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/articles/'+ article.id);

  article.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/articles/'+ article.id);
  });
}

/**
 * list all causes
 */

exports.list = function (req, res, next) {
    Cause.list({criteria:{isOpen:true}}, function (err, causes) {
        if(err){
            next(err);
            return;
        }
        res.render('causes/causes',{
            causes: causes,
            title:'Encontre uma ONG'
        })

  });
};
