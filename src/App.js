import React, { useState } from 'react';
import './App.css';
import { IoIosArrowDown } from 'react-icons/io';

function App() {

  const [selectedSort, setSelectedSort] = useState({name: 'Bubble Sort', id: 'bubble-sort'});
  const [sliderVal, setSliderVal] = useState(50);
  const [array, setArray] = useState([]);

  const generateArray = async () => {
    let arr = [];
    await clearArray();
    for (let i=0; i<sliderVal; i++) {
      arr.push(Math.floor(Math.random() * 450 + 50));
    }
    await setArray(arr);
  }

  const clearArray = async () => {
    await setArray([]);
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
    oldLink.className = '';
    setSelectedSort({name: e.target.value, id: e.target.id});

    const newLink = document.getElementById(e.target.id);
    newLink.className = 'selected';

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
          first.style.order = `${i+2}`;
          first.id = i+1;
          next.style.order = `${i+1}`;
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
    colorRectangle(0, input.length, 'green');
    await sleep(500);
    colorRectangle(0, input.length, 'hsla(34, 80%, 50%, 1');
    return input;
  }

  const mergeSort = async input => {
    let swapping = true;
    let increment = 2;
    let arrayIncrement = 1;
    while (swapping) {
      for (let i=0; i<input.length-1; i+=increment) {

        //Generate Left and Right Arrays to Compare
        let leftArray = input.slice(i,i+arrayIncrement);
        let leftLength = leftArray.length;
        let rightArray = input.slice(i+arrayIncrement, i+increment);
        let rightLength = rightArray.length;

        //Exit condition for while loop
        if (leftArray.length + rightArray.length === input.length) {
          swapping = false;
        }

        //Set color to red before sorted
        colorRectangle(i, leftArray.length, 'red');
        colorRectangle(i+arrayIncrement, rightArray.length, 'red');
        await sleep(10);

        //Loop or function to merge two sorted arrays
        await mergeArrays(input, leftArray, rightArray, i, i+arrayIncrement);

        //Set color to green after sorted
        colorRectangle(i, leftLength, 'green');
        colorRectangle(i+arrayIncrement, rightLength, 'green');
        await sleep(10);

        //Return to original orange color before moving on to next set of rectangles
        colorRectangle(i, leftLength, 'hsla(34, 80%, 50%, 1)');
        colorRectangle(i+arrayIncrement, rightLength, 'hsla(34, 80%, 50%, 1)');
      }

      //Update "input" array to new order
      let containerDiv = document.getElementById('sorting-view');
      let rectangles = containerDiv.getElementsByTagName('div');
      let newOrder = [];
      for (let r=1; r<rectangles.length+1; r++) {
        for (let k=0; k<rectangles.length; k++) {
          let rec = rectangles[k];
          if (parseInt(rec.style.order) === r) {
            newOrder.push(rectangles[k].clientHeight);
          }
        }
      }
      input = newOrder;
      increment*=2;
      arrayIncrement*=2;
    }
    colorRectangle(0, input.length, 'green');
    await sleep(500);
    colorRectangle(0, input.length, 'hsla(34, 80%, 50%, 1');
  }

  const mergeArrays = async (input, leftArray, rightArray, leftIndex, rightIndex) => {
    let order = leftIndex + 1;
    while (leftArray.length > 0 && rightArray.length > 0) {
      if (leftArray[0] > rightArray[0]) {
        //Bring rightArray[0] rectangle to current order
        let right = document.getElementById(rightIndex);
        right.style.order = `${order}`;
        right.id = 'temp';
        let temp = input[rightIndex];

        //Shift each leftArray rectangle to right
        for (let i=rightIndex-1; i>leftIndex-1; i--) {
          input[i+1] = input[i];
          let bump = document.getElementById(i);
          bump.style.order++;
          bump.id++;
        }

        input[leftIndex] = temp;
        right.id = leftIndex;
        rightArray.shift();
        await sleep(10);
        rightIndex++;
        leftIndex++;
      } else {
        //Leave leftArray[0] in current order
        leftArray.shift();
        leftIndex++;
      }
      //Iterate to next order value
      order++;
    }
  }

  const quickSort = async input => {
    let pivotIndex = 0;
    while (pivotIndex < input.length) {
      let swapped = await pivotSplit(input, pivotIndex);
      if (swapped === false) {
        pivotIndex++;
      }

      //Update "input" array to new order
      let containerDiv = document.getElementById('sorting-view');
      let rectangles = containerDiv.getElementsByTagName('div');
      let newOrder = [];
      for (let r=1; r<rectangles.length+1; r++) {
        for (let k=0; k<rectangles.length; k++) {
          let rec = rectangles[k];
          if (parseInt(rec.style.order) === r) {
            newOrder.push(rectangles[k].clientHeight);
          }
        }
      }
      console.log(newOrder);
      input = newOrder;
    }
    colorRectangle(0, input.length, 'green');
    await sleep(500);
    colorRectangle(0, input.length, 'hsla(34, 80%, 50%, 1');
  }

  const pivotSplit = async (input, pivotIndex) => {
    let swapped = false;
    colorRectangle(pivotIndex, 1, 'hsla(202, 60%, 30%, 1)');
    let lessOrder = pivotIndex + 1;
    for (let i=pivotIndex+1; i<input.length; i++) {
      colorRectangle(i, 1, 'red');
      await sleep(1);

      if (input[i] < input[pivotIndex]) {
        let rec = document.getElementById(i);
        rec.style.order = `${lessOrder}`;
        rec.id = 'temp';

        for (let j=i-1; j>lessOrder-2; j--) {
          let bump = document.getElementById(j);
          bump.style.order++;
          bump.id++;
        }
        rec.id = lessOrder - 1;
        lessOrder++;
        colorRectangle(lessOrder-2, 1, 'green');
        await sleep(1);
        colorRectangle(lessOrder-2, 1, 'hsla(34, 80%, 50%, 1');
        swapped = true;
      } else {
        colorRectangle(i, 1, 'green');
        await sleep(1);
        colorRectangle(i, 1, 'hsla(34, 80%, 50%, 1');
      }
    }
    if (swapped === true) {
      return true;
    } else {
      return false;
    }
  }

  const colorRectangle = (id, length, color) => {
    for (let i=0; i<length; i++) {
      let rec = document.getElementById(id + i);
      rec.style.backgroundColor = color;
    }
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
    } else if (selectedSort.name === 'Quick Sort') {
      quickSort(array);
    }
  }

  const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const sortList = [{name: 'Bubble Sort', id: 'bubble-sort'}, {name: 'Quick Sort', id: 'quick-sort'}, {name: 'Merge Sort', id: 'merge-sort'}];

  return (
    <div className="App">
      <div className="navbar">
        <button className='array-button button' onClick={generateArray}>Generate New Array</button>
        <div className='array-size'>
          <button className='array-size-button button' onClick={handleArraySizeButtonClick}>Change Array Size <IoIosArrowDown /></button>
          <div className='array-slider' id='array-slider'>
            <input type='range' className='slider' min='10' onChange={moveSlider} />
          </div>
        </div>
        <button className="sort-button" onClick={handleSort}>Sort!</button>
        <div className="sort-menu" id="sort-menu">
          <button className='sort-button-visible button' onClick={handleSortButtonClick}>{selectedSort.name} <IoIosArrowDown /></button>
          <div className='sort-list' id='sort-list'>
            {sortList.map((sortName) => {
              return <button key={sortName.id} id={sortName.id} value={sortName.name} onClick={handleSortListButtonClick}>{sortName.name}</button>
            })}
          </div>
        </div>
      </div>
      <h1>Jack's Sorting Algorithm Visualizer</h1>
      <div className='sorting-view-container'>
        <div className='sorting-view' id='sorting-view'>
          {array.map((val, index) => {
            return <div className='rectangle' value={val} key={index} id={index} style={{height: val + 'px', width: (1000 / array.length - 5) + 'px', order: index+1}}></div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
