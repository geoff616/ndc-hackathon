var fs = require('fs');
var path = require('path');
var Analytics = require('analytics-node');
var analytics = new Analytics('dhzziat62bLVkuC1oT0NipPuDbe0LtYJ');

fs.readFile(path.join(__dirname, 'fakeData/3-OrdercreateRS.xml'), 'utf8', function(err, RS) {
  if (err) throw err;
  fs.readFile(path.join(__dirname, 'fakeData/3-OrdercreateRQ.xml'), 'utf8', function(err, RQ) {
    if (err) throw err;
    analytics.track({
      anonymousId: 2345,
      event: 'transaction',
      properties: {
        _meta: {
          // arbitrary key value pairs 
        },
        NDC_request: RQ,
        NDC_response: RS
      }
    });
    console.log('all done!')
  });
});

