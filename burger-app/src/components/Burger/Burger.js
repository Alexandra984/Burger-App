import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, idx) => {
            return <BurgerIngredient key = {key + idx} type={key} />
        })
    })
    .reduce((arr, curr) => {
        return arr.concat(curr)
    }, []);

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;