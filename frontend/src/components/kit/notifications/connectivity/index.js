import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { setOnline, setOffline } from '../../../../redux/actions';
import { AppContext } from '../provider';

function Connectivity(props) {
  const { addNotification } = useContext(AppContext);

  const updateOnline = () => {
    props.setOnline();
    addNotification("You're back online!", 'success');
  };

  const updateOffline = () => {
    props.setOffline();
    addNotification('Uh oh! You seem to be offline!', 'error');
  };

  useEffect(() => {
    window.addEventListener('offline', updateOffline);
    window.addEventListener('online', updateOnline);
    return () => {
      window.removeEventListener('offline', updateOffline);
      window.removeEventListener('online', updateOnline);
    };
  });

  return null;
}

const mapStateToProps = ({ root }) => ({
  online: root.online,
});

const mapDispatchToProps = {
  setOnline,
  setOffline,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Connectivity);
