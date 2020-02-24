import React from 'react';
import classes from './Button.css';

const button = (props) => (
<button 
    className={[classes.Button, classes[props.btnType]].join(' ')} // e un array de stringuri si de fapt trebuie doar un singur string !!!

    onClick={props.clicked}>{props.children}</button>
);

export default button;