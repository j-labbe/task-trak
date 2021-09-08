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

[![GPLv3][license-shield]][license-url]

This is the repo for the first release of Task Track, an All-In-One tracker for to-do lists.

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
    <li><a href="https://github.com/j-labbe/task-trak/tree/feature-list-dnd#-things-that-can-be-improved">Things That Can Be Improved</a></li>
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
        <li><a href="#">Prerequisites</a></li>
        <li><a href="#-installation">Installation</a></li>
        <li><a href="#-run-development-version">Run Development Version</a></li>
        <li><a href="#">Build Production Version</a></li>
      </ul>
    </li>
    <!--
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>-->
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
# or
npm run dev
```

### 🎬 Build Production Version
```sh
yarn run build
```

<!--
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO 
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">project_title</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`github_username`, `repo_name`, `twitter_handle`, `email`, `project_title`, `project_description`


### Built With

* []()
* []()
* []()



<!-- GETTING STARTED 
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES 
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP 
## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING 
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE 
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT 
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)



<!-- ACKNOWLEDGEMENTS 
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES 
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links 
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
-->
[license-shield]: https://img.shields.io/github/license/j-labbe/task-trak.svg
[license-url]: https://github.com/j-labbe/task-trak/blob/feature-list-dnd/LICENSE
<!--[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
