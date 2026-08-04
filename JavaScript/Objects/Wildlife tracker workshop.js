const tiger = {
  species: "Tiger",
  age: 5,
  isEndangered: true
};

const elephant = {
  species: "Elephant",
  age: 10,
  isEndangered: true
};

const getSpecies = (animal) => {
  return animal.species;
}; //returns species of animal

console.log(getSpecies(tiger));

const getAge = (animal) => {
  return animal.age;
};// returns age of animal

console.log(getAge(tiger));

const addHabitat = (animal, habitat) => {
  animal.habitat = habitat;
  return animal;
}; //adds new property (habitat) and defines it with the habitat parameter. 

console.log(addHabitat(tiger, "Rainforest"));

const updateAge = (animal, newAge) => {
  animal.age = newAge;
  return animal;
}; //changes the value of the age parameter in the specified object

console.log(updateAge(elephant, 12));

const removeEndangeredStatus = (animal) => {
  delete animal.isEndangered;
  return animal;
};//removes the isEndangered property from specified object

console.log(removeEndangeredStatus(tiger));

const hasHabitat = (animal) => {
  return animal.hasOwnProperty("habitat");
}; //checks whether the habitat property is in an object. 

console.log(hasHabitat(tiger));
console.log(hasHabitat(elephant));

