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

### View All Jobs - with optional search and filter
<details>
  
**URL:**
  
`/jobs`
  
**Method:**
  
 `GET` <br />
  
**URL Params** <br />
  * **Required:**
    * No required URL Params, this URL will return all jobs if none are passed. 

  * **Optional URL Params:**
    * `search=[alphanumeric]` - matches the search input to jobs by `job_title` and `company`. 
    * `type=[alphabetical]` - filter jobs by job type using available values: `Part time`, `Full time` and `Contract`. 
    * `command=[alphabetical]` and `salary=[integer]` - filter jobs by salary using available commands:  `above` and `below`.
    * `skill=[integer]` - filter jobs by ID of a skill. 
	
    -- Note: all filters return jobs related to the search input when used. 
	
**Example URL:**
  
`/jobs?search=junior&type=Part time&command=above&salary=130000&skill=5`
  
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
            "id": 51,
            "job_title": "Junior software developer",
            "company": "Kazio",
            "logo": "https://dummyimage.com/250/e330d1/89e632&text=Logo",
            "salary": 144181,
            "type": "Part time",
            "skill": [
                "Ruby"
            ]
        },
        {
            "id": 116,
            "job_title": "Junior software developer",
            "company": "Thoughtworks",
            "logo": "https://dummyimage.com/250/e330d1/000000&text=Logo",
            "salary": 134024,
            "type": "Part time",
            "skill": [
                "Ruby"
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
	"data": {}
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
	"data": {}
}
```
</details>

### Mark Job as Filled as Admin
<details>
  
**URL:**
  
`/admin/jobs/filljob/:jobId`
  
**Method:**
  
 `POST` <br />
  
**URL Params** <br />
  * **Required:**
    * `:jobId`

  * **Optional URL Params:**
    * No optional parameters.
	
**Example URL:**
  
`/admin/jobs/filljob/5`
  
* **Success Response**
  * **Code:** 200 <br />
  * **Response:** <br />

```json
{
    "statusCode": 200,
    "message": "success",
    "success": true,
    "result": {}
}
  
```
  
* **Error Response**
  * **Code:** 200 <br />
  * **Response:** <br />


```json
{
    "statusCode": 200,
    "message": "unsuccessful",
    "success": true,
    "result": {}
}
```
  
	
Then searching the filled job returns:
	
```json
{
    "statusCode": 200,
    "message": "No job found",
    "success": true,
    "result": {}
}
```
</details>

	
### View All Jobs as Admin - with optional search and filter
<details>
  
**URL:**
  
`/admin/jobs`
  
**Method:**
  
 `GET` <br />
  
**URL Params** <br />
  * **Required:**
    * No required URL Params, this URL will return all jobs if none are passed. 

  * **Optional URL Params:**
    * `search=[alphanumeric]` - matches the search input to jobs by `job_title` and `company`. 
    * `type=[alphabetical]` - filter jobs by job type using available values: `Part time`, `Full time` and `Contract`. 
    * `command=[alphabetical]` and `salary=[integer]` - filter jobs by salary using available commands:  `above` and `below`.
    * `skill=[integer]` - filter jobs by ID of a skill. 
	
    -- Note: all filters return jobs related to the search input when used. 
	
This route 
 - returns all jobs, including those filled
 - splits filled and unfilled jobs into separate arrays within an object 
 - provides a count of filled and unfilled jobs 
	
**Example URL:**
  
`/admin/jobs?search=junior&type=Contract&command=above&salary=120000&skill=10`
  
* **Success Response**
  * **Code:** 200 <br />
  * **Response:** <br />

```json
{
    "statusCode": 200,
    "message": "Success",
    "success": true,
    "result": {
        "filled job count": 1,
        "filled jobs": [
            {
                "id": 5,
                "job_title": "Junior software developer",
                "company": "Photolist",
                "logo": "https://dummyimage.com/250/ffffff/e330d1&text=Logo",
                "salary": 120619,
                "type": "Contract",
                "skill": [
                    "HTML/CSS"
                ]
            }
        ],
        "unfilled job count": 1,
        "unfilled jobs": [
            {
                "id": 473,
                "job_title": "Junior software engineer",
                "company": "Jabbersphere",
                "logo": "https://dummyimage.com/250/ffffff/d91c4e&text=Logo",
                "salary": 127356,
                "type": "Contract",
                "skill": [
                    "HTML/CSS"
                ]
            }
        ]
    }
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
    "result": {
        "filled job count": 0,
        "filled jobs": [],
        "unfilled job count": 0,
        "unfilled jobs": {}
    }
}
```
  
</details>





