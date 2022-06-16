# Job Listing API

Welcome to our RESTful API where you can find job listings. 

Authors: Grace Sessions, Patrick Holden, Daniel Porter

## API Documentation

#### Good to Know:

<details>  
<summary>Run API Locally</summary>  
<h3>Local Setup</h3>
<p>
Clone this repo:

```bash
git clone git@github.com:iO-Academy/2022-mar-jobsapi.git
```

Install packages by typing ``npm i`` in the terminal

Once cloned, first install the database stored in ``/jobsdb.sql``. Create a database named `jobsdb`, then open the SQL file in your MySQL GUI.

*You will need to amend the database`user` and `password` to match that of your MySQL DB in the `dbService.js` file*

After installing the database, install the vendor code by running the following globally in your command line:

```javascript
npm install nodemon -g
```
OR you may need to use
```javascript
sudo npm install nodemon -g
```
To run the application locally, ``cd`` into the project root then:

```javascript
nodemon app.js
```

**Do not close this terminal tab, it is a running process.**

The API will now be accessible at ``http://localhost:3000/``.

That is it, now you can view .

### Instructions

#### Testing

Run the Jest test from the root of the App

```bash
npm run test	
```
</p>

</details>  
