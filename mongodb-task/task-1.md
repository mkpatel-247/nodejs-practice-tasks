# MongoDB Task 1

### Check Running Docker Container:

```bash
docker ps
```

### Start Docker Container and Mongosh:

```bash
docker exec -it <container_id> bash
```

### Shell Connection and Authentication

```bash
mongosh
use admin
db.auth("<user_name>", "<password>")
```

### Create Database and Create Database User

```bash
use mydatabase
db.createUser({ user: "<user_name>", pwd: "<password>", roles: ["readWrite", "dbAdmin"] })
```

## CRUD Operations

### Create Documents:

-   Create 2 collections with documents, and use the provided fields.
    ```bash
    db.Trainee.insertMany([{}, {}, ...])
    db.Mentor.insertMany([{}, {}, ...])
    ```

### Read Documents:

1. **Get all the trainees with names starting with “a”**, listing name, college, and enrollment:

    ```javascript
    db.Trainee.aggregate([
        {
            $match: { name: /^a|^A/ }, // Corrected the regex
        },
        {
            $project: {
                name: 1,
                college: 1,
                enrollment: 1,
            },
        },
    ]);
    ```

2. **Get all the mentors with the designation “Project Lead”**, listing names and email:

    ```javascript
    db.Mentor.aggregate([
        {
            $match: { designation: "Project Lead" },
        },
        {
            $project: {
                name: 1,
                email: 1,
            },
        },
    ]);
    ```

3. **Get a single trainee with the 2nd highest grade**:

    ```javascript
    db.Trainee.find().sort({ grades: -1 }).limit(1).skip(1);

    // OR

    db.getCollection("Trainee").aggregate([
        {
            $sort: { grades: -1 },
        },
        {
            $skip: 1,
        },
        {
            $limit: 1,
        },
    ]);
    ```

4. **Get mentors with the designation Project Lead or Developer**, listing the 3rd and 4th mentors from the matches:

    ```javascript
    db.Mentor.find({
        $or: [{ designation: "Project Lead" }, { designation: "Developer" }],
    })
        .skip(2)
        .limit(2);
    ```

5. **Get trainees who have exams completed and grades above 7.2**, counting only:

    ```javascript
    db.Trainee.aggregate([
        {
            $match: { isExamCompleted: true, grades: { $gte: 7.2 } },
        },
        { $count: "TotalCount" },
    ]);
    ```

6. **Get trainees with the city name “Boston”**, listing name and city only:

    ```javascript
    db.Trainee.aggregate([
        {
            $match: { "address.city": "Boston" },
        },
        {
            $project: {
                name: 1,
                "address.city": 1,
            },
        },
    ]);
    ```

7. **Get 5 documents starting from the 4th document**, ordered by city name, returning name, gender, and city:
    ```javascript
    db.Trainee.aggregate([
        {
            $skip: 4,
        },
        {
            $limit: 5,
        },
        {
            $sort: { "address.city": 1 },
        },
        {
            $project: {
                name: 1,
                gender: 1,
                "address.city": 1,
            },
        },
    ]);
    ```

### Update Documents:

1. **Trainees from Los Angeles or Houston**, update city to Ahmedabad:

    ```javascript
    db.Trainee.updateMany(
        {
            $or: [
                { "address.city": "Houston" },
                { "address.city": "Los Angeles" },
            ],
        },
        {
            $set: { "address.city": "Ahmedabad" },
        }
    );
    ```

2. **Update grades from 8.5 to 9.5 for all trainees**:

    ```javascript
    db.Trainee.updateMany({ grades: 8.5 }, { $set: { grades: 9.5 } });
    ```

3. **Increase age by 2 years for each trainee**:

    ```javascript
    db.Trainee.updateMany({}, { $inc: { age: 2 } });
    ```

4. **Update mentor with email “michael.johnson@example.com”**, setting designation to Team Lead, creating if not exists:

    ```javascript
    db.Mentor.updateOne(
        { email: "michael.johnson@example.com" },
        { $set: { designation: "Team Lead" } },
        { upsert: true }
    );
    ```

5. **Trainees who have mentor “Emily W”**, update the exam to completed:
    ```javascript
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
            $match: { "mentor_info.name": "Emily W" },
        },
        {
            $set: { isExamCompleted: true },
        },
        {
            $merge: {
                into: "Trainee",
                whenMatched: "replace",
                whenNotMatched: "discard",
            },
        },
    ]);
    ```

### Delete Documents:

1. **Delete the trainee whose mentor is "John Doe"**:

    ```javascript
    db.Trainee.deleteMany({ mentor: ObjectId("60a0c47f9a0d095aac8e6201") });
    ```

2. **Delete the trainee with the name “Jane Smith”**:

    ```javascript
    db.Trainee.deleteOne({ name: "Jane Smith" });
    ```

3. **Delete all mentors**:

    ```javascript
    db.Mentor.remove();
    ```

4. **Delete all trainees**:
    ```javascript
    db.Trainee.remove();
    ```

```

### Notes:
- Ensure that any placeholders (like `<container_id>`, `<user_name>`, etc.) are filled with actual values when executing.
- Check the quotes in the MongoDB queries, especially for string literals, to ensure they are standard double quotes (") rather than smart quotes (“”).
```
