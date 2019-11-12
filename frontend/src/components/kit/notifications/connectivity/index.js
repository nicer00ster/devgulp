import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { setOnline, setOffline } from '../../../../redux/actions';
import { AppContext } from '../provider';

function Connectivity(props) {
  useContext(AppContext);

  useEffect(() => {
    if (!window.navigator.onLine) {
      props.setOffline();
    } else {
      props.setOnline();
    }
  }, [window.navigator.onLine]);

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
