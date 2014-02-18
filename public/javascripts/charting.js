var st;

var labelType, useGradients, nativeTextSupport, animate;

(function () {
    var ua = navigator.userAgent,
        iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
        typeOfCanvas = typeof HTMLCanvasElement,
        nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
        textSupport = nativeCanvasSupport
            && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
    elem: false,
    write: function (text) {
        if (!this.elem)
            this.elem = document.getElementById('log');
        this.elem.innerHTML = text;
        this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
};


var socket;

function setSocket(io) {
    socket = io;

    socket.on('connect', function () {
        socket.emit('fetchGraph');
        socket.on('graph', function (data) {
            console.log('grabbing graph')
            console.log(data)
            init(data.items[0]);
        });

        socket.on('updateForm', function (data) {
            for (var key in data) {
                var $item = $('#' + key);
                if ($item.length) {
                    $item.attr('placeholder', data[key]);
                    $item.attr('value', data[key]);
                }

                if(key == 'newNodeId'){
                    $('#newNodeId2').attr('value', data[key]);
                }
            }
            $('#submission').removeClass('disabled');
        });

    });

}


function getHTML(data) {
    var source = $("#node-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    return html;
}


function init(json) {


    //end
    var removing = false;
    //init Spacetree

    if (!st) {

        //Create a new ST instance
        st = new $jit.ST({
            align: 'top',
            orientation: 'top', //when top it won't render past the first level - blargh
            injectInto: 'infovis',
            constrained: false, //doesn't seem to override anything - it's supposed to show the whole graph
            levelsToShow: 20,
            //add styles/shapes/colors
            //to nodes and edges

            //set overridable=true if you want
            //to set styles for nodes individually
            Node: {
                overridable: true,
                //                autoWidth: true,
                //                autoHeight: true,
                width: 300,
                height: 150,
                color: '#cccccc'
            },
            Navigation: {
                enable: true,
                panning: true
            },
//change the animation/transition effect
            transition: $jit.Trans.Quart.easeOut,

            onBeforeCompute: function (node) {
                Log.write("loading " + node.name);
            },

            onAfterCompute: function (node) {
                Log.write("done");
            },

//This method is triggered on label
//creation. This means that for each node
//this method is triggered only once.
//This method is useful for adding event
//handlers to each node label.
            onCreateLabel: function (label, node) {
                console.log(node.id)
                //add some styles to the node label
                var style = label.style;
                label.id = node.id;
                style.color = '#333';
                style.fontSize = '0.8em';
                style.textAlign = 'left';


                label.innerHTML = getHTML(node.data);

                //Delete the specified subtree
                //when clicking on a label.
                //Only apply this method for nodes
                //in the first level of the tree.
                if (node._depth % 2 != 0) {
                    style.cursor = 'pointer';
                    label.onclick = function () {
                        var curChoice = label.id;
                        console.log(curChoice)

                        socket.emit('choiceClicked', { choice: curChoice });


//                            if (!removing) {
//                                removing = true;
//                                Log.write("removing subtree...");
//                                //remove the subtree
//                                st.removeSubtree(label.id, true, 'animate', {
//                                    hideLabels: false,
//                                    onComplete: function () {
//                                        removing = false;
//                                        Log.write("subtree removed");
//                                    }
//                                });
//                            }
                    }
                }
                ;
            },
//This method is triggered right before plotting a node.
//This method is useful for adding style
//to a node before it's being rendered.
            onBeforePlotNode: function (node) {



                //                if (node._depth == 1) {
                //                    node.data.$color = '#f77';
                //                }
            },
            onAfterPlotNode: function (node) {
            }
        });

//load json data
        st.loadJSON(json);
//compute node positions and layout
        st.compute();
//optional: make a translation of the tree
//            st.geom.translate(new $jit.Complex(-500,0), "current"); //this is just moves it off screen and then it animates in
//Emulate a click on the root node.
        st.onClick(st.root);
//end


    } else {
        console.log('refreshing')
        console.log(json)
        st.loadJSON(json);

        st.refresh();
    }
//end


}


//TODO: if tree exits, append only
//TODO: tie next node to choice
