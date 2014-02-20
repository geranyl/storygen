var storyObjs = require('./storyobjs.js'),
    dm = require('./datamodel.js'),
    comm = require('./comm.js');


var choiceBeingAddedTo,
    node,
    nodeOnly = false;

function getState() {

    var obj = {};
    obj.newNodeId = storyObjs.getCurId();
    obj.disabled = dm.DataModel.isEmpty() || choiceBeingAddedTo ? false : true || nodeOnly;
    obj.nodeOnly = nodeOnly;


    var nextNode;
    if (choiceBeingAddedTo) {
        nextNode = dm.DataModel.getNode(choiceBeingAddedTo.nextNodeId);
        if (nextNode) {
            node = nextNode;
        }
    }



    if (node) {
        obj.title = node.title;
        obj.text = node.text;
        obj.newNodeId = node.id;
        for (var i = 0; i < node.choices.length; i++) {
            obj['choice' + (i + 1)] = node.choices[i].text;
        }

    }


    return  obj;
}

function setChoice(curChoiceId, isNode) {
    if (!isNode) {
        nodeOnly = false;
        choiceBeingAddedTo = dm.DataModel.getNode(curChoiceId);
        node = null;
    } else {
        nodeOnly = true;
        node = dm.DataModel.getNode(curChoiceId);
        choiceBeingAddedTo = null;
    }

    comm.sendData('updateForm', getState());

    console.log('being added', choiceBeingAddedTo);
}

function getChoice() {
    return choiceBeingAddedTo;
}

exports.getState = getState;

exports.setChoice = setChoice;
exports.getChoice = getChoice;