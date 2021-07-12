import React from 'react';
import { Button } from './Button';
import './Pricing.css';
import { FaStickyNote } from 'react-icons/fa';
import { MdCardGiftcard } from 'react-icons/md';
import { AiFillIdcard } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#fff', size: 64 }}>
      <div className='pricing__section'>
        <div className='pricing__wrapper'>
          <h1 className='pricing__heading'>Our Services</h1>
          <div className='pricing__container'>
            <Link to='/sign-up' className='pricing__container-card'>
              <div className='pricing__container-cardInfo'>
                <div className='icon'>
                  <FaStickyNote />
                </div>
                <h3>Reservation</h3>
                <h4>Try it now! </h4>
                <ul className='pricing__container-features'>
                    <li> Reservation </li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='primary'>
                  Reserve Now
                </Button>
              </div>
            </Link>
            <Link to='/sign-up' className='pricing__container-card'>
              <div className='pricing__container-cardInfo'>
                <div className='icon'>
                  <MdCardGiftcard />
                </div>
                <h3>Special Events</h3>
                <h4>Try it Now! </h4>
                <ul className='pricing__container-features'>
                  <li>Special Events </li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='blue'>
                  Choose Event
                </Button>
              </div>
            </Link>
            <Link to='/sign-up' className='pricing__container-card'>
              <div className='pricing__container-cardInfo'>
                <div className='icon'>
                  <AiFillIdcard />
                </div>
                <h3>Payment</h3>
                <h4> Try it Now! </h4>
                <ul className='pricing__container-features'>
                  <li>Payment Options </li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='primary'>
                  Pay 
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default Pricing;