<div align="center">
  <h1>Task Trak</h1>
  <h3>Simplify your to-do list.</h3>
</div>

This is the repo for the first release of Task Track, an All-In-One tracker for to-do lists.

### TODO:
1. Finish building basic UI and API
2. Implement login with Auth0
3. Tests
4. Merge with master & deploy
5. Work on new features and improvements

Run
```bash
yarn run dev
# or
npm run dev
```

### Why the additional `userId` code?
I wanted this application to be modular. If I used auth0's `user.sub` indentifier, it would make things difficult if it's ever switched to another login solution / database provider. Each user having a unique userId in their metadata allows for an easier migration in the future, if needed. 

Additionally, if a login method is updated then there is no risk of losing access to data since the userId is part of the profile metadata and not tied to the login method.

There are specific server-side tasks that were setup on auth0's servers. See `/etc/auth0_rules.js`.