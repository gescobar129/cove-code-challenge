# cove-code-challenge

A conference room scheduler app specifically made for the tenants in the building. As a user, you can view a list of different conference rooms available for reservation and view the reservation times made for a particular room at a particular date.

I approached the UX by first showing the users all the available conference rooms the building has to offer. From there the user can select one to fit their needs. 

Once they select a room, a modal will pop up showing the room details up top, a calander in the middle and a section where they can view all the reserved times for that specfic room on the day they select. If there are no reservations made for the room on the day they select, then the following text will appear - "No Reservations Have Been Made For ${selectedDay}".

I chose to use a calendar because I believe it would be the best visual representation of including the date aspect of the schedule. This way, a user can easily see what day works for them by taking into account the day of the week and the whole month in general. This way, they would not need to leave the app to check their calendar on their own device to picture what the week would look like. 

If I had more time I would: 

- Add types through the use of TypeScript. This would self-document the code and help to minimize bugs because the TypeScript compiler would catch type issues/bugs. 

- Include error handling. For example, if the api call I am making to the given endpoint, I could add an alert to notify the user that there is an issue. I could also add re-try logic to make the api call again if it fails.

- Add unit tests to ``` getReservations ``` and ``` getRoomData ``` functions.

- Use an icon library such as [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons). In the modal, I made the 'close' button an 'X' rather than an icon. I would replace this with an actual icon.

- Complete the Bonus Option of the challenge. 

## Languages and Frameworks

### Front-End

- [React Native](https://reactnative.dev/docs/getting-started)
- [react-native-calendars](https://github.com/wix/react-native-calendars)
- [moment js](https://momentjs.com/)
- [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)

## Installation

> Make sure you are in the Project Path before writing the commands.

1. Clone/fork-clone this repo.

2. Use the package manager ``` yarn ``` to install the project's packages locally. 

3. run ``` cd ios ``` to check into the ios folder

4. run ``` pod install ``` to install the native ios modules

5. run ``` yarn start ``` to run the dev server

6. run ``` yarn ios ``` to build the app

