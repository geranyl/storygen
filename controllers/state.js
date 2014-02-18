var storyObjs = require('./storyobjs.js'),
    dm = require('./datamodel.js');


var choiceBeingAddedTo;

function getState() {

    var obj = {};
    obj.newNodeId = storyObjs.getCurId();
    obj.disabled = !dm.DataModel.isEmpty || choiceBeingAddedTo ? false : true;
    obj.dayNum = 2;
    return  obj;
}

function setChoice(curChoiceId) {
    choiceBeingAddedTo = dm.DataModel.getNode(curChoiceId);
    console.log('being added', choiceBeingAddedTo)
}

function getChoice() {
    return choiceBeingAddedTo;
}

exports.getState = getState;

exports.setChoice = setChoice;
exports.getChoice = getChoice;