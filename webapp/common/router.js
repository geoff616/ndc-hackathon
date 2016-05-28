
if (Meteor.isServer) {
  // only import this on the server!
  var elastic = require('../server/elasticsearch');
}

Meteor.startup(() => {
  // UI ROUTES
  Router.route('/', function () {
    // render the Home template with a custom data context
    this.render('Home', {data: {title: 'My Title'}});
  });

  Router.route('/signup', function () {
    // render the Signup Template
    this.render('Signup', {data: {}});
  });

  Router.route('/signup/user', function () {
    // render the Signup Template for new users
    this.render('Signup', {data: {section: 'user'}});
  });

   Router.route('/signup/company', function () {
    // render the Signup Template for new companies
    this.render('Signup', {data: {section: 'company'}});
  });

  Router.route('/signup/merchant', function () {
    // render the Signup Template for new merchants
    this.render('Signup', {data: {section: 'merchant'}});
  });

  Router.route('/admin', function () {
    // render the admin home page
    this.render('Admin', {data: {}});
  });

  Router.route('/admin/users', function () {
    // render the Signup Template
    this.render('Admin', {data: {section: 'users'}});
  });

  Router.route('/admin/merchants', function () {
    // render the Signup Template
    this.render('Admin', {data: {section: 'merchants'}});
  });

  Router.route('/admin/reports', function () {
    // render the Signup Template
    this.render('Admin', {data: {section: 'reports'}});
  });
  // API ROUTES
  Router.route('/api/transaction', {where: 'server'})
   .post(function (transaction) {
    var data = transaction.body
    console.log('just got this data!');
    console.log(data);
    var reqContext = this;
    // NOTE: no error handling :/
    elastic.addDocument(data).then(function (result) { reqContext.response.end('gotz your data\n'); });
   });
});


