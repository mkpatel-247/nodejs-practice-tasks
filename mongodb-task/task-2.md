# MongoDB Task 2 Queries for Trainee Database

## 1. Find or Create Trainee

Find the document where the name of the trainee is Suchit. If it does not exist, create a new record. If found, update grades by 5.

```js
db.Trainee.updateOne(
    { name: "Suchit" },
    {
        $inc: { grades: 5 }, // This increments by 5
        $set: {
            age: 30.0,
            gender: "male",
            dob: "unknown",
            college: "ABC University",
            enrollment: "unknown",
            isExamCompleted: true,
            mentor: "unknown",
            address: {
                city: "unknown",
                state: "unknown",
            },
        },
    },
    { upsert: true }
);
```

## 2. Update All Trainees' Training Records

Update all trainees to have the following training sessions.

```js
db.Trainee.updateMany(
    {},
    {
        $set: {
            training: [
                { session: "MongoDB", score: 9 },
                { session: "NodeJS", score: 7 },
                { session: "ExpressJS", score: 10 },
            ],
        },
    }
);
```

## 3. Update Scores for Specific Trainees

Update all trainees' scores with -2 where the session is ExpressJS and the trainee's name starts with A.

```js
db.Trainee.updateMany(
    { name: /^A/, "training.session": "ExpressJS" },
    { $inc: { "training.$[training].score": -2 } },
    { arrayFilters: [{ "training.session": "ExpressJS" }] }
);
```

## 4. List Trainees with Mentor and Scores

Get a list of all trainees with the following fields:

-   Trainee Name
-   Mentor Name
-   Score (in Object format: NodeJS, MongoDB, ExpressJS)

```js
db.Trainee.aggregate([
    {
        $lookup: {
            from: "Mentor",
            localField: "mentor",
            foreignField: "_id",
            as: "mentor_info",
        },
    },
    {
        $unwind: "$mentor_info",
    },
    {
        $project: {
            name: 1,
            mentor: "$mentor_info.name",
            score: {
                NodeJS: {
                    $arrayElemAt: [
                        "$training.score",
                        { $indexOfArray: ["$training.session", "NodeJS"] },
                    ],
                },
                MongoDB: {
                    $arrayElemAt: [
                        "$training.score",
                        { $indexOfArray: ["$training.session", "MongoDB"] },
                    ],
                },
                ExpressJS: {
                    $arrayElemAt: [
                        "$training.score",
                        { $indexOfArray: ["$training.session", "ExpressJS"] },
                    ],
                },
            },
        },
    },
]);
```

## 5. Trainees with Specific Mentors

List of trainees whose mentor is Sarah or Michael.

```js
db.Trainee.aggregate([
    {
        $match: {
            $or: [
                { mentor: ObjectId("60a0c4e49a0d095aac8e6203") },
                { mentor: ObjectId("60a0c5389a0d095aac8e6206") },
            ],
        },
    },
]);

OR;

db.Trainee.aggregate([
    {
        $lookup: {
            from: "Mentor",
            localField: "mentor",
            foreignField: "_id",
            as: "mentor_info",
        },
    },
    {
        $match: {
            $or: [
                { "mentor_info.name": "Michael Johnson" },
                { "mentor_info.name": "Sarah Wilson" },
            ],
        },
    },
]);
```

## 6. Mentors with a Single Trainee

Get a list of mentors with one single trainee sorted descending by name.

```js
db.Mentor.aggregate([
    {
        $lookup: {
            from: "Trainee",
            localField: "_id",
            foreignField: "mentor",
            as: "trainee_info",
        },
    },
    {
        $match: { trainee_info: { $size: 1 } },
    },
    {
        $sort: { name: -1 },
    },
]);
```

## 7. Unique Designations with Mentor Array

List of unique designations with a mentor array having the same designation.

## 8. Mentors with Trainee Details

Get a list of mentors with trainee, returning the following fields:

-   Name with Designation (single field)
-   Email Host (split email from @)

## 9. Unique Cities, States, and Colleges

Get a list of unique cities, states, and colleges in a single document.

## 10. Update Address Fields

Delete field "dob" where age is > 22, and add field "zipcode" under address with value 1234.

## 11. Add Hobbies Array

Add a hobbies array to all the trainees:

-   ["Cricket", "Watching Movies", "Bike Riding", "Football"]

## 12. Add More Hobbies

Add the following array values to the hobbies array:

-   ["Cars & Bike", "Cooking", "Hiking", "Travelling", "Vlogging"]

## 13. List Trainee Groups by Mentor

List of trainee groups by mentor, creating an array of trainee names.

## 14. Cities with Number of Trainees

List of cities with the number of trainees living in them.

## 15. Sum of Grades by Gender

The sum of grades of gender male and female.
