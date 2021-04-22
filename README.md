# grad_server

## Initialize 

```bash
# clone the repo
$ git clone

# install dependencies
$ npm install

# serve with hot reload at localhost:4020
$ npm start

```

The API was built using `json-server` dependency. Using this tool, you can mock and run a database and server-side. This part of the application is separated into routers, database and server. You can have access to the files **db.json**, which mock a table of courses.

### Dependencies

<ul>

<li><b>bcrypt</b>: to hash the passwords</li>
<li><b>nodemon</b>: to run the server-side continuously </li>
<li><b>json-server</b>: to mock an API and database</li>
</ul>


#### The properties of courses are: 

<ul>
<li>id:Number</li>
<li>week:Number</li>
<li>course_code:String</li>
<li>course_name:String</li>
<li>assessment:Boolean</li>
<li>source:String</li>
<li>duration:Number</li>
<li>link:String</li>
</ul>

There is another table that represents the user; you can find this data in **user.json**

#### The properties of users are: 
<ul>
<li>id:Number</li>
<li>empId:Number</li>
<li>password:String</li>
<li>name:String</li>
<li>role:Array</li>
<li>assessments_score:Array</li>
</ul>

The `server.js` mocks  Express Node.js server. It sets a listener on the `4020` portal and runs an authentication process using **JWT**. 
The server gets the client's token and verifies if the user is authenticated for each route except the Login page.  Also, in this file, the routes are called and assigned to a path. In the router files, you can find CRUD operations, such as: **adding a new user, authenticating, getting data from the database, etc...**  Since the data is mocked, the database is made with **fs** dependency to read the file and change its content. The same thing occurs when you retrieve data from the database.

```bash
  fs.writeFile("./mock_server/db.json", JSON.stringify(coursesDb), (err, result) => {
            err && res.status(401).json({ message: err });
            res.status(200).json({ message: "Your course was addeded" });
            return;
        });

```
In the helper folder, you will find the authentication helpers, and there is used **JWT** and **bcrypt**.  


