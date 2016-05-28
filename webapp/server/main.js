import { Meteor } from 'meteor/meteor';
import '../common/router.js';
var elastic = require('./elasticsearch');

function esTest() {
  elastic.indexExists().then(function (exists) {  
    if (exists) {
      return elastic.deleteIndex();
    }
  }).then(function () {
    return elastic.initIndex().then(elastic.initMapping).then(function () {
      //Add a few titles for the autocomplete
      //elasticsearch offers a bulk functionality as well, but this is for a different time
      var promises = [
        'Thing Explainer',
        'The Internet Is a Playground',
        'The Pragmatic Programmer',
        'The Hitchhikers Guide to the Galaxy',
        'Trial of the Clone'
      ].map(function (bookTitle) {
        return elastic.addDocument({
          title: bookTitle,
          content: bookTitle + " content",
          metadata: {
            titleLength: bookTitle.length
          }
        });
      });
      return Promise.all(promises);
    });
  });

}

Meteor.startup(function () {
  console.log('hope this works!!!')
  esTest()
}); 

// // ES TEST
// (function(){
//   var elasticsearch = require('elasticsearch');
//   var ESclient = new elasticsearch.Client({
//     host: '139.59.140.17:9200',
//     log: 'trace'
//   });
//   ESclient.create({
//       index: 'testindex',
//       type: 'mytype',
//       id: '555',
//       body: {
//         title: 'hello world'
//       }
//   }, function (error, response) {
//      console.log('in here')
//    });
// 
// })()


// API ROUTES
// Router.route('/api/transaction', {where: 'server'})
//   .post(function (transaction) {
//     // save transaction to DB
//     var elasticsearch = require('elasticsearch');
//     var ESclient = new elasticsearch.Client({
//       host: '139.59.140.17:9200',
//       log: 'trace'
//     });
//     ESclient.create({
//       index: 'myindex',
//       type: 'mytype',
//       id: '555',
//       body: {
//         title: 'hello world'
//       }
//     }, function (error, response) {
//       console.log('in here')
//     });
//     console.log('saving some data')
//     // NOTE: returning this before we know if it succeded!
//     var data = {this_is:'saved some data'}
//     this.response.writeHead(200, {'Content-Type': 'application/json'});
//     this.response.end(JSON.stringify(data));
//   });

