const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the Person model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

// Create a Person model based on the schema
const Person = mongoose.model('Person', personSchema);

// Create and save a new person
const newPerson = new Person({
  name: 'John',
  age: 25,
  favoriteFoods: ['Pizza', 'Burger']
});

// Save the new person and handle the result using promises
newPerson.save()
  .then(savedPerson => {
    const personId = savedPerson._id;
    console.log('New person saved with ID:', personId);
  })
  .catch(err => {
    console.error(err);
  });

  // Create multiple people using the create method
const arrayOfPeople = [
  { name: 'Alice', age: 30, favoriteFoods: ['Pasta', 'Salad'] },
  { name: 'Bob', age: 22, favoriteFoods: ['Sushi', 'Steak'] }
];

// Save multiple people and handle the result using promises
Person.create(arrayOfPeople)
  .then(savedPeople => {
    console.log('Multiple people saved:', savedPeople);
  })
  .catch(err => {
    console.error(err);
  });

  // Find people with the name 'John'
Person.find({ name: 'John' })
  .then(people => {
    console.log('People with name John:', people);
  })
  .catch(err => {
    console.error(err);
  });

  // Find one person who likes 'Pizza'
  Person.findOne({ favoriteFoods: 'Pizza' })
  .then(person => {
    console.log('Person who likes Pizza:', person);
  })
  .catch(err => {
    console.error(err);
  });
 
 // Assume personId is a valid ID obtained from previous operations
    const personId = '655b4b6a312f25b88068f24c'
  

  // Find a person by ID
  Person.findById(personId)
    .then(person => {
      console.log('Person by ID:', person);
    })
    .catch(err => {
      console.error(err);
    });
  
    // Update a person by pushing 'Hamburger' to their favoriteFoods
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
  
    // Update a person by name and set their age to 20
  const personName = 'Alice';
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
    .then(updatedPerson => {
      console.log('Updated Person by Name:', updatedPerson);
    })
    .catch(err => {
      console.error(err);
    });
  
    // Delete a person by ID
    Person.findByIdAndDelete(personId)
     .then(removedPerson => {
      console.log('Removed Person:', removedPerson);
     })
    .catch(err => {
       console.error(err);
     });
  
     // Delete all people with the name 'Mary'
     Person.deleteMany({ name: 'Mary' })
     .then(result => {
       console.log('Deleted Mary:', result);
     })
     .catch(err => {
       console.error(err);
    });
  
    // Find people who like 'Burritos', sort, limit, select, and execute the query
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
  
     // Start the server
    app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
  