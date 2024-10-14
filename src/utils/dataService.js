export const addNode = async (node) => {
    const response = await fetch('update/nodes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(node)
    })
    return response.json()
}