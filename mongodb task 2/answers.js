//collections name

// users
// codekata
// attendance
// topics
// tasks
// company_drives
// mentors

//Question and answers:

// 1. Find all the topics and tasks which are thought in the month of October?
db.topics.aggregate([
   {
     '$match': {
       'month': 'Oct'
     }
   }, {
     '$lookup': {
       'from': 'tasks',
       'localField': 'month',
       'foreignField': 'month',
       'as': 'task and topics in Oct'
     }
   }
 ])

// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020?
db.company_drives.find({Date:{$gte:ISODate("2020-10-15"),$lte:ISODate("2020-10-31")}});

// 3. Find all the company drives and students who are appeared for the placement?
db.users.aggregate([
   {
         '$match': {
           'placement': true
         }
       }, {
         '$lookup': {
           'from': 'company_drives',
           'localField': 'user_id',
           'foreignField': 'Attended_user_id',
           'as': 'Result'
         }
       }
     ]);

// 4. Find the number of problems solved by the user in codekata?
db.users.aggregate([
   {
     '$lookup': {
       'from': 'codekata',
       'localField': 'user_id',
       'foreignField': 'user_id',
       'as': 'result'
     }
   }, {
     '$match': {
       'codekataProblemsSolved': {
         '$ne': 0
       }
     }
   }
 ]);

// 5. Find all the mentors with who has the mentee's count more than 15?
db.mentors.find({menteeCount: {$gt:15}});

// 6. Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020?
db.users.aggregate([
   {
     '$lookup': {
       'from': 'tasks',
       'localField': 'user_id',
       'foreignField': 'user_id',
       'as': 'not submitted'
     }
   }, {
     '$match': {
       'attendance_id': 2,
       'taskSubmission': false
     }
   }
 ]);
