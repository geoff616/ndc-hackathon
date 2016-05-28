
if (Meteor.isServer) {
  // only import this on the server!
  var elastic = require('../server/elasticsearch');
}

Meteor.startup(() => {
  // UI ROUTES

  if(!this.userId) {
    Router.route('/', function () {
    // render the Home template 
    this.render('Home', {data: {}});
  });
  } else {
     Router.route('/', function () {
    // render the thank you page 
      this.render('ThankYou', {data: {}});
   });
  }
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
  if (Meteor.isServer) {
    Router.route('/api/transaction', {where: 'server'})
     .post(function (transaction) {
      var data = transaction.body
      console.log('just got this data!');
      console.log(data);
      var reqContext = this;
      // NOTE: no error handling :/
      elastic.addDocument(data).then(function (result) { reqContext.response.end('gotz your data\n'); });
     });
  }
});


