### Finacial Service API

### Running the app

1. Create a database name e.g p2vest_db with mysql cli

2. See example.env file for reference

3. To compile the code, Run: yarn compile or yarn compile:dev

4. To run the app, Run: yarn start:dev

5. To create the account and user tables in the database, Run: yarn migrate:dev

### Running the Tests

To run the tests cases,

1. Create a test database e.g p2vest_test_db with mysql cli

2. See example.env file for reference

3. run: yarn test

### Postman Documentation

https://documenter.getpostman.com/view/23412698/2s8YzL56bV

### *Quiz*

Question 1: Explain the differences in the 3 non-constructor functions below.

class Dashboard {

  constructor(_num) {

    this.num = _num;

  }

  static staticFunc() {

    console.log("staticFunc " + this.num);

  }

  memberFunc1() {

    console.log("memberFunc1 " + this.num);

  }


  memberFunc2 = () => console.log("memberFunc2 " + this.num);

}

Answer Question 1

staticFunc() is a static method, it can be called without instantiating the class. It can only access static members of the class. It can't access the instance members of the class.

memberFunc1() is a member function, it can be called after instantiating the class. It can access both static and instance members of the class.

memberFunc2()is an arrow function, it can be called after instantiating the class. It can access both static and instance members of the class. It is bound to the class instance.

Question 2

Assume you have a column in a database that stores the amount of money a user has. Please list viable options for the column type, explain the pros/cons of each, and specify which one you would use and why.

Answer Question 2

The following could be used: DECIMAL, NUMERIC, INTEGER, SMALLINT, BIGINT, MEDIUMINT, TINYINT

The DECIMAL and NUMERIC types store exact numeric data values. These types are used when it is important to preserve exact precision, for example with monetary data. In MySQL, NUMERIC is implemented as DECIMAL.

DECIMAL, NUMERIC, INTEGER, SMALLINT, BIGINT, MEDIUMINT and TINYINT has a required storage and range for each integer type so theye are not suitable to store monetary data.

Question 3

Assume you use the above money column in a Node.js codebase - how would you:
A) Perform math operations in the field?
B) Format the field for display?
C) Update the field in the database?

A. knex('accounts')
  .where('userid', '=', 15)
  .increment('balance', 10000)

  this will fetch the account value at position 15 and add 10000 to it

B. router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM account';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('account-list', { title: 'Account List', accountData: data});
  });
});

C.  let number = 70;
    knex('credit')
    .update({
        credit: knex.raw(`?? + ${number}`, ['credit'])
    })
    .then((result) => {
        console.log(result);
    });

  this will look for the table name credit and incerace the value by number
