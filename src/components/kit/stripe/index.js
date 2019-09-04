import { useContext } from 'react';
import { connect } from 'react-redux';
import { useTrail } from 'react-spring';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {
  StyledStripe,
  StyledStripeAmounts,
  StyledStripeAmount,
  StyledStripeCaret,
} from './stripe.styles';
import { toggleDonationMenu, closeDonationMenu } from '../../../redux/actions';
import { formatUSD } from '../../../utils';
import { AppContext } from '../notifications/provider';

const config = { mass: 5, tension: 2000, friction: 100 };

function Checkout(props) {
  const { addNotification } = useContext(AppContext);

  function handleToken(token) {
    return axios({
      method: 'post',
      url: 'http://localhost:3000/charge',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        token,
        amount: props.amount,
      },
    }).then(charge => {
      if (charge.status === 200) {
        console.log(charge);
        addNotification('Thank you for donating!', 'success');
        // TODO: Do something cool here.
      }
    });
  }

  return (
    <StripeCheckout
      amount={props.amount}
      name="DevGulp"
      ComponentClass="div"
      image="/static/devgulp-cards.svg"
      description={`Donating ${formatUSD(props.amount)} to the DevGulp team!`}
      stripeKey="pk_test_iDbtronjncUeWjca3bAkRjAz"
      currency="USD"
      closed={props.closeDonationMenu}
      email={props.user.email}
      token={res => handleToken(res)}>
      {props.children}
    </StripeCheckout>
  );
}

function Stripe(props) {
  const trail = useTrail(1, {
    config,
    opacity: props.donationMenuOpen ? 1 : 0,
    x: props.donationMenuOpen ? 5 : 20,
    height: props.donationMenuOpen ? 175 : 0,
    pointerEvents: props.donationMenuOpen ? 'all' : 'none',
    from: {
      opacity: 0,
      x: 20,
      height: 0,
    },
  });
  return (
    <StyledStripe onClick={props.toggleDonationMenu}>
      {trail.map(({ x, height, opacity, ...rest }, index) => {
        return (
          <StyledStripeAmounts
            key={index}
            style={{
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
              opacity: opacity,
              height,
              ...rest,
            }}>
            <Checkout
              toggleDonationMenu={props.toggleDonationMenu}
              closeDonationMenu={props.closeDonationMenu}
              user={props.user}
              amount={500}>
              <StyledStripeAmount>Donate $5</StyledStripeAmount>
            </Checkout>
            <Checkout
              toggleDonationMenu={props.toggleDonationMenu}
              closeDonationMenu={props.closeDonationMenu}
              user={props.user}
              amount={1000}>
              <StyledStripeAmount>Donate $10</StyledStripeAmount>
            </Checkout>
            <Checkout
              toggleDonationMenu={props.toggleDonationMenu}
              closeDonationMenu={props.closeDonationMenu}
              user={props.user}
              amount={2000}>
              <StyledStripeAmount>Donate $20</StyledStripeAmount>
            </Checkout>
            <StyledStripeCaret />
          </StyledStripeAmounts>
        );
      })}
      {props.children}
    </StyledStripe>
  );
}

const mapStateToProps = ({ user, root }) => ({
  user,
  donationMenuOpen: root.donationMenuOpen,
});

const mapDispatchToProps = {
  toggleDonationMenu,
  closeDonationMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stripe);
