import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BulidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            bacon: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        // console.log(updatedIngredients);
        this.updatePurchaseState(updatedIngredients);    
        // console.log(this.state.purchasable);
        
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        // console.log(this.state.purchasable);

    }
    
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })    
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaiseHandler = () => {
        this.setState({purchasing: true});
        console.log(this.state.purchasing);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                {/* {console.log(this.state.purchasing)} */}
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered = {this.purchaiseHandler}
                    price ={this.state.totalPrice}
                />
            </Aux>
        )
    }    
}

export default BurgerBuilder; 