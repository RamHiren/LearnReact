import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TetxForm = (props) => {
  const [text, setText] = useState('');

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };
  const handleLowerClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleClearClick = () => {
    let newText = '';
    setText(newText);
  };
  const handleCopyClick = () => {
    let text = document.getElementById('myBox');
    text.select();
    navigator.clipboard.writeText(text.value);
  };
  const handleSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(' '));
  };
  const handleOnChange = (event) => {
    console.log('Onchange');
    setText(event.target.value);
  };

  return (
    <div>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h3 className="text-center mb-4">{props.heading}</h3>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
              resize: 'none',
              color: props.mode === 'dark' ? 'white' : 'black',
            }}
            id="myBox"
            rows="8"
            placeholder="Enter Text Here"
          ></textarea>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          <button className="btn btn-primary m-2" onClick={handleUpClick}>
            Convert To Upper Case
          </button>
          <button className="btn btn-warning m-2" onClick={handleLowerClick}>
            Convert To Lower Case
          </button>
          <button className="btn btn-success m-2" onClick={handleCopyClick}>
            Copy Text
          </button>
          <button className="btn btn-danger m-2" onClick={handleClearClick}>
            Clear Text
          </button>
          <button className="btn btn-primary m-2" onClick={handleSpaceClick}>
            Remove Spaces
          </button>
        </div>
      </div>
      <div className="container my-4" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h3 className="text-center">Your Text Summary</h3>
        <p className="text-center">
          {text.split(' ').filter((word) => word !== '').length} Words and {text.length} Characters
        </p>
      </div>
    </div>
  );
};

export default TetxForm;
