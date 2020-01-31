## GitAhead search widget for GitHub users

During the application I had to make some decisions that I want to share first:
- The app is using mocked users from a static JSON file default. The app is able to fetch data from github directly, but the public API of GitHub has limitation. So it's turned off in the code. For a real case, a high-performant backend service would provide API for the React App to get the top 5 suggestions based on the typed input.
- In the typeahead.js app, when you click on a suggestion, it just fills the input element. I thought it would be better for user experience, when the user clicks on a suggestion, then the details profile card is becoming visible. And if the user wants, then he/she can click on the button to open the profile page on GitHub.
- From user experience perspective I tried to use GitHub's colors to show the connection from design perspective as well.
- For the suggestions I wanted to minimize the details that the app can show, but if you select a user and open the profile card, then it contains more details. 
- For this kind of requirements, I've used Hooks. Redux would have been too much for this requirement in my opinion, so I didn't add it. The native state management was enough.
- Router is also not used, however it is an improvement opportunity, to manipulate the URL with the search like in Google Translate. So if you refresh the page the input field does not loose the value typed before.
- For tests I've choosed Jest which is in CRA with enzyme and snapshot testing. Each of the test files are located next to their source files.
- For styling, I was thinking to use Less/SASS, but for this small amount of style rules, I've used pure CSS. The stylesheet files are also location next to the components, so it's easier to maintain them, because the design and the markup are bundled and encapsulated.
- For searching I'm using a controlled input element, and the state of the Search component stores what are the suggestions and what is the value for the search.

## Folder structure
- assets (SVG files)
- components (React components)
  - Container (main container element)
  - Header
  - ProgressBar
  - Search (controller element for searching)
    - SearchResult (presentation component for suggestions)
  - UserProfile (presentation component for profile)
    - UserCard (presentation component for each suggestion)
- services (API layer)
- configs (constants)
- mocks (static JSON for testing)

## Additional libraries
- lodash.debounce - for debounce the search callback to avoid performance issues and unnecessary API call
- enzyme-to-json - for snapshot tests
- jest-fetch-mock - for mocking fetch API

## Functionality

### Preload
- The application has a 1s long delay to simulate some preload for the app
![InitialLoadingState](https://github.com/vartomi/gitahead/blob/master/wiki/images/InitialLoadingState.png)

### Search
  - You can type characters in the input field, 300ms after the last character, it fetches the suggestions (there is a 1s long delay to simulate fetching suggestions)  
  ![InitialState](https://github.com/vartomi/gitahead/blob/master/wiki/images/InitialState.JPG)  
  ![SearchingState](https://github.com/vartomi/gitahead/blob/master/wiki/images/SearchingState.JPG)  
  ![ResultState](https://github.com/vartomi/gitahead/blob/master/wiki/images/ResultState.JPG)  
    - You can select one with clicking on it
    - You can select the first with pressing TAB    
  - If there is no suggestion for the given input, you can press ENTER and it will open the GitHub page with prefilled search for the given input  
  ![RedirectToGithub](https://github.com/vartomi/gitahead/blob/master/wiki/images/RedirectToGithub.JPG)  
### Profile card
  - You can select a user from the suggestion, it will show the selected user's profile card with some additional information
  ![SelectedState](https://github.com/vartomi/gitahead/blob/master/wiki/images/SelectedState.JPG)
  - You can click on the button of the profile card to open the profile on GitHub
  ![OpenProfileOnGithub](https://github.com/vartomi/gitahead/blob/master/wiki/images/OpenProfileOnGithub.JPG)

## Test report
- There are some tests which are only checking one property of a user object, or one property of an element in the shallow object. I could extend those tests anytime, but I wanted to avoid to make huge test files for this task, so I skipped 100% coverage for edge cases.
- I've tried to cover every lines of the code, because for these functionalities it was not hard to cover the lines.

![Image of test report](https://github.com/vartomi/gitahead/blob/master/wiki/images/image.png)
