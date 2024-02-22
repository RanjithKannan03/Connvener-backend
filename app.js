const Registration = require("./models/Registration");
const User = require("./models/User");
const PaymentDetail = require("./models/PaymentDetail");
const Paper=require("./models/Paper");

const express = require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const cors=require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin@psg-kriya-express.nupjb5g.mongodb.net/?retryWrites=true&w=majority")




app.get("/", async (req, res) => {
  try {
    const register = await Registration.find({});
    res.status(200).json(register);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/many", async (req, res) => {
  try {
    const register = await Registration.insertMany(req.body);
    res.status(200).json(register);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/events-from-user/:id", async (req, res) => {
  try {
    const register = await Registration.find({
      email: req.params.id,
    });
    res.status(200).json(register);
    if (!register) {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/users-from-event/:id", async (req, res) => {
  try {
    const register = await Registration.find({
      eventId: req.params.id,
    });

    const users = [];
    for (let i = 0; i < register.length; i++) {
      const user = await User.findOne({
        email: register[i].email,
      });
      users.push({
        name: user.name,
        email:user.email,
        kriyaId: user.kriyaId,
        college: user.college,
        dept: user.department,
        year: user.year,
        phone: user.phone,
        attendedAt:register[i].attendedAt
      });
    }
    res.status(200).json(users);
    if (!register) {
      res.status(404).json({ message: "Event ID not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const isCheck = await User.findOne({
      email: req.body.email,
    });
    const generalPaid = await PaymentDetail.findOne({
      email: req.body.email,
      kriyaId: { $ne: null },
      status: "SUCCESS",
      eventId: "-1",
    });
    if (!isCheck) return res.status(404).json({ message: "User not found!" });
    if (!generalPaid)
      return res.status(405).json({ message: "User has not paid!" });
    if (isCheck) {
      const register = await Registration.create(req.body);
      res.status(201).json(register);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const register = await Registration.findOneAndDelete({
      email: req.params.id,
    });
    if (!register) {
      res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(register);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const register = await Registration.findOneAndUpdate(
      {
        email: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(register);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/attend", async (req, res) => {
  try {
    const { eventId, kriyaId } = req.body;
    const user = await User.findOne({ kriyaId: `KRIYA${kriyaId}` });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const register = await Registration.findOneAndUpdate(
      {
        eventId: eventId,
        email: user.email,
      },
      {
        attended: true,
        attendedAt: new Date(),
      },
      { new: true }
    );
    if (!register) {
      const register = await Registration.create({
        eventId: eventId,
        email: user.email,
        attended: true,
        attendedAt: new Date(),
      });
      return res.status(200).json({ register, success: true });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/attend-false", async (req, res) => {
  try {
    const { eventId, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const register = await Registration.findOneAndUpdate(
      {
        eventId: eventId,
        email: user.email,
      },
      {
        attended: false,
        attendedAt: null,
      },
      { new: true }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/attendees/:id", async (req, res) => {
//   try {
//     const attendees = await Registration.aggregate([
//       {
//         $match: {
//           eventId: req.params.id,
//           attended: true,
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "email",
//           foreignField: "email",
//           as: "user",
//         },
//       },
//       {
//         $unwind: "$user",
//       },
//       {
//         $project: {
//           kriyaId: "$user.kriyaId",
//           name: "$user.name",
//         },
//       },
//       {
//         $sort: {
//           attendedAt: -1,
//         },
//       },
//     ]);
//     if (!attendees) {
//       res.status(404).json({ message: "Event not found!" });
//     }
//     return res.status(200).json(attendees);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }

let event=[]

try {
    const attendees = await Registration.find({ eventId: req.params.id, attended: true });
    for (const attendee of attendees) {
      const user = await User.findOne({ email: attendee.email });
      if (user) {
        event.push({
            kriyaId:user.kriyaId,
            name:user.name,
            email:user.name,
            phone:user.phone,
            attendedAt:attendee.attendedAt
        });
      }
    }
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }


});

app.get("/wsparticipants/:id",async(req,res)=>{

 try {
  const attendees = await PaymentDetail.find({ type: "WORKSHOP", eventId: req.params.id, status: "SUCCESS" });
  const ws = [];
  for (const attendee of attendees) {
    const user = await User.findOne({ email: attendee.email });
    if (user) {
      ws.push({
        kriyaId: user.kriyaId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        attendedAt: attendee.datetime
      });
    }
  }
  res.status(200).json(ws);
} catch (error) {
  console.log(error);
  res.status(500).json({ error: error.message });
}
})

app.get("/ppparticipants/:id",async(req,res)=>{

    try {
     const attendees = await Paper.find({paperId:req.params.id});
     const paper = [];
     for (const attendee of attendees) {
       const user = await User.findOne({ email: attendee.email });
       if (user) {
         paper.push({
           kriyaId: user.kriyaId,
           name: user.name,
           email: user.email,
           phone: user.phone,
           attendedAt:" "
         });
       }
     }
     res.status(200).json(paper);
   } catch (error) {
     console.log(error);
     res.status(500).json({ error: error.message });
   }
   })

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  
