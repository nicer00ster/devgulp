import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, config } from 'react-spring';
import { connect } from 'react-redux';
import {
    StyledChat,
    StyledChatHeader,
    StyledChatHeaderMessaging,
    StyledChatHeaderNewMessage,
    StyledChatContent,
    StyledChatMessage,
    StyledChatInput,
    StyledChatUser,
} from './chat.styles';
import { StyledAvatar } from "../../header/header.styles";
import {
    fetchUsers,
    sendMessage,
    setMessagingUser,
} from "../../../redux/actions";
import { useInput } from "../../../hooks";
import Input from '../input';
import UserMessage from './userMessage';

function Chat(props) {
    const chatRef = useRef();
    const [open, set] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const {
        value: chat,
        bind: bindChat,
        reset: resetChat,
        setError: setChatError,
        hasError: chatError,
    } = useInput('');

    const handleWindowScroll = useCallback(e => {
        let d = document.documentElement;
        let offset = d.scrollTop + window.innerHeight;
        let height = d.offsetHeight;

        if (offset >= height - 50) {
            setIsBottom(true);
        } else {
            setIsBottom(false);
        }
    }, []);

    function handleChatMessage(e) {
        e.preventDefault();
        props.sendMessage(props.user.token, chat);
        resetChat();
    }

    function handleChatWindow() {
        set(!open);
        if(!open) {
            props.setMessagingUser(null);
        }
    }

    function handleMessageTo(user) {
        if(props.chat.messagingUser && props.chat.messagingUser.id === user.id) {
            props.setMessagingUser(null);
        } else {
            props.setMessagingUser(user);
        }
    }

    useEffect(() => {
        props.fetchUsers();
    }, []);

    useEffect(() => {
        handleWindowScroll();
        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, [handleWindowScroll]);

    const contentSpring = useSpring({
        config: config.stiff,
        height: open ? 300 : 0,
        opacity: open ? 1 : 0,
        margin: open ? '1.2rem' : '0rem',
    });

    const messageSpring = useSpring({
        height: open ? 25 : 0,
        opacity: open ? 1 : 0,
        margin: open ? '1.2rem' : '0rem',
    });

    const chatSpring = useSpring({
        config: config.stiff,
        transform: isBottom ? `translateY(-50px)` : `translateY(0px)`,
    });

    return (
        <>
        {props.chat.messagingUser && (
            <UserMessage />
        )}
        <StyledChat
            onSubmit={e => handleChatMessage(e)}
            style={chatSpring}
            ref={chatRef}>
            <StyledChatHeader onClick={() => handleChatWindow()}>
                <StyledAvatar className="no-touch">
                    <img
                        alt="Avatar"
                        src={
                            !props.user.avatar
                                ? '/static/icons/default_avatar.png'
                                : props.user.avatar
                        }
                    />
                </StyledAvatar>
                <StyledChatHeaderMessaging>
                    Messenger
                </StyledChatHeaderMessaging>
                <StyledChatHeaderNewMessage className={open ? 'opened' : ''}>
                    <i className="fal fa-chevron-up" />
                </StyledChatHeaderNewMessage>
            </StyledChatHeader>
            <StyledChatContent style={contentSpring}>
                {props.users && (
                    props.users.users.map(user => user.id !== props.user.id && (
                        <StyledChatUser
                            key={user.id}
                            className={props.chat.messagingUser && user.id === props.chat.messagingUser.id ? 'is-messaging' : ''}
                            onClick={() => handleMessageTo(user)}>
                            <StyledAvatar className="no-touch">
                                <img
                                    alt="Avatar"
                                    src={
                                        !user.avatar
                                            ? '/static/icons/default_avatar.png'
                                            : user.avatar
                                    }
                                />
                            </StyledAvatar>
                            {user.name}
                        </StyledChatUser>
                    ))
                )}
            </StyledChatContent>
            <StyledChatMessage style={messageSpring}>
                {props.chat.messagingUser && (
                    <Input
                        type="text"
                        name="chat"
                        label={`Messaging ${props.chat.messagingUser.name}`}
                        error={chatError}
                        bind={bindChat}
                        styles={{ padding: '0 !important' }} />
                )}
            </StyledChatMessage>
        </StyledChat>
        </>
    );
}

const mapStateToProps = ({ users, chat }) => ({
    chat,
    users,
});

const mapDispatchToProps = {
  fetchUsers,
  setMessagingUser,
  sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
