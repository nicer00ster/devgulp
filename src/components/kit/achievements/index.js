import React from 'react';
import { StyledAchievements } from './achievements.styles';
import Gem from '../../../static/gem.svg';
import Diamond from '../../../static/diamond.svg';
import DiamondLv2 from '../../../static/diamond-2.svg';
import Gulp from '../../../static/milk.svg';

function Achievements(props) {
  const { user } = props;
  return (
    <StyledAchievements>
      {user.stats.core && <Gulp width={50} height={50} />}
      {user.stats.popular && <Diamond width={props.size} height={props.size} />}
      {user.stats.very_popular && (
        <DiamondLv2 width={props.size} height={props.size} />
      )}
      <Gem width={props.size} height={props.size} />
    </StyledAchievements>
  );
}

export default Achievements;
