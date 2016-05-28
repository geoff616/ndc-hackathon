var fs = require('fs');
var path = require('path');
var Analytics = require('analytics-node');
var analytics = new Analytics('dhzziat62bLVkuC1oT0NipPuDbe0LtYJ');

fs.readFile(path.join(__dirname, 'fakeData/3-OrdercreateRS.xml'), 'utf8', function(err, rs) {
  if (err) throw err;
  fs.readFile(path.join(__dirname, 'fakeData/3-OrdercreateRQ.xml'), 'utf8', function(err, rq) {
    if (err) throw err;
    analytics.track({
      anonymousId: 2345,
      event: 'stuff',
      properties: {
        NDC_request: rs,
        NDC_response: rq
      }
    });
    console.log('all done!')
  });
});

