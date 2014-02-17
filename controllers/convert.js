var nodes = [],
    choices = [],
    newJson = {items: []};


//convert to flow chart form
function convert(json) {
    var length = json.items.length,
        i = 0;

    for (i; i < length; i++) {
        var node = json.items[i];
        nodes.push(node);
        for (var m = 0; m < node.choices.length; m++) {
            choices.push(node.choices[m]);
        }
    }


    return getNext(nodes[0], newJson.items);
}


function getNext(arrNode, node) {

    var parent = convertToChartNode(arrNode);
    parent.children = [];
    node.push(parent);


    for (var m = 0; m < arrNode.choices.length; m++) {
        var choice = convertToChartNode(arrNode.choices[m]);
        parent.children.push(choice);
        choice.children = [];
        var next = getNode(arrNode.choices[m].nextNodeId);
        if (next) {
            getNext(next, choice.children);
        }
    }


    return newJson;

}


function convertToChartNode(node) {
    var chartNode = {};
    chartNode.data = {};
    for (var key in node) {

        chartNode.data[key] = node[key];
        if (key == "id") {
            chartNode.id = node.id;
        }

    }
    return chartNode;
}


function getNode(nodeId) {
    for (var index in nodes) {
        if (nodes[index].id == nodeId) {
            var foundNode = nodes[index];
            return foundNode;
        }
    }
    return null;
}


exports.convert = convert;