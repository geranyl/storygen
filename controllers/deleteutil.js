var processedNodes,
    localJson;

function deleteItem(json, id){
    processedNodes = [];
    localJson = json;
    removeNode(id);
}

function removeNode(id){
    console.log('removing', id)
    for (var i=0; i<localJson.items.length; i++){
        var item = localJson.items[i];
        if(item.id == id){
            console.log('actually removing', id)
            localJson.items.splice(i, 1);
            i--;
            for (var k = 0; k<item.choices.length; k++){
                console.log('should be removing', item.choices[k].nextNodeId)
                removeNode(item.choices[k].nextNodeId);
            }
        }
    }

    if (processedNodes.indexOf(id) == -1) {
        processedNodes.push(id);
    }


    console.log(processedNodes)
    if(processedNodes.length == localJson.items.length)
    {
        console.log('done deleting nodes')
        return true;
    }

}

exports.deleteItem = deleteItem;