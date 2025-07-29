// //to show all databases command:- show databases OR show dbs.

// //to create database:- "use" (database-name) but if no data is written in database it will be considered non existent
// // "use" is used to create a new database and if database already exist then we can simply use it using "use"

// //to create collection(table) :- db.createCollection("student_Data") - data will be in json format

// // db:-always point to current selected database that is Allenhose25_A_DB
// //Insert new document(row) :-db.collectionName like-db.student_Data.insertOne()

// db.student_Data.insertOne({
//   stuName: "sonal",
//   stuAge: 20,
//   stuEmail: "demo@gmail.com",
//   stuCGPA: 8.5,
// });

// // to select data from collection - db.student_Data.find()
// db.student_Data.find();

// //to insert more than one document -

// db.student_Data.insertMany([
//   {
//     stuName: "abc",
//     stuAge: 21,
//     stuEmail: "example@gmail.com",
//     stuCGPA: 7,
//     stuStream: "AIML",
//     stuLang: ["C", "Python", "JAVA"],
//   },
//   {
//     stuName: "pqr",
//     stuAge: 23,
//     stuEmail: "pq@gmail.com",
//     stuCGPA: 7.8,
//     stuStream: "AIML",
//     stuGender: "Male",
//     stuLang: ["C", "C++", "JAVA"],
//   },
//   {
//     stuName: "Rahul",
//     stuAge: 20,
//     stuEmail: "a@gmail.com",
//     stuCGPA: 7.2,
//     stuStream: "ME",
//     stuGender: "Male",
//     stuLang: ["C", "Matlab"],
//     stuLocAdd: {
//       HouseNo: 112,
//       City: "Kanpur",
//       PinCode: 208007,
//     },
//   },
// ]);

// //find(condition,projection)

// // projection-how many field value you want per document

// db.student_Data.find({}, { stuName: 1, stuEmail: 1 }); //projection
// db.student_Data.find({}, { stuName: 1, stuEmail: 1, stuAge: 0 }); //aise likhenge toh error beacuse hum bta rhe hai 1 likh ke me iss filed ko include kro toh baki ko toh wo wese bhi hatadega uske liye alag se 0 likhne ki jarurat nhi hai likhenge toh error aa jayegi.

// // 1-- True
// // 0-- False

// db.student_Data.find({}, { "stuLocAdd.HouseNo": 1 }); //nested field name

// db.users.insertOne({
//   _id: 1,
//   name: "xyz",
//   hobbies: ["swimming", "dancing", "reading"],
//   score: [78, 80, 29],
//   items: [
//     { name: "smart watch", price: 599 },
//     { name: "ear buds", price: 399 },
//   ],
// });
// id
// // _id is a mongodb collection.
//  in mongo db every document inside a collection has a unique filed called id which serves as the primary key.
// this field is automatically created by mongodb if not explicitly provided by the users.

//how id is generated

// if we dont provide id mongodb creates an object id which is 12 byte uniue identifier consisting of:
// 4 bytes- timestamp
// 5 bytes - random Number
// 3 bytes - incrementing counter

db.student_Data.find({
  stuName: { $eq: "sonal" },
});

db.student_Data.find({
  stuCGPA: { $: 7.5 },
});

db.student_Data.find({
  stuName: { $in: ["sonal", "virat", "john"] },
});

db.student_Data.find({
  $and: [{ stuName: { $eq: "sonal" } }, { stuCGPA: { $gte: 8.5 } }],
});
db.student_Data.find({
  $or: [
    { stuName: { $eq: "sonal" } },
    { stuCGPA: { $gte: 8.5 } },
    { stuAge: { $gte: 20 } },
  ],
});

db.student_Data.find({
  $and: [
    { stuName: { $eq: "sonal" } },
    { stuEmail: { $not: { $eq: "demo@gmail.com" } } },
  ],
});

db.student_Data.find({
  stuLocAdd: { $exists: true },
});

db.student_Data.find({
  stuName: { $type: "string" },
});

db.student_Data.find({
  stuCGPA: { $exists: true },
  stuCGPA: { $type: "double" },
  stuCGPA: { $gte: 8.5 },
});

db.student_Data.find({
  $and: [
    { stuAge: { $exists: true } },
    { stuName: { $type: "string" } },
    { stuName: { $eq: "sonal" } },
  ],
});

db.DatesDemo.insertMany([
  {
    _id: 1001,
    info: "date by using Date() ",
    DOJ: Date(),
  },
]);

db.DatesDemo.insertMany([
  {
    _id: 1002,
    info: "date by using new Date() ",
    DOJ: new Date(),
  },
]);

db.DatesDemo.insertMany([
  {
    _id: 1003,
    info: "date by using ISO Date() ",
    DOJ: new ISODate(),
  },
]);

db.DatesDemo.find({
  DOJ: { $type: "date" },
});
db.DatesDemo.find({
  DOJ: { $type: "string" },
});
db.DatesDemo.insertMany([
  {
    _id: 1004,
    info: "date by using  Date() ",
    DOB: new Date("2003-11-04"),
  },
]);

db.DatesDemo.find(
  { DOJ: { $type: "date" } },
  {
    Date_Of_Join: {
      $dateToString: {
        date: "$DOJ",
        format: "%d-%B-%Y %H:%M:%S",
        timezone: "Asia/Kolkata",
      },
    },
  }
);

db.student_Data.updateOne(
  { stuName: { $eq: "robin" } },
  {
    $unset: { stuStream: "" },
  }
);
//upsert:true new record ko add ke deta hai jese phle data mai robin nhi tha upsert ka use krke add ke diya

db.student_Data.updateMany(
  { stuName: { $in: ["sonal", "rahul", "xyz"] } },
  { $set: { stuStream: "EC" } }
);

db.student_Data.updateOne(
  { stuName: "Rahul" },
  {
    $rename: { stuStream: "stuTrade" },
  }
);

db.student_Data.deleteOne({
  stuName: { $eq: "robin" },
});

db.student_Data.updateMany(
  { stuName: { $in: ["sonal", "rahul"] } },
  { $set: { "about us": "I am a developer" } }
);

db.student_Data.find({ "about us": /deve/ });

db.student_Data.find({ stuName: /^s/i });

db.student_Data.find({ "about us": /deve$/i });

db.student_Data.find({
  stuName: /^.{1}a/i,
});

db.student_Data.find({ stuName: /a.{1}$/i });

db.student_Data.updateOne({ stuName: "abc" }, { $push: { stuLang: "parcel" } });
db.student_Data.updateOne(
  { stuName: "pqr" },
  { $addToSet: { stuLang: "react" } }
);

db.student_Data.updateOne({ stuName: "pqr" }, { $pull: { stuLang: "c++" } });

db.student_Data.find({ stuLang: "JAVA" });

db.student_Data.find({ stuLang: { $all: ["C", "Python"] } });

db.student_Data.find({ stuLang: { $elemMatch: { $eq: "parcel" } } });

db.student_Data.updateOne(
  { stuName: "Rahul", stuLang: "C++" },
  { $set: { "stuLang.$": "C Plus Plus" } }
);

db.student_Data.find().limit(2);

db.student_Data.find().skip(2);

db.student_Data.find().sort({ stuCGPA: 1 }); //1 means ascending order mao sort and -1 means decending order mai sorting

//ques:- find the student who have third highest marks
db.student_Data.find().sort({ stuCGPA: -1 }).skip(2).limit(1);

db.employees.insertMany([
  {
    _id: 1,
    firstName: "John",
    lastName: "King",
    gender: "male",
    email: "john.king@abc.com",
    salary: 5000,
    department: {
      name: "HR",
    },
  },
  {
    _id: 2,
    firstName: "Sachin",
    lastName: "Tendulkar",
    gender: "male",
    email: "sachin.t@abc.com",
    salary: 8000,
    department: {
      name: "Finance",
    },
  },
  {
    _id: 3,
    firstName: "Virat",
    lastName: "kohli",
    gender: "male",
    email: "kohli@abc.com",
    salary: 7500,
    department: {
      name: "Marketing",
    },
  },
  {
    _id: 4,
    firstName: "Rohini",
    lastName: "Sharma",
    gender: "female",
    email: "roh@abc.com",
    salary: 5000,
    department: {
      name: "HR",
    },
  },
  {
    _id: 5,
    firstName: "Kapil",
    lastName: "Dev",
    gender: "male",
    email: "kapil.d@abc.com",
    salary: 4500,
    department: {
      name: "Finance",
    },
  },
  {
    _id: 6,
    firstName: "Amit",
    lastName: "B",
    gender: "male",
    email: "amit.b@abc.com",
    salary: 7000,
    department: {
      name: "Marketing",
    },
  },
  {
    _id: 7,
    firstName: "Atul",
    lastName: "Gupta",
    gender: "male",
    email: "amitgupta@abc.com",
    salary: 7000,
    department: {
      name: "Technical",
    },
  },
  {
    _id: 8,
    firstName: "Tanisha",
    lastName: "Chauhan",
    gender: "female",
    email: "tanisha@abc.com",
    salary: 6500,
    department: {
      name: "Marketing",
    },
  },
]);

db.employees.aggregate([
  {
    $project: { firstName: 1, lastName: 1 },
  },
]);

db.employees.aggregate([
  { $project: { firstName: 1, lastName: 1, gender: 1 } },
  { $match: { gender: "female" } },
]);

db.employees.aggregate([{ $group: { _id: "$department.name" } }]);

db.employees.aggregate([
  { $group: { _id: "$department.name", TotalEmployees: { $sum: 1 } } },
]);

db.employees.aggregate([
  {
    $group: {
      _id: "$department.name",
      TotalEmployees: { $sum: 1 },
      TotalSalary: { $sum: "$salary" },
      AverageSalary: { $avg: "$salary" },                        //sort, limit
      MaximumSalary: { $max: "$salary" },
    },
  },
]);


db.employees.aggregate([{$sample:{size:2}}])

//sort by count => (group,count,sort)

db.employees.aggregate([{$sortByCount:'$department.name'}])


db.student_Data.aggregate([{$unwind:'$stuLang'},{$group:{_id:'$stuLang',TotalStudents:{$sum:1}}}])

// mongorestore --db BatchA C:\Allenhouse25_A_DB