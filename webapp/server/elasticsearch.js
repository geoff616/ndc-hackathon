// example from: https://blog.raananweber.com/2015/11/24/simple-autocomplete-with-elasticsearch-and-node-js/

var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({  
    host: '139.59.140.17:9200',
    log: 'info'
});

var indexName = 'transactions';
var dataType = 'transaction'

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}

// TODO: figure out the data model
function initMapping() {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: dataType,
        properties: {
            anonymousId: { type: "string" },
            channel: { type: "string" },
            context: { 
                library: { 
                    name: { type: "string" },
                    version: { type: "string" }
                } 
            },
            event: { type: "string" },
            messageId: { type: "string" },
            originalTimestamp: { type: "date" },
            projectId: { type: "string" },
            properties: { 
                // todo!
            },
            receivedAt: { type: "date" },
            sentAt: { type: "date" },
            timestamp: { type: "date" },
            type: { type: "string" },
            version: {type: "integer"},
            writeKey: { type: "string" }
        }
        
    });
}

function xmlToObj(string) {
    var xml2js = new require('xml2js').Parser({
    explicitArray: false
    });
     return xml2js.parseString(string, function (err, data) {
         if (err || !data) {
             err = err || new Error('Empty Response');
             return err
         } else {
             return data
         }
     });
}

function mapIncomingDocument(doc) {
    doc.rq = xmlToObj(doc.rq);
    doc.rs = xmlToObj(doc.rs); 
    console.log(rs);
    return rs;
}


function addDocument(documentToIndex) {  
    console.log('adding a document')
    return elasticClient.index({
        index: indexName,
        type: dataType,
        body: mapIncomingDocument(documentToIndex)
    });
}
exports.addDocument = addDocument;
exports.initMapping = initMapping;
exports.indexExists = indexExists;  