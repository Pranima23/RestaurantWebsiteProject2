import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../../Pricing';

function Home() {
  return (
    <>
      <Pricing/>
      <HeroSection {...homeObjTwo} />
    </>
  );
}

export default Home;