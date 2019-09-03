import { useState, useRef } from 'react';
import { useSpring } from 'react-spring';
import { useOnClickOutside } from "../../../../hooks";
import {
    StyledHints,
    StyledHintItems,
    StyledHintItem,
    StyledHintButton,
    StyledHintIcon,
    StyledHintConfetti,
} from './hints.styles';

function Hints(props) {
    const [active, setActive] = useState(false);
    const hintRef = useRef();

    useOnClickOutside(hintRef, () => {
        setActive(false);
    });

    const spring = useSpring({
       width: active ? '100%' : '0%',
       height: active ? '100%' : '0%',
    });

    function handleClick() {
        setActive(!active);
        props.onClick && props.onClick();
    }
    return (
        <StyledHints ref={hintRef} style={spring}>
            <StyledHintButton
                onClick={handleClick}
                className={active && 'active'}>
                <StyledHintIcon className={`${!active ? 'far' : 'fas'} fa-info-circle`} />
                <StyledHintConfetti color="palegreen" />
                <StyledHintConfetti color="tomato" />
                <StyledHintConfetti color="blue" />
                <StyledHintConfetti color="yellow" />
                <StyledHintConfetti color="pink" />
                <StyledHintConfetti color="purple" />
                <StyledHintConfetti color="orange" />
                <StyledHintConfetti color="green" />
            </StyledHintButton>
            <StyledHintItems active={active}>
                <StyledHintItem>
                    <span>You can use emojis by typing <code>::</code> in the body of your post.</span>
                </StyledHintItem>
            </StyledHintItems>
        </StyledHints>
    );
}

export default Hints;
