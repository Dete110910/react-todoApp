export function filterNodeData(nodes) {
    return nodes.map(node => ({
        id: node.id,
        title: node.title,
        radius: node.radius
    }));
}

export function filterLinksData(links) {
    return links.map(link => ({
        source: link.source.id,
        target: link.target.id
    }));
}