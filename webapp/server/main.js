import { Meteor } from 'meteor/meteor';
import '../common/router.js';

// ES TEST
(function(){
  var elasticsearch = require('elasticsearch');
  var ESclient = new elasticsearch.Client({
    host: '139.59.140.17:9200',
    log: 'trace'
  });
  ESclient.ping({
    requestTimeout: 30000,

    // undocumented params are appended to the query string
    hello: "elasticsearch"
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Hodor');
    }
  });

})()
