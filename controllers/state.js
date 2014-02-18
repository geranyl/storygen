var storyObjs = require('./storyobjs.js'),
    dm = require('./datamodel.js'),
    comm = require('./comm.js');


var choiceBeingAddedTo;

function getState() {

    var obj = {};
    obj.newNodeId = storyObjs.getCurId();
    obj.disabled = dm.DataModel.isEmpty() || choiceBeingAddedTo ? false : true;
    obj.dayNum = 2;

    if(choiceBeingAddedTo){
        var nextNode = dm.DataModel.getNode(choiceBeingAddedTo.nextNodeId);
        if(nextNode){
            obj.title = nextNode.title;
            obj.text = nextNode.text;
            obj.newNodeId = nextNode.id;
            obj.dayNum  = nextNode.dayNum;
            for (var i = 0; i<nextNode.choices.length; i++){
                obj['choice'+(i+1)] = nextNode.choices[i].text;
            }
        }
    }


    return  obj;
}

function setChoice(curChoiceId) {
    choiceBeingAddedTo = dm.DataModel.getNode(curChoiceId);

    comm.sendData('updateForm', getState());

    console.log('being added', choiceBeingAddedTo)
}

function getChoice() {
    return choiceBeingAddedTo;
}

exports.getState = getState;

exports.setChoice = setChoice;
exports.getChoice = getChoice;