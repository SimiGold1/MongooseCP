const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

const newPerson = new Person({
  name: 'John',
  age: 25,
  favoriteFoods: ['Pizza', 'Burger']
});

newPerson.save()
  .then(savedPerson => {
    const personId = savedPerson._id;
    console.log('New person saved with ID:', personId);
  })
  .catch(err => {
    console.error(err);
  });

const arrayOfPeople = [
  { name: 'Alice', age: 30, favoriteFoods: ['Pasta', 'Salad'] },
  { name: 'Bob', age: 22, favoriteFoods: ['Sushi', 'Steak'] }
];

Person.create(arrayOfPeople)
  .then(savedPeople => {
    console.log('Multiple people saved:', savedPeople);
  })
  .catch(err => {
    console.error(err);
  });

Person.find({ name: 'John' })
  .then(people => {
    console.log('People with name John:', people);
  })
  .catch(err => {
    console.error(err);
  });

  Person.findOne({ favoriteFoods: 'Pizza' })
  .then(person => {
    console.log('Person who likes Pizza:', person);
  })
  .catch(err => {
    console.error(err);
  });
 
 
    const personId = '655b4b6a312f25b88068f24c'
  // Assume personId is a valid ID obtained from previous operations
  Person.findById(personId)
    .then(person => {
      console.log('Person by ID:', person);
    })
    .catch(err => {
      console.error(err);
    });
  
  Person.findById(personId)
    .then(person => {
      person.favoriteFoods.push('Hamburger');
      return person.save();
    })
    .then(updatedPerson => {
      console.log('Updated Person:', updatedPerson);
    })
    .catch(err => {
      console.error(err);
    });
  
  const personName = 'Alice';
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
    .then(updatedPerson => {
      console.log('Updated Person by Name:', updatedPerson);
    })
    .catch(err => {
      console.error(err);
    });
  
    Person.findByIdAndDelete(personId)
     .then(removedPerson => {
      console.log('Removed Person:', removedPerson);
     })
    .catch(err => {
       console.error(err);
     });
  
     Person.deleteMany({ name: 'Mary' })
     .then(result => {
       console.log('Deleted Mary:', result);
     })
     .catch(err => {
       console.error(err);
    });
  
   Person.find({ favoriteFoods: 'Burritos' })
     .sort({ name: 1 })
     .limit(2)
     .select({ age: 0 })
     .exec()
     .then(burritoLovers => {
       console.log('Burrito Lovers:', burritoLovers);
     })
     .catch(err => {
       console.error(err);
     });
  
    app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
  