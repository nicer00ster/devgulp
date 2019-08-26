import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyledEditProfile,
  StyledEditForm,
  StyledEditInputFields,
} from './editProfile.styles';
import { StyledDivider } from '../../globals/globals.styles';
import { useInput } from '../../../../hooks';
import { updateUserInfo } from '../../../../redux/actions';
import Input from '../../input';
import Button from '../../button';

function EditProfile(props) {
  const { user } = props;
  const {
    value: description,
    bind: bindDescription,
    setValue: setDescription,
    reset: resetDescription,
    setError: setDescriptionError,
    hasError: descriptionError,
  } = useInput('');
  const {
    value: companyName,
    bind: bindCompanyName,
    setValue: setCompanyName,
    reset: resetCompanyName,
    setError: setCompanyNameError,
    hasError: companyNameError,
  } = useInput('');

  useEffect(() => {
    if (user.description) {
      setDescription(user.description);
    }
    if (user.company_name) {
      setCompanyName(user.company_name);
    }
  }, [user]);

  function handleUpdateUser(e) {
    e.preventDefault();
    props.updateUserInfo(props.token, description, companyName);
  }

  return (
    <StyledEditProfile>
      <h2>Update Profile</h2>
      <StyledDivider />
      <StyledEditForm onSubmit={handleUpdateUser}>
        <StyledEditInputFields>
          <Input
            type="text"
            name="description"
            label="Description"
            error={descriptionError}
            bind={bindDescription}
          />
          <Input
            type="text"
            name="company"
            label="Company"
            error={companyNameError}
            bind={bindCompanyName}
          />
        </StyledEditInputFields>
        <Button type="submit">Save</Button>
      </StyledEditForm>
    </StyledEditProfile>
  );
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
});

const mapDispatchToProps = {
  updateUserInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
