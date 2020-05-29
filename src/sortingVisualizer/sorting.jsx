import React, { Component } from "react";
import "./visual.css";
import { getMergeSortAnimations } from "../sortingVisualizer/algo";
import { Navbar, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { getBubbleSortAnimations } from "../sortingVisualizer/algo";
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 12;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
var PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
var SECONDARY_COLOR = "red";
class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push(Math.floor(Math.random() * 670 + 5));
    }
    this.setState({ arr });
  }
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.arr);
    for (let i = 0; i < animations.length; i++) {
      console.log(animations[i]);
    }

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2; //every two iterations
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  changeColor() {
    const arrayBars = document.getElementsByClassName("array-bar");
    const height = 10;
    if (PRIMARY_COLOR === "turquoise") {
      PRIMARY_COLOR = "yellow";
      SECONDARY_COLOR = "white";
    } else if (PRIMARY_COLOR === "yellow") {
      PRIMARY_COLOR = "red";

      SECONDARY_COLOR = "green";
    } else {
      PRIMARY_COLOR = "turquoise";
      SECONDARY_COLOR = "red";
    }
    for (let i = 0; i < arrayBars.length; i++) {
      const barOneStyle = arrayBars[i].style;

      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
    }
  }

  bubbleSort() {
    const [animations, sortArray] = getBubbleSortAnimations(this.state.arr);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  swap(xp, yp) {
    let temp = xp;
    xp = yp;
    yp = temp;
  }

  swapHeight(barOneStyle, barTwoStyle) {
    const temp = barOneStyle.height;
    barOneStyle.height = barTwoStyle.height;
    barTwoStyle.height = temp;
  }

  render() {
    const { arr } = this.state;
    return (
      <div className="array-container">
        <Navbar className="bg-light justify-content-between">
          <Form inline>
            <InputGroup>
              <Form inline>
                <h1>sortingVisualizer</h1>
              </Form>
            </InputGroup>
          </Form>
          <Form inline>
            <Button className="btn btn-info" onClick={() => this.resetArray()}>
              generate new array
            </Button>
          </Form>
          <Form inline>
            <Button className="btn btn-info" onClick={() => this.changeColor()}>
              changeArrayColor
            </Button>
          </Form>
          <Form inline>
            <Button className="btn btn-info" onClick={() => this.bubbleSort()}>
              bubbleSort
            </Button>
          </Form>

          <Form inline>
            <Button className="btn btn-info" onClick={() => this.mergeSort()}>
              mergeSort
            </Button>
          </Form>
        </Navbar>

        {arr.map((num, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${num}px` }}
          ></div>
        ))}
      </div>
    );
  }
}

export default Visualizer;
