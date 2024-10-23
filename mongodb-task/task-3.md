# MongoDB Task 3

## 1. Update Email Host

-   Write a query to update the host of the email to `"webcodegenie.net"` in a single query.

```js
db.Mentor.updateMany(
    {},
    {
        $set: {
            email: {
                $replaceAll: {
                    input: "$email",
                    find: "@emap.com",
                    replacement: "webcodegenie.net",
                },
            },
        },
    }
);
```

## 2. Find Trainees by Gender or City and Grade

Write a query to find where the gender is male or the city is Chicago and the grade is above 8.

```js
db.Trainee.find({
    gender: "male",
    "address.city": "Chicago",
    grades: { $gte: 8 },
});
```

## 3. Update Training Array for Males

Write a query to update trainees where gender is male, age exists or dob exists. Update the training array of objects with the following:

```json
{ "session": "Socket.io", "score": 5 }
```

```js
db.Trainee.updateMany(
    {
        gender: "male",
        $or: [{ age: { $exists: true } }, { dob: { $exists: true } }],
    },
    { $push: { training: { $each: [{ session: "Socket.io", score: 5 }] } } }
);
```

## 4. Update Socket.io Score for Females or New York City

Write a query to update the Socket.io score to 7 where gender is female or city is New York.

```js
db.Trainee.updateMany(
    {
        $or: [{ gender: "female" }, { "address.city": "New York" }],
    },
    {
        $set: {
            "training.$[training].score": 7,
        },
    },
    {
        arrayFilters: [{ "training.session": "Socket.io" }],
    }
);
```

## 5. Get Trainee Count by Gender and Age

Write a query to get a list of trainee count according to gender and age.

```js
db.Trainee.aggregate([
    {
        $group: {
            _id: { gender: "$gender", age: "$age" },
            trainee: { $push: "$_id" },
        },
    },
    {
        $project: {
            _id: 0,
            gender: "$_id.gender",
            age: "$_id.age",
            traineeCount: { $size: "$trainee" },
        },
    },
]);
```

## 6. Update Trainee: Remove MongoDB Score and Mark Exam Completed

Write a query to update the trainee, remove the MongoDB score from training, and mark the exam as completed as false.

```js
db.Trainee.updateMany(
    {},
    {
        $set: { isExamCompleted: false },
        $pull: { training: { session: "MongoDB" } },
    }
);
```

## 7. Update Address Field to Location Details

Write a query to update the address field to "location_details", and add the address under "location_details", which will have the address, city, and state, using any random address.

```js
//Query 1:
db.Trainee.updateMany(
    {},
    {
        $rename: { address: "location_details" },
    }
);

//Query 2:
db.Trainee.updateMany(
    {},
    {
        $set: {
            "location_details.address":
                "C-904, Empire state building, Wall Street",
        },
    }
);
```
