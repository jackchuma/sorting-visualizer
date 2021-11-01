import React, { useState } from 'react';
import './App.css';
import { IoIosArrowDown } from 'react-icons/io';
import { BiMenu } from 'react-icons/bi';

/*
To-do:
  - Adjust height of rectangles for mobile version
  - Update Sort function to close any menus if they are open
*/

function App() {

  //State variables
  const [selectedSort, setSelectedSort] = useState({name: 'Bubble Sort', id: 'bubble-sort'});
  const [sliderVal, setSliderVal] = useState(50);
  const [array, setArray] = useState([]);

  //Function to generate a new array of values between 50 and 500.  These numbers will be used as the height attribute for the rectangles
  const generateArray = async () => {
    let arr = [];
    await clearArray();
    for (let i=0; i<sliderVal; i++) {
      arr.push(Math.floor(Math.random() * 450 + 50));
    }
    await setArray(arr);
  }

  //Function that opens the hidden menu on screens that are thinner than 850px
  const handleHamburger = () => {
    let menu = document.getElementById('hidden-nav');
    if (parseInt(menu.style.left) === 0) {
      menu.style.left = '-200px';
    } else {
      menu.style.left = '0';
    }
  }

  //Function to clear the array state
  const clearArray = async () => {
    await setArray([]);
  }

  //Function that toggles opening and closing the slider in the top nav menu
  const handleArraySizeButtonClick = () => {
    const sliderBox = document.getElementById('array-slider');

    if (sliderBox.style.display === 'block') {
      sliderBox.style.display = 'none';
    } else {
      sliderBox.style.display = 'block';
    }
  }

  //Function that toggles opening and closing the list of sort algorithms in the top nav menu
  const handleSortButtonClick = e => {
    const sortBox = document.getElementById('sort-list');

    if (sortBox.style.display === 'flex') {
      sortBox.style.display = 'none';
    } else {
      sortBox.style.display = 'flex';
    }
  }

  //Function that updates the array state as the slider is moved
  const moveSlider = e => {
    setSliderVal(e.target.value);
    generateArray();
  }

  //Function to handle selecting a sort algorithm from the dropdown menu
  const handleSortListButtonClick = e => {
    const oldLink = document.getElementById(selectedSort.id);
    oldLink.className = '';
    setSelectedSort({name: e.target.value, id: e.target.id});

    const newLink = document.getElementById(e.target.id);
    newLink.className = 'selected';

    const sortBox = document.getElementById('sort-list');
    sortBox.style.display = 'none';
  }

  //Bubble Sort Algorithm Visualizer
  const bubbleSort = async input => {
    let swapping = true;

    //while loop runs as long as swaps are made
    while (swapping) {
      swapping = false;
      for (let i=0; i<input.length-1; i++) {
        let first = document.getElementById(i);
        let next = document.getElementById(i+1);

        //always checking if a value is higher than the following value
        if (input[i] > input[i+1]) {

          //Sets color of current rectangle to green and following rectangle to red then swaps the values in the input array
          colorRectangle(i, 1, 'green');
          colorRectangle(i+1, 1, 'red');
          swap(input, i, i+1);

          //5ms pause to allow the user to see what is happening
          await sleep(5);

          //Code to swap the position of the two rectangles
          first.style.order = `${i+2}`;
          first.id = i+1;
          next.style.order = `${i+1}`;
          next.id = i;

          //5ms pause
          await sleep(5);

          swapping = true;
        } else {

          //if the current value is smaller than the following value, then the current rectangle will be colored red, the next will be colored green, then the code will move on
          colorRectangle(i, 1, 'red');
          colorRectangle(i+1, 1, 'green');

          //5ms pause
          await sleep(5);
        }
        
        //return the background color of both rectangles to their original color before moving on
        colorRectangle(i, 1, 'hsla(34, 80%, 50%, 1)');
        colorRectangle(i+1, 1, 'hsla(34, 80%, 50%, 1)');
      }

      //update array state
      setArray(input);
    }

    //Color all rectangles green at the end of the function to show they have completed sorting, pause for 0.5s then return to original color
    colorRectangle(0, input.length, 'green');
    await sleep(500);
    colorRectangle(0, input.length, 'hsla(34, 80%, 50%, 1');
    return input;
  }

  //Function to swap array values in bubble sort
  const swap = (arr, indexOne, indexTwo) => {
    const temp = arr[indexTwo];
    arr[indexTwo] = arr[indexOne];
    arr[indexOne] = temp;
  }

  //Merge Sort Visualizer function
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

        //Function to merge two sorted arrays
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

  //Function to merge two sorted arrays for Merge Sort
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

        //10ms pause
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

  //Quick Sort Algorithm Visualizer
  const quickSort = async input => {
    let pivotIndex = 0;
    while (pivotIndex < input.length) {

      //Calls function to split based on pivot value - moves all values smaller than pivot value to before the pivot rectangle.  Returns false if nothing gets moved
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
      input = newOrder;
    }
    colorRectangle(0, input.length, 'green');
    await sleep(500);
    colorRectangle(0, input.length, 'hsla(34, 80%, 50%, 1');
  }

  //Function to split array based on pivot value
  const pivotSplit = async (input, pivotIndex) => {
    let swapped = false;

    //Color pivot rectangle blue
    colorRectangle(pivotIndex, 1, 'hsla(202, 60%, 30%, 1)');
    let lessOrder = pivotIndex + 1;
    for (let i=pivotIndex+1; i<input.length; i++) {

      //Rectangle being compared to pivot rectangle gets colored red
      colorRectangle(i, 1, 'red');
      await sleep(1);

      if (input[i] < input[pivotIndex]) {

        //Move current rectangle to before pivot rectangle
        let rec = document.getElementById(i);
        rec.style.order = `${lessOrder}`;
        rec.id = 'temp';

        //Shift each rectangle between pivot and current forward one spot to keep the rest of the array in order
        for (let j=i-1; j>lessOrder-2; j--) {
          let bump = document.getElementById(j);
          bump.style.order++;
          bump.id++;
        }
        rec.id = lessOrder - 1;
        lessOrder++;

        //Color the moved rectangle green, pause for 1ms then return to original color
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

    //Returns true if a swap was made, false if not
    if (swapped === true) {
      return true;
    } else {
      return false;
    }
  }

  //Function that changes the background color of rectangles
  const colorRectangle = (id, length, color) => {
    for (let i=0; i<length; i++) {
      let rec = document.getElementById(id + i);
      rec.style.backgroundColor = color;
    }
  }

  //Function to handle sorting the rectangles based on which sorting algorithm is selected
  const handleSort = () => {
    if (selectedSort.name === 'Bubble Sort') {
      bubbleSort(array);
    } else if (selectedSort.name === 'Merge Sort') {
      mergeSort(array);
    } else if (selectedSort.name === 'Quick Sort') {
      quickSort(array);
    }
  }

  //Function used to create delays in the algorithm visualizer functions
  const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  //Function to toggle viewing the slider bar in the hidden side menu on smaller screen sizes
  const handleHiddenSliderClick = () => {
    let slider = document.getElementById('hidden-slider');
    if (slider.style.display === 'none') {
      slider.style.display = 'flex';
    } else {
      slider.style.display = 'none';
    }
  }

  //Function to toggle viewing the sort algorithm options in the hidden side menu on smaller screen sizes
  const handleHiddenSortClick = () => {
    let hiddenList = document.getElementById('hidden-sort-list');
    if (hiddenList.style.display === 'none') {
      hiddenList.style.display = 'flex';
    } else {
      hiddenList.style.display = 'none';
    }
  }

  //Function that updates state based on which sort algorithm is selected in hidden menu
  const handleHiddenSortOptionClick = e => {
    setSelectedSort({name: e.target.value, id: e.target.id});
    let hiddenList = document.getElementById('hidden-sort-list');
    hiddenList.style.display = 'none';
  }

  //Array of sort algorithm options
  const sortList = [{name: 'Bubble Sort', id: 'bubble-sort'}, {name: 'Quick Sort', id: 'quick-sort'}, {name: 'Merge Sort', id: 'merge-sort'}];

  return (
    <div className="App">
      <div className='hidden-nav' id='hidden-nav'>
        <button className='hidden-nav-button' onClick={generateArray}>Generate New Array</button>
        <button className='hidden-nav-button hidden-arrow' onClick={handleHiddenSliderClick}>Change Array Size <IoIosArrowDown /></button>
        <input type='range' id='hidden-slider' className='hidden-nav-button hidden-nav-slider' min='10' onChange={moveSlider} />
        <button className='hidden-nav-button hidden-arrow' onClick={handleHiddenSortClick}>{selectedSort.name} <IoIosArrowDown /></button>
        <div className='hidden-sort-list' id='hidden-sort-list'>
          {sortList.map((sortName) => {
            return <button className='hidden-nav-button' key={sortName.id} value={sortName.name} onClick={handleHiddenSortOptionClick}>{sortName.name}</button>
          })}
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <button className="hamburger" onClick={handleHamburger}><BiMenu /></button>
        </div>
        <div className='navbar-right'>
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
