function copyGraphDataSets(Graph) {
    let nodeFields = ['id', 'user', 'description', 'type'];
    // 点
    let nodes = [];
    Graph.graphData().nodes.forEach(gNode => {
        let node = new Object();
        nodeFields.forEach(field => {
            node[field] = gNode[field];
        })
        let pos = gNode.__threeObj.position;
        node.x = pos.x;
        node.y = pos.y;
        node.z = pos.z;
        nodes.push(node);
    });
    // 边
    let links = [];
    Graph.graphData().links.forEach(gLink => {
        let link = new Object();
        link.source = gLink.source.id;
        link.target = gLink.target.id;
        links.push(link);
    });
    // 返回数据
    return {
        nodes: nodes,
        links: links
    };
}