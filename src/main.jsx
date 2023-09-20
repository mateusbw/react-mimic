import React from '../react'
import './index.css'

const helloWorld = (
  <div>
    <h1>Pokedex</h1>
    <ul>
      <li>Bulbasaur</li>
      <li>Ivysaur</li>
      <li>Venusaur</li>
    </ul>
  </div>
)

React.createRoot(document.getElementById('root')).render(helloWorld)
