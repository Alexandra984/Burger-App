import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

// what user is about to buy and the price of the burger
// a button to cancel and another to continue

class Checkout extends Component {
    
    checkoutCancellHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancellHandler}
                    checkoutContinued={this.checkoutContinueHandler}/>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);