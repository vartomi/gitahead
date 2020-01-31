## GitAhead search widget for GitHub users

During the application I had to make some decisions that I want to share first:
- The app is using mocked users from a static JSON file default. The app is able to fetch data from github directly, but the public API of GitHub has limitation. So it's turned off in the code. For a real case, a performant backend service would provide API for the React App to get the top 5 suggestion based on the typed input.

- In the typeahead.js app, when you click on a suggestion, it just fills the input element. I thought it would better for user experience, when the user click on a suggestion, then the details profile card is becoming visible. And if the user want, then can click on the button to open the profile page on GitHub.

- From user experience perspective I tried to use GitHub's colors to show the connection from design perspective as well.

- For this kind of functionality, I used Hooks. Redux would have been too much for this requirement in my opinion, so I didn't add it. The native state management was enough.
- Router is also not used, however it is an improvement opportunity, to manipulate the URL with the search like in Google Translate. So if you refresh the page the input field does not loose the value typed before.

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
  
### Profile card
  - You can select a user from the suggestion, it will show the selected user's profile card with some additional information
  - You can click on the button of the profile card to open the profile on GitHub

## Test report

![Image of test report](https://github.com/vartomi/gitahead/blob/master/wiki/images/image.png)
