import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {
    StyledStripe,
} from './stripe.styles';
import { formatUSD } from "../../../utils";

function Stripe(props) {
    const [amount, setAmount] = useState(500);

    function handleToken(token) {
        return axios({
            method: "post",
            url: "http://localhost:3000/charge",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                token,
                amount,
            },
        }).then(charge => {
            if(charge.status === 200) {
                console.log(charge);
                // TODO: Do something cool here
            }
        });
    }
    return (
        <StyledStripe>
            <StripeCheckout
                amount={amount}
                name="DevGulp"
                description={`Donating ${formatUSD(amount)} to DevGulp team!`}
                stripeKey="pk_test_iDbtronjncUeWjca3bAkRjAz"
                currency="USD"
                email={props.user.email}
                token={res => handleToken(res)}>
                {props.children}
            </StripeCheckout>
        </StyledStripe>
    );
}

const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps, null)(Stripe);
