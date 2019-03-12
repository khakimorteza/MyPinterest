# component hierarchy

- Root
  - App NavBar HomePage ProfilePage

# NavBar

- Link to HomePage
- Link to profilePage
- SessionsButtonsContainer(log out)

# HomePage

\*DisplayPins

# ProfilePage

- UserInfo
- profile NavBar(pins, boards)
- DisplayBords
- UploadAPin

# DisplayAnImage

- Route /pins/pins_id

# Session

- SessionFormContainter + SessionForm
  - Route: /login and /signup
  - State: errors.login
