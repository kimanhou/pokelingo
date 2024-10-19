# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.1.7] 2024-08-01 - Ivysaur - Edit avatar

### Added

- Member can edit and save their avatar.
- Technical improvement: migrate to Vite, change classnames to camelCase, add Storybook

## [0.1.6] 2024-07-23 - Ivysaur - Log-in status

### Added

- Show connected members in color, while not connected members are in black and white. A "connected" member is someone who joined the room.

## [0.1.5] 2024-07-18 - Ivysaur - Motion detection

### Added

- Display a green dot under the name of active users. A user is considered active 30 seconds after they have moved their game piece in the Arena. The green dot automatically disappears after 30 seconds when inactive.

## [0.1.4] 2024-06-28 - Ivysaur - Set next round modal

### Added

- Set next round modal: admin can reset positions, publish a new prompt, show/hide positions and set timer in one popup.

## [0.1.3] 2024-06-19 - Ivysaur - Hide/show positions

### Added

- Admin can hide/show positions. All members in the Arena, except the user, disappear. The user can still update their own position if they are logged in.

## [0.1.2] 2024-06-18 - Ivysaur - Admin

### Added

- Admin: reset positions, timer. Regular user cannot update someone else's position.
- Log out/in
- User menu

## [0.1.1] 2024-06-11 - Ivysaur - Timer

### Added

- Timer
- Fix: allow prompt on multiple lines
- Update Pokemon for people who requested

## [0.1.0] 2024-06-07 - Bulbasaur - Launch :rocket:

### Added

- Cursor and selectable
- Disable Reset button when no one in the Arena
- Confirmation windows
- Reset positions button
- Prompt can be edited by anyone
- Positions can be edited by anyone
- Positions and prompt are in sync for all users
- 2 teams/rooms with hardcoded members
