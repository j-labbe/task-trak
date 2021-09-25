<div align="center">
  <h1>Task Trak</h1>
  <!-- Logo coming soon -->
  <h3>Simplify your to-do list.</h3>
  <p align="center">
    <a href="https://tasktrak.io">🎉 View the Live Version 🎉</a>
          •      
    <a href="https://github.com/j-labbe/task-trak/issues">🐞 Report a Bug 🐞</a>
          •      
    <a href="https://github.com/j-labbe/task-trak/issues">⚡️ Request a Feature ⚡️</a>
  </p>
</div>

<div align="center" style="display:flex;flex-direction:row;">
  <img src="https://img.shields.io/uptimerobot/status/m789140368-a2a35d6ece6100800e32652e">
    <a href="https://tasktrak.io"></a>
  </img>
  <img src="https://img.shields.io/github/issues/j-labbe/task-trak">
    <a href="https://github.com/j-labbe/task-trak/issues"></a>
  </img>
</div>

<details open="open">
  <summary><h2 style="display: inline-block">📋 Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#-why-this-project">Why This Project?</a>
      <ul>
        <li><a href="#-built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#-why-typescript">Why TypeScript?</a></li>
    <li><a href="#%EF%B8%8F-challenges-faced">Challenges Faced</a></li>
    <li><a href="#-how-i-tackled-those-challenges">Usage</a></li>
    <li><a href="#-things-that-can-be-improved">Things That Can Be Improved</a></li>
    <li>
      <a href="#-api-documentation">API Documentation</a>
      <ul>
        <li><a href="#-why-the-additional-userid-code-in-the-api">Why the additional userId?</a></li>
      </ul>
    </li>
    <li><a href="#-todo">To Do</a></li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#%EF%B8%8F-prerequisites">Prerequisites</a></li>
        <li><a href="#-installation">Installation</a></li>
        <li><a href="#-run-development-version">Run Development Version</a></li>
        <li><a href="#-build-production-version">Build Production Version</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Making Contributions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## 🤔 Why this project?
Initially this project was going to be something I may adapt to my personal website in the future (give clients a way to track the progress of their service), but I decided to break it out into it's own service. At a very basic level, it's a glorified To-Do / reminders app. At a more complex level, it is a showcase of my compoetency with some of the latest and greatest technologies there are as of writing this.

### 🛠 Built With
* Next.js [https://nextjs.org/]
* Auth0 [https://auth0.com/]
* Airtable [https://airtable.com]
* React-DnD [https://github.com/react-dnd/react-dnd/]
* styled-components [https://styled-components.com/]
* React Transition Group [https://github.com/reactjs/react-transition-group]
* And many other libraries!

## 🤔 Why TypeScript?
To do this project, I had to further learn TypeScript. I was familiar with a few aspects of TS because of a previous projects, however I had never fully jumped into a new project using it. After beginning to use it, I realized that it makes things like debugging and maintaining code a little easier since types are clearly defined. Since my goal for this project was to, over time, build this system up, TS makes it easier to jump back into sections of code that need to be refactored easier, since the code is staticly typed. Lastly, I just wanted experience with it since many libraries are written in TS.

## ⚠️ Challenges Faced
With any project, there are challenges that need to be overcome. Since I had not done a TS project in React, I needed to learn how React interacts with types, as well as a few other libraries like Next.js, styled-components, Auth0, Airtable, and so on.

Additionally, I had never used the Airtable or Auth0 API. As with any new API, extensive reading through documentation is required. I have (and still am) referring to documentation to ensure I'm implementing the features I need properly.

One recurring issue was state management. After a few different tests, I decided upon using MobX for state management. Less boilerplate and easier to setup. It works great for now.

## ✅ How I Tackled Those Challenges
I alluded to this in the previous section, but to expand, extensive reading and trial-and-error were just two of the many methods I used to tackle the many challenges I faced and currently am facing with this project. One thing remains constant, however, and that is my mindset. I describe myself as someone who understands learning never stops. I believe that is a fundamental mindset to have because it prevents you from blinding yourself by thinking "you know everything". I never stop trying to learn and I always do my best to make sure features work how they're supposed to (and are written well).

## 📈 Things That Can Be Improved
For starters, I am always looking to refactor and restructure code to be more efficient and logical. Sometimes I implement new features, only to re-write them because I know they aren't efficient or robust. My running list of things that need to be worked on can be found in the **Issues** tab.

## 🌐 API Documentation
*(Coming soon once Release 1 is released)*
### 🤔 Why the additional `userId` code in the API?
I wanted this application to be modular. If I used auth0's `user.sub` indentifier, it would make things difficult if it's ever switched to another login solution / database provider. Each user having a unique userId in their metadata allows for an easier migration in the future, if needed. 

Additionally, if a login method is updated then there is no risk of losing access to data since the userId is part of the profile metadata and not tied to the login method.

There are specific server-side tasks that were setup on auth0's servers. See `/etc/auth0_rules.js`.

## 📄 TODO:
1. Finish building UI and API
2. Refactor & Restructure
4. Tests
5. Merge with master (auto-deploy)
6. Work on new features and improvements

## 😎 Getting Started

### ⚠️ Prerequisites
In order to run this project, `yarn` is highly recommended (you can use npm, but errors may occur). Run this command to install:
```sh
npm install -g yarn
```

TaskTrak uses environment variables to hold credentials for various APIs that are used. 
Create a `.env.local` file and copy the contents of `.env.example` to it. Plug in your credentials
and you'll be good to go.

### 💻 Installation
1. Clone the repo
```sh
git clone https://github.com/j-labbe/task-trak.git
```
2. Install Dependancies
```sh
yarn
```

### 🛠 Run Development Version
```sh
yarn run dev
```

### 🎬 Build Production Version
```sh
yarn run build
```

## Roadmap

See the [open issues](https://github.com/j-labbe/task-trak/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GPLv3 License. See `LICENSE` for more information.

## Contact

Jack Labbe - [Email](mailto:mail@jacklabbe.com) [Website](https://jacklabbe.com)

Project Link: [https://github.com/j-labbe/task-trak](https://github.com/j-labbe/task-trak)
