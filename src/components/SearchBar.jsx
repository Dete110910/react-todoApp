import { AppContext } from '../App'
import { addNode } from '../utils/dataService'
import { filterLinksData, filterNodeData } from '../utils/filteringData'
import './SearchBar.css'

import { useContext, useState } from 'react' 

export function SearchBar(){
    const { data, setData } = useContext(AppContext)
    const [searchTerm, setSearchTerm] = useState("")
/*
    useEffect(() => {
        fetch('./resources/data.json')
        .then((response) => response.json())
        .then((data) => {
            setData(data)
        })
    }, [isSubmited])
*/
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchTerm("")

        if(dataExist(data, searchTerm)){
            console.log("Existe")
        }
        else {
            console.log("insertando")
            insertInFile(searchTerm, data, setData)
        }
    }

    return (
        <form className='search' onSubmit={handleSubmit} >
            <input className='searchBar' type="search" 
            value = {searchTerm}
            onChange = {handleChange}
            placeholder = "Search or create your task"
            />
        </form>

    )
}

function dataExist(data, searchTerm){
    return (data.nodes.find(node => node.title === searchTerm))
}

async function insertInFile (itemToInsert, data, setData){
    const newNode = {"id": (parseInt(data.nodes.at(-1).id) + 1), "title" : itemToInsert, "radius" : 5}
    const newData = {...data, nodes: [...data.nodes, newNode]}

    newData.nodes = filterNodeData(newData.nodes)
    newData.links = filterLinksData(newData.links)

    await addNode(newData)
    setData(prevData => ({
        ...prevData, nodes: [...prevData.nodes, newNode]
    }))



}