import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components//UI/Spinner/Spinner';
import axios from '../../../axios-orders';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }, 
        loading: false
     }

     orderHandler = async (event) => {
         event.preventDefault();
         this.setState( {loading: true} );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Alexandra',
                address: {
                    street: 'sp indep 204',
                    zipCode: '1234',
                    country: 'Romania'
                },
                email: 'alex@test.com'
            },
            deliveryMode: 'fastest'
        }
        try {
            const response = await axios.post('/orders.json', order);
            this.setState({loading: false});
            this.props.history.push('/');
            console.log(response);
        } catch(err) {
            console.log(err);
            this.setState({loading: false});
        }
        console.log(this.props.ingredients);
     }

     render () {
         let form = ( 
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Your postal code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order now!</Button>
        </form>);
         if (this.state.loading) {
             form = <Spinner />
         }
         return (
             <div className={classes.ContactData}>
                 <h4>Enter your Contact Data</h4>
                {form}    
             </div>
         )
     }
}

export default ContactData;