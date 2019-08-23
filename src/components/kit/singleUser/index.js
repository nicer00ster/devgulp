import {connect} from 'react-redux';
import moment from 'moment';
import {
    StyledSingleUser,
    StyledSingleUserContainer,
    StyledSingleUserContent,
    StyledSingleUserDate,
    StyledSingleUserDescription,
    StyledSingleUserInfo,
    StyledSingleUserName,
} from './singleUser.styles';
import {StyledAvatar} from '../../header/header.styles';
import {toggleModal} from '../../../redux/actions';
import Background from '../background';
import Loading from '../loading';
import Modal from '../modal';
import {StyledPreviewImage} from '../publish/publish.styles';

function SingleUser(props) {
    const {author, isFetchingAuthor} = props.author;
    if (isFetchingAuthor) {
        return <Loading/>;
    }
    return (
        <StyledSingleUser>
            <Background rotate="12deg"/>
            <StyledSingleUserContainer>
                <StyledSingleUserContent>
                    <StyledSingleUserInfo>
                        <StyledSingleUserName>{author.name}</StyledSingleUserName>
                        <StyledSingleUserDate>
                            Active user since
                            {` `}
                            {moment(author.user_registered).format('MMMM Do, YYYY')}
                        </StyledSingleUserDate>
                        <StyledSingleUserDescription>
                            {author.description}
                        </StyledSingleUserDescription>
                    </StyledSingleUserInfo>
                    <StyledAvatar
                        size={100}
                        className="bordered"
                        onClick={props.toggleModal}>
                        <img
                            alt="Avatar"
                            src={
                                !author.acf.avatar
                                    ? '/static/icons/default_avatar.png'
                                    : author.acf.avatar
                            }
                        />
                    </StyledAvatar>
                </StyledSingleUserContent>
            </StyledSingleUserContainer>
            <Modal>
                <StyledPreviewImage src={author.acf.avatar}/>
            </Modal>
        </StyledSingleUser>
    );
}

const mapStateToProps = {
    toggleModal,
};

export default connect(
    null,
    mapStateToProps,
)(SingleUser);
