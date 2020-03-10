import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BulidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    async componentDidMount() {
        console.log(this.props);
        // try {
        //     const response = await axios.get('https://react-my-burger-45399.firebaseio.com/ingredients.json');
        //     this.setState({ingredients: response.data});
        // } catch (err) {
        //     console.log(err);
        // }
        
    }
    
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })    
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaiseHandler = () => {
        this.setState({purchasing: true});
        // console.log(this.state.purchasing);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('./checkout')
            
    }

    render () {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        
        let burger = <Spinner />
        
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaiseHandler}
                        price ={this.props.price}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            />
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                {/* {console.log(this.state.purchasing)} */}
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }    
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.price
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder); 