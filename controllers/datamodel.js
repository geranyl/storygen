var jh = require('./jsonhandler.js'),
    storyObjs = require('./storyobjs.js');


var DataModel = {
    currentData: {

    },
    createModel: function (data) {
        //this is where we load in our data and create a model in array form (temp storage as json)
        this.currentData = data;

        var length = this.currentData.items.length, i = 0;
        for (i; i < length; i += 1) {
            var nodeJSON = this.currentData.items[i];
            //TODO: might want to do story objects as objects and use object.create etc. - keep as json
            var node = new storyObjs.StoryNode(nodeJSON.id);
            for (var key in nodeJSON){
                if(node.hasOwnProperty(key)){
                    node[key] = nodeJSON[key];
                }
            }

            console.dir(node)
        }


    },
    storyNodes: [],
    choicesNodes: [],
    addStoryNode: function (id, title, copy, choice1, choice2) {


        if (id && this.getStoryNode(id)) {
            //update the node
        } else {
            //create a new one


            function createChoiceNode(idNum, text, parentNodeId) {
                var c1 = new storyObjs.Choice();
                c1.id = storyNode.id + "_" + idNum;
                c1.text = text;
                c1.parentNodeId = storyNode.id;
                return c1;
            }

            var storyNode = new storyObjs.StoryNode(id);
            storyNode.title = title;
            storyNode.copy = copy;


            if (choice1) {
                storyNode.choices.push(createChoiceNode(0, choice1, storyNode.id));
            }
            if (choice2) {
                storyNode.choices.push(createChoiceNode(1, choice2, storyNode.id));
            }

            this.currentData.items.push(storyNode);

        }

        //write the new node to json
        this.writeToJSON();
    },
    writeToJSON: function () {
        jh.JSONHandler.writeJSON(this.currentData);
    },
    getStoryNode: function (id) {
        //TODO: implement finding a story node
        return null;
    }
}


//array of story nodes
//array of choices

//when adding story node, add to array

//updating of choices if editing an existing story node; updating of


exports.DataModel = DataModel;