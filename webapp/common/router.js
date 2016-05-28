
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
    // render the Home template with a custom data context
    this.render('Signup', {data: {}});
  });

  Router.route('/admin', function () {
    // render the admin home page
    this.render('Admin', {data: {}});
  });

  Router.route('/admin/reports', function () {
    // render the Signup Template
    this.render('Reports', {data: {}});
  });
  Router.route('/admin/policies', function () {
    // render the Signup Template
    this.render('Policies', {data: {}});
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


