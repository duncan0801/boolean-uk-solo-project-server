# Project Summary 
![alt-text](https://github.com/duncan0801/boolean-uk-solo-project-server/blob/master/game-lobby-recording.gif?raw=true)
Here we have a game lobby where a user can sign up/ log in and view the lobbies that they are a part of. A user can create their own lobby and invite people with the lobby id, or join another lobby with a lobby id. This project currently has no games. However, it is a working progress that will allow me to create more projects (such as a multiplayer game of checkers) within the app for players to play together in their lobbies.

# Deployed Website
Please feel free to have a look at the app <a href="https://social-game-lobby.netlify.app/">here</a>. You can log in with the ``username: duncan``, ``password: test`` and play in the exsisting lobbies, or create your own user and lobby by signing up!

# Local Set up
After downloading this repo along with the <a href="https://github.com/duncan0801/boolean-uk-solo-project-client">client side repo</a>, in your local environment in both the server and client folder:
<ol>
  <li>```npm i``` to install the required node modules</li>
  <li>```npm start``` to start the server/ react server</li>
</ol>

# Planning Process

## The Idea
I wanted to be able to have a place to where friends could gather and play games as well as have a channel for chat within the group members. And so I decided to build this project!

## User Stories 
<ol>
A user should be bale to:
  <li>Sign up and log in with a username and password.</li>
  <li>Create their own lobby.</li>
  <li>Join another lobby with a lobby ID.</li>
  <li>Send messages within a lobby.</li>
  <li>View what users are a part of the lobby.</li>
  <li>Leave the lobby.</li>
  <li>Log out.</li>
</ol>

## Wireframes

  ### Home Page
 ![alt-text](https://github.com/duncan0801/boolean-uk-solo-project-server/blob/master/src/ReadMe%20Stuff/Home%20page%20Wireframe.JPG?raw=true)
  ### Lobby Library
 ![alt-text](https://github.com/duncan0801/boolean-uk-solo-project-server/blob/master/src/ReadMe%20Stuff/Lobby%20Library%20Wireframe.JPG?raw=true)
  ### Lobby Page
 ![alt-text](https://github.com/duncan0801/boolean-uk-solo-project-server/blob/master/src/ReadMe%20Stuff/Lobby%20Page%20Wireframe.JPG?raw=true)
 
## Entity Relationship Diagram

![alt-text](https://github.com/duncan0801/boolean-uk-solo-project-server/blob/master/src/ReadMe%20Stuff/Data%20Model.JPG?raw=true)

# Future Work

<ol>
  <li>Add a set timeout to fetch from the database very 3s to try to mimic a real time websocket connection.</li>
  <li>Add in a feature to be able to change the username and password</li>
  <li>Add in more games like checkers, tic-tac-toe, connect four etc</li>
</ol>


