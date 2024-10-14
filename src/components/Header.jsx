import './Header.css'

import { SearchBar } from './SearchBar'


export function Header(){
    return (
        <>
            <header className="header">
                <form className="titleForm">
                    <input className='titleInput' placeholder="Without a Title" type="text"  />
                </form>
                <SearchBar />    
            </header>  
      </>

    )
}