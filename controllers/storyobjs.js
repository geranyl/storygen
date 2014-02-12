/**
 * Created by salpy on 2014-02-11.
 */


var storyId = 0;

function StoryNode(id){
    this.id = id ? id : this.getId();
    this.day;
    this.title;
    this.text;
    this.choices = [];
}


StoryNode.prototype.getId = function(){
    if(!this.id)
        return storyId++;
    else
        return this.id;
}

//StoryNode.prototype.

function Choice(){
    this.id; //maybe NodeID_choice#
    this.text;
    this.parentNodeId; //a StoryNode
    this.nextNodeId;
}


exports.StoryNode = StoryNode;
exports.Choice = Choice;