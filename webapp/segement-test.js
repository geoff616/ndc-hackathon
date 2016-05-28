var Analytics = require('analytics-node');
var analytics = new Analytics('dhzziat62bLVkuC1oT0NipPuDbe0LtYJ');

analytics.track({
  anonymousId: 123,
  event: 'test',
  properties: {
    key: 'val'
  }
});
console.log('all done!')