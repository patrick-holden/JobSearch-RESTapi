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

## HTTP Requests

This API supports the following requests: 

### View all jobs
<details>
  
**URL:**
  
`/jobs`
  
**Method:**
  
 `GET` <br />
  
**URL Params** <br />
  * **Required:**
    * No required URL Params, this URL will return all jobs if none are passed. 

  * **Optional URL Params:**
    * No required URL Params, this URL will return all jobs if none are passed. 

**Example URL:**
  
`/jobs`
  
* **Success Response**
  * **Code:** 200 <br />
  * **Response:** <br />

```json
{
    "statusCode": 200,
    "message": "success",
    "success": true,
    "result": [
        {
            "id": 1,
            "job_title": "Junior software developer",
            "company": "Browsebug",
            "logo": "https://dummyimage.com/250/ffffff/e330d1&text=Logo",
            "salary": 103977,
            "type": "Part time",
            "skill": [
                "HTML/CSS"
            ]
        },
        {
            "id": 2,
            "job_title": "Junior software developer",
            "company": "Rhybox",
            "logo": "https://dummyimage.com/250/e330d1/000000&text=Logo",
            "salary": 111142,
            "type": null,
            "skill": [
                "APIs"
            ]
        }
    ]
  }
  
```
  
* **Error Response**
  * **Code:** 200 <br />
  * **Response:** <br />


```json
{
	"statusCode": 200,
	"message": "No jobs found",
	"success": true,
	"data": []
}
```
  
</details>

### View Single job 
<details>

**URL:**	

`/jobs/:jobId`

**Method:**

`GET`
**URL Params** <br />
  * **Required:**
    * No required URL Params, this URL will return all jobs if none are passed. 

  * **Optional URL Params:**
    * `/:jobId` 

**Example URL:**

`/jobs/4`
	
* **Success Response**
  * **Code:** 200 <br />
  * **Response:** <br />
  
```json
{
    "statusCode": 200,
    "message": "success",
    "success": true,
    "result": [
        {
            "id": 4,
            "job_title": "Junior software developer",
            "company": "Kanoodle",
            "logo": "https://dummyimage.com/250/e330d1/89e632&text=Logo",
            "job_description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
            "salary": 137498,
            "posted": "2021-01-23T00:00:00.000Z",
            "type": "Full time",
            "skill": [
                "PHP",
                "Ruby",
                "Bash",
                "TypeScript"
            ]
        }
    ]
}
```
  
* **Error Response**
  * **Code:** 200 <br />
  * **Response:** <br />


```json
{
	"statusCode": 200,
	"message": "No job found",
	"success": true,
	"data": []
}
```
  
### Search and Filter Jobs
<details>

**URL:**	

`/jobs/query`

**Method:**

`GET`
**URL Params** <br />
  * **Required:**
    * No required URL Params, this URL will return all jobs if none are passed. 

  * **Optional URL Params:**
    * `search=[alphanumeric]` -  

**Example URL:**

`/jobs/4`
	
* **Success Response**
  * **Code:** 200 <br />
  * **Response:** <br />
  
```json
{
    "statusCode": 200,
    "message": "success",
    "success": true,
    "result": [
        {
            "id": 4,
            "job_title": "Junior software developer",
            "company": "Kanoodle",
            "logo": "https://dummyimage.com/250/e330d1/89e632&text=Logo",
            "job_description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
            "salary": 137498,
            "posted": "2021-01-23T00:00:00.000Z",
            "type": "Full time",
            "skill": [
                "PHP",
                "Ruby",
                "Bash",
                "TypeScript"
            ]
        }
    ]
}
```
  
* **Error Response**
  * **Code:** 200 <br />
  * **Response:** <br />


```json
{
	"statusCode": 200,
	"message": "No job found",
	"success": true,
	"data": []
}
```
