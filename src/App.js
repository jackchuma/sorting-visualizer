import React, { useState } from 'react';
import './App.css';
import { IoIosArrowDown } from 'react-icons/io';

function App() {

  const [selectedSort, setSelectedSort] = useState({name: 'Bubble Sort', id: 'bubble-sort'});
  const [sliderVal, setSliderVal] = useState(50);
  const [array, setArray] = useState([]);

  const generateArray = () => {
    let arr = [];
    for (let i=0; i<sliderVal; i++) {
      arr.push(Math.floor(Math.random() * 450 + 50));
    }
    setArray(arr);
  }

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

  const moveSlider = e => {
    setSliderVal(e.target.value);
    generateArray();
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

  const bubbleSort = async input => {
    let swapping = true;
    while (swapping) {
      swapping = false;
      for (let i=0; i<input.length-1; i++) {
        let first = document.getElementById(i);
        let next = document.getElementById(i+1);

        if (input[i] > input[i+1]) {
          first.style.backgroundColor = 'green';
          next.style.backgroundColor = 'red';
          swap(input, i, i+1);
          await sleep(5);
          first.style.order = `${i}`;
          first.id = i+1;
          next.style.order = `${i-1}`;
          next.id = i;
          await sleep(5);
          swapping = true;
        } else {
          first.style.backgroundColor = 'red';
          next.style.backgroundColor = 'green';
          await sleep(5);
        }
        
        first.style.backgroundColor = 'hsla(34, 80%, 50%, 1)';
        next.style.backgroundColor = 'hsla(34, 80%, 50%, 1)';
      }
      setArray(input);
    }
    return input;
  }

  const mergeSort = input => {
    const length = input.length;
    if (length === 1) {
      return input;
    }
    const mid = Math.floor(length / 2);
    const leftArray = input.slice(0, mid);
    const rightArray = input.slice(mid, length);
    
    return merge(mergeSort(leftArray), mergeSort(rightArray));
  }

  const merge = (leftArray, rightArray) => {
    const sortedArray = [];
    while (leftArray.length > 0 && rightArray.length > 0) {
      
      if (leftArray[0] < rightArray[0]) {
        sortedArray.push(leftArray.shift());
      } else {
        sortedArray.push(rightArray.shift());
      }
    }
    setArray(sortedArray.concat(leftArray).concat(rightArray));
    return sortedArray.concat(leftArray).concat(rightArray);
  }

  const swap = (arr, indexOne, indexTwo) => {
    const temp = arr[indexTwo];
    arr[indexTwo] = arr[indexOne];
    arr[indexOne] = temp;
  }

  const handleSort = () => {
    if (selectedSort.name === 'Bubble Sort') {
      bubbleSort(array);
    } else if (selectedSort.name === 'Merge Sort') {
      mergeSort(array);
    }
  }

  const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const sortList = [{name: 'Bubble Sort', id: 'bubble-sort'}, {name: 'Quick Sort', id: 'quick-sort'}, {name: 'Merge Sort', id: 'merge-sort'}];

  return (
    <div className="App">
      <div className="navbar">
        <button className='array-button' onClick={generateArray}>Generate New Array</button>
        <div className='array-size'>
          <button className='array-size-button' onClick={handleArraySizeButtonClick}>Change Array Size <IoIosArrowDown /></button>
          <div className='array-slider' id='array-slider'>
            <input type='range' className='slider' min='10' onChange={moveSlider} />
          </div>
        </div>
        <button className="sort-button" onClick={handleSort}>Sort!</button>
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
      <div className='sorting-view-container'>
        <div className='sorting-view'>
          {array.map((val, index) => {
            return <div className='rectangle' key={index} id={index} style={{height: val + 'px', width: (1000 / array.length - 5) + 'px', order: index+1}}></div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
