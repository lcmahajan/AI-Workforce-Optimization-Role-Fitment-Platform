## Fix Login and Registration Issues

### Information Gathered:
- Backend authController.js login function has flawed logic: it uses 'email' field for both email and username searches, but frontend sends both username and email as the same value.
- User model stores 'name' field, but frontend expects 'username' in user object.
- Registration creates user with name: username, but login searches inconsistently.
- Header displays user.username but backend returns user.name.

### Plan:
- [ ] Fix backend authController.js login logic to properly handle username/email login
- [ ] Update frontend auth.jsx to send correct field names
- [ ] Ensure user object consistency between frontend and backend
- [ ] Test login and registration flow

### Dependent Files to be edited:
- backend/controllers/authController.js
- frontend/src/lib/auth.jsx
- frontend/src/App.jsx (header display)

### Followup steps:
- [ ] Test registration with username and email
- [ ] Test login with both username and email
- [ ] Verify token persistence and logout functionality
