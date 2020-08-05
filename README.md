# SignUp + LogIn FORM

This is my _first_ **FULLSTACK** project 💻

### Description:

It's a signup and login web (with password and email **validation** in both **frontend and backend**):

* The web **automatically validates** the password in a dynamic way in the /signup page and in the /profile/edit page. If the validation isn't completed the user can't send the data.
**_Before validation:_**

![Photo can't be loaded.](https://imgur.com/W4cIEhC.jpeg)

**_After validation:_**

![Photo can't be loaded.](https://imgur.com/Rng7VxJ.jpeg)

* There are **flashes** (SweetAlert2 personalized alerts) for every or almost every possibility (_the user introduced an already used email in the signup, he couldn't update his password, etc._).
  
* The **user can see all his data** once logged in and **edit** the **fullname or password** if he wants to (**in a dynamic way too**).

* The **password is encrypted** in the DB so in case anyone gains access to it he won't know the _"real (plaintext)"_ password (**salt of 12**).
  
**_Notes:_**
* The web is fully responsive.
* There are 2 functional icons in every form:
    * The clear button (it only shows if you focus on the email.)
    * The show/hide dynamic icon to show or hide the passwords you're typing.
* The project has more small details that you can check for yourself.
* Feel free to contact me on Twitter if you want to talk about this project or something else: [My twitter.](https://twitter.com/SergioAstGonz)

### Things to do before trying out the project:

1. **Install MySQL** in your computer.
2. Use the command `npm i` to install all the necessary node modules.
3. **Execute** the script located in **/database/db.sql**
4. Create a **.env** file with the following **variables**:
      * **DB_HOST:** the IP or hostname of the computer you're going to use for testing the project.
      * **DB_USER:** the username you use to access MySQL.
      * **DB_PASSWORD:** the password you use to access MySQL (You can leave it blank if you don't use any. But it has no be created.)
      * **DB_NAME:** the name of the DB where you're going to store the users (**_If you used the script this will be "mainDatabase"_**).
      * **SECRET:** the secret keyword for the session.
      * **PORT:** the port you're gonna use for testing the app. (I recommend **3000 || 5000 || 8080**)

Once you did all this you can **start using the project** with no problems.

### Technologies used:

* **Handlebars** (_HTML_)
* **SaSS/ScSS** (_CSS3_)
* **JS** (_with ES6 features_)
* **Node.JS**
* **MySQL** (_SQL_)

### Libraries/frameworks:

* **FontAwesome** for the icons.
* **SweetAlert2** for the alerts.
* **NormalizeCSS** for adapting the webpage to all browsers.

### Node.JS modules used for development:

* Express.
* Express-mysql-session
* Express-session
* Express-validator
* Express-handlebars
* Connect Flash
* Morgan
* Nodemon (_only in development_)
* MySQL
* Passport
* Passport-local
* TimeAgo.js
* Dot.env
* Bcrypt.js