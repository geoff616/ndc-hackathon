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
        body: {
            properties: {
                rq: { type: "string" },
                rs: { type: "string" },
                _meta: {type: "object"}
            }
        }
    });
}

// TODO: map imcoming document to data model
function addDocument(documentToIndex) {  
    return elasticClient.index({
        index: indexName,
        type: dataType,
        body: documentToIndex
    });
}
exports.addDocument = addDocument;
exports.initMapping = initMapping;
exports.indexExists = indexExists;  