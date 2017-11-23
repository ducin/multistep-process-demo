export const userFormTpl = () => `
<form>
  <div class="form-group">
    <label for="firstNameInput">First name</label>
    <input type="text" class="form-control" id="firstNameInput" placeholder="first name">
  </div>
  <div class="form-group">
    <label for="lastNameInput">Last name</label>
    <input type="text" class="form-control" id="lastNameInput" placeholder="last name">
  </div>
</form>
`;

export const getUserFormData = (find) => ({
  first: find('#firstNameInput').val(),
  last: find('#lastNameInput').val()
});
