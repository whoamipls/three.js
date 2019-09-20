function copyGraphDataSets(Graph) {
    let nodeFields = ['id', 'user', 'description', 'type'];
    // 点
    let nodes = [];
    let gNodes = Graph.graphData().nodes;
    gNodes.forEach(gNode => {
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
    let gLinks = Graph.graphData().links;
    gLinks.forEach(gLink => {
        let link = new Object();
        link.source = gLink.source.id;
        link.target = gLink.target.id;
        links.push(link);
    });
    // 点id设置为索引
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let id = node.id;
        node.id = i;
        node.type = 0;
        links.filter(l => l.source == id || l.target == id).forEach(l => {
            if (l.source == id) l.source = i;
            if (l.target == id) l.target = i;
        });
    }
    // 返回数据
    return {
        nodes: nodes,
        links: links
    };
}