var nodeModule = (function() {
    _createNode = (nodeDetails) => {
        console.log('create node called ', nodeDetails);
    }

    return {
        createNode : _createNode
    }
  }());