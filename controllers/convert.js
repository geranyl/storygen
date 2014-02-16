
var nodes = [],
    choices = [],
    newJson={items:[]};


//convert to flow chart form
function convert(json){
    var length = json.items.length,
        i = 0;

console.log('in convert', length)
    for (i; i < length; i++) {
        var node = json.items[i];
        nodes.push(node);
        for (var m = 0; m < node.choices.length; m++) {
            choices.push(node.choices[m]);
        }
    }


    var rtnVal = getNext(nodes[0], newJson.items);
    return rtnVal;
}






function getNext(arrNode, node){

    var parent = arrNode;
    parent.children = [];
    node.push(parent);


    for (var m= 0; m<arrNode.choices.length; m++){
        var choice = arrNode.choices[m];
        parent.children.push(choice);
        choice.children = [];
        var next = getNode(arrNode.choices[m].nextNodeId);
        getNext(next, choice.children);
    }


    return newJson;

}



function getNode(nodeId){
    for (var index in nodes){
        if(nodes[index].id == nodeId){
            var foundNode = nodes[index];
            return foundNode;
        }
    }
    return null;
}


exports.convert = convert;