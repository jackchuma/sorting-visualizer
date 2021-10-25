import React, { useState } from 'react';
import './App.css';
import { IoIosArrowDown } from 'react-icons/io';

function App() {

  const [selectedSort, setSelectedSort] = useState({name: 'Bubble Sort', id: 'bubble-sort'});

  const handleArraySizeButtonClick = () => {
    const sliderBox = document.getElementById('array-slider');

    if (sliderBox.style.display === 'block') {
      sliderBox.style.display = 'none';
    } else {
      sliderBox.style.display = 'block';
    }
  }

  const handleSortButtonClick = e => {
    const sortBox = document.getElementById('sort-list');

    if (sortBox.style.display === 'flex') {
      sortBox.style.display = 'none';
    } else {
      sortBox.style.display = 'flex';
    }
  }

  const handleSortListButtonClick = e => {
    const oldLink = document.getElementById(selectedSort.id);
    oldLink.style.backgroundColor = 'hsla(202, 21%, 80%, 1)';
    oldLink.style.color = 'black';
    setSelectedSort({name: e.target.value, id: e.target.id});

    const newLink = document.getElementById(e.target.id);
    newLink.style.color = 'hsla(34, 80%, 50%, 1)';
    newLink.style.backgroundColor = 'hsla(202, 21%, 50%, 1)';

    const sortBox = document.getElementById('sort-list');
    sortBox.style.display = 'none';
  }

  const sortList = [{name: 'Bubble Sort', id: 'bubble-sort'}, {name: 'Quick Sort', id: 'quick-sort'}, {name: 'Merge Sort', id: 'merge-sort'}];

  return (
    <div className="App">
      <div className="navbar">
        <button className='array-button'>Generate New Array</button>
        <div className='array-size'>
          <button className='array-size-button' onClick={handleArraySizeButtonClick}>Change Array Size <IoIosArrowDown /></button>
          <div className='array-slider' id='array-slider'>
            <input type='range' min='0.1' max='1' value='0.5' className='slider' />
          </div>
        </div>
        <button className="sort-button">Sort!</button>
        <div className="sort-menu" id="sort-menu">
          <button className='sort-button-visible' onClick={handleSortButtonClick}>{selectedSort.name} <IoIosArrowDown /></button>
          <div className='sort-list' id='sort-list'>
            {sortList.map((sortName) => {
              return <button key={sortName.id} id={sortName.id} value={sortName.name} onClick={handleSortListButtonClick}>{sortName.name}</button>
            })}
          </div>
        </div>
      </div>
      <h1>Jack's Sorting Algorithm Visualizer</h1>
    </div>
  );
}

export default App;
