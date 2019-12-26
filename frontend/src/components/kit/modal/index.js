import { useRef, useEffect } from 'react';
import { useTransition } from 'react-spring';
import { connect } from 'react-redux';
import {
  StyledModal,
  StyledModalContainer,
  StyledModalItem,
  StyledCloseModal,
  StyledCloseIcon,
} from './modal.styles';
import Portal from './Portal';
import { toggleModal, closeModal } from '../../../redux/actions';
import { useOnClickOutside } from '../../../hooks';

function Modal(props) {
  const modalRef = useRef();
  const { closeModal, toggleModal, width, noPadding } = props;

  const modalTransition = useTransition(props.modalOpen, null, {
    delay: 0.5,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useOnClickOutside(modalRef, () => closeModal());

  useEffect(() => {
    if (props.modalOpen) {
      modalRef.current.querySelector('button').focus();
      modalRef.current.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          closeModal();
        }
      });
    }
  }, [props.modalOpen]);

  function getChildren() {
    return props.children;
  }

  return (
    <Portal>
      <StyledModal>
        {modalTransition.map(({ item, key, props }) => {
          return item ? (
            <StyledModalContainer
              key={key}
              style={props}
              aria-modal="true"
              role="dialog">
              <StyledModalItem
                ref={modalRef}
                key={key}
                width={width}
                noPadding={noPadding}
                style={props}>
                <StyledCloseModal onClick={() => closeModal()}>
                  <StyledCloseIcon className="fa fa-times" />
                </StyledCloseModal>
                {getChildren()}
              </StyledModalItem>
            </StyledModalContainer>
          ) : null;
        })}
      </StyledModal>
    </Portal>
  );
}

const mapStateToProps = ({ root }) => ({
  modalOpen: root.modalOpen,
});

const mapDispatchToProps = {
  toggleModal,
  closeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
