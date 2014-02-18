var jh = require('./jsonhandler.js'),
    storyObjs = require('./storyobjs.js'),
    state = require('./state.js');


var DataModel = {
    currentData: {

    },
    createModel: function (data) {
        //this is where we load in our data and create a model in array form (temp storage as json)
        this.currentData = data;



        var length = this.currentData.items.length, i = 0, lastId = 0;
        for (i; i < length; i += 1) {
            var nodeJSON = this.currentData.items[i];
            if(nodeJSON.id > lastId){
                lastId = nodeJSON.id
            }

        }
        storyObjs.setStart(lastId);


    },

    addStoryNode: function (id, title, copy, choice1, choice2, cb) {

        console.log('adding story node');
        console.log(id)

        var existingNode = this.getNode(id);

        if (existingNode) {
            //update the node
            console.log('NODE EXISTS - updating', existingNode.id)

            existingNode.title = title;
            existingNode.copy = copy;

            if(choice1){
                if(existingNode.choices[0])
                    existingNode.choices[0].text = choice1;
                else
                    existingNode.choices.push(createChoiceNode(0, choice1, existingNode.id));
            }

            if(choice2){
                if(existingNode.choices[1])
                    existingNode.choices[1].text = choice2;
                else
                    existingNode.choices.push(createChoiceNode(1, choice2, existingNode.id));
            }

            this.updateModel(existingNode);


        } else {
            //create a new one

            function createChoiceNode(idNum, text, parentNodeId) {
                var c1 = storyObjs.Choice();
                c1.id = storyNode.id + "_" + idNum;
                c1.text = text;
                c1.parentNodeId = storyNode.id;
                return c1;
            }

            var storyNode = storyObjs.StoryNode();
            storyNode.title = title;
            storyNode.text = copy;


            if (choice1) {
                storyNode.choices.push(createChoiceNode(0, choice1, storyNode.id));
            }
            if (choice2) {
                storyNode.choices.push(createChoiceNode(1, choice2, storyNode.id));
            }

            this.currentData.items.push(storyNode);

            //get the choice that was picked to start this node from
            var choice = state.getChoice();
            if(choice){
                choice.nextNodeId = storyNode.id;
                this.updateModel(choice);
                state.setChoice(null);
            }

        }
        console.log('done updating model')

        //write the new node to json
        this.writeToJSON(cb);
    },
    writeToJSON: function (cb) {
        jh.JSONHandler.writeJSON(this.currentData, cb);
    },
    getNode: function (id) {

        var items = this.currentData.items;

        for (var key in items){
            var item = items[key];
            if(item.id == id){
                return item;
            }
            for (var choice in item.choices){
                var curChoice = item.choices[choice];
                if(curChoice.id == id){
                    return curChoice;
                }
            }
        }


        return null;
    },
    updateModel: function(nodeJson){
        var id = nodeJson.id;

        var items = this.currentData.items;

        for (var key in items){
            var item = items[key];
            if(item.id == id){
                this.copyProps(nodeJson, item);
                break;
            }
            for (var choice in item.choices){
                var curChoice = item.choices[choice];
                if(curChoice.id == id){
                    this.copyProps(nodeJson, curChoice);
                    break;
                }
            }
        }

    },
    isEmpty: function(){
        if(this.currentData.items.length == 0){
            return true;
        }
        return false;
    },
    copyProps:function (nodeJson, item){ //copy props from nodeJson to item
        for (var prop in nodeJson){
            if(item.hasOwnProperty(prop)){
                item[prop] = nodeJson[prop];
            }
        }
    }

}


//array of story nodes
//array of choices

//when adding story node, add to array

//updating of choices if editing an existing story node; updating of


exports.DataModel = DataModel;