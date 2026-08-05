let normalizeUnits = (manifest) => {
  let copy = { ...manifest}
  if (copy.unit === "lb") {
    copy.unit = "kg";
    copy.weight *= 0.45;
  }
  return copy
} //sets the weight to be kg and converts if if the unit property is lb

let validateManifest = (manifest) => {
  let  blank = {}
  const normalised = normalizeUnits(manifest)

  if (
    manifest.containerId === undefined) {
    blank.containerId = "Missing"
  } else if 
  (
    typeof(manifest.containerId) !== "number" ||
    Number.isInteger(manifest.containerId) === false ||
    manifest.containerId <= 0 ||
    manifest.containerId === null ||
    manifest.containerId === NaN
  )
  {blank.containerId = "Invalid"}

  if (manifest.destination === undefined || manifest.destination === null) {
    blank.destination = "Missing"
  } else if
  (
    typeof(manifest.destination) !== "string" ||
    manifest.destination.trim() === ''
  )
    {blank.destination = "Invalid"}

  if (manifest.weight === undefined || manifest.weight === null) {
    blank.weight = "Missing";}
    else if 
    (
      manifest.weight < 1 ||
      typeof(manifest.weight) !== "number" ||
      isNaN(manifest.weight) === true
    ) 
    {blank.weight = "Invalid"}  

  if (manifest.unit === undefined || manifest.unit === null) {
    blank.unit = "Missing"
    } else if 
    (
      normalised.unit !== "kg"
    ) 
    {blank.unit = "Invalid"}

  if (manifest.hazmat === undefined || manifest.hazmat === null) {
    blank.hazmat = "Missing"
  } else if 
  (
    typeof(manifest.hazmat) !== "boolean"
  )
  {blank.hazmat = "Invalid"}
  
  return blank

}


let processManifest = (manifest) => {
  
  let result = normalizeUnits(manifest)
  let validation = validateManifest(manifest)

  if (
      Object.keys(validation).length === 0
  )
    {
    console.log(`Validation success: ${manifest.containerId}`)
    console.log(`Total weight: ${result.weight} kg`)
  } 
  else 
  {
    console.log(`Validation error: ${manifest.containerId}`)
    console.log(validation)
  }

}




/*
  
  Build a Cargo Manifest Validator
In this lab, you will use JavaScript to normalize and validate cargo manifests. A cargo manifest is a document that typically lists goods being transported (for example, by ship or train) and includes details about those goods.

Each cargo manifest will be represented as an object with the following properties:

containerId: a positive integer identifying the associated cargo container.
destination: a non-empty string (after trimming whitespace) denoting the cargo's target destination.
weight: a positive number representing the cargo's weight.
unit: a string describing the units for the cargo's weight property (either "kg" for kilograms or "lb" for pounds).
hazmat: a boolean value indicating whether hazardous material handling is needed.
Example cargo manifest object:

{
  containerId: 1,
  destination: "Monterey, California, USA",
  weight: 831,
  unit: "lb",
  hazmat: false
}
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should implement a function named normalizeUnits with a manifest parameter.

The function must not mutate the original manifest object and must always return a new object where weight is normalized to kilograms and unit is set to "kg".
If the weight of the manifest object is expressed in pounds (unit: "lb"), the function should convert the weight to kilograms using the approximate conversion, 1 lb = 0.45 kg, and update the unit accordingly.
If the weight is already expressed in kilograms (unit: "kg"), the weight and unit should remain unchanged.
You should implement a function named validateManifest with a manifest parameter.

The function must not mutate the original manifest object and must always return a new object.
If the input manifest is valid (no missing or invalid properties), the function should return an empty object.
If the input manifest is not valid, the function should return an object containing entries for each missing or invalid property. Missing properties should have the value "Missing" and invalid properties should have the value "Invalid".
Example return value where the input object is missing the destination property and has an invalid weight property:

{
  destination: "Missing",
  weight: "Invalid"
}
You should implement a function named processManifest with a manifest parameter. The function should log:

If the manifest object is valid, Validation success: ${containerId} and then the manifest's weight in kilograms as such, Total weight: ${weight} kg. Use normalizeUnits() for this conversion.
If the manifest object is not valid, Validation error: ${containerId} and then the object returned by calling validateManifest() with the manifest object.
Note: each of these two cases should have two console.log() calls.

Note: Neither normalizeUnits, validateManifest, nor processManifest should be declared using const, since the tests need to reassign them.


  
  Tests:
Passed:1. Neither normalizeUnits, validateManifest, nor processManifest should be declared using const, since the tests need to reassign them.
Passed:2. You should have a function named normalizeUnits with a manifest parameter.
Passed:3. Calling normalizeUnits() with { containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true } should return the new object { containerId: 68, destination: "Salinas", weight: 45.45, unit: "kg", hazmat: true } without mutating the source input.
Passed:4. Your normalizeUnits function should return a copy of the input manifest object with its weight normalized to kilograms and its unit set to "kg". Use the approximate conversion 1 lb = 0.45 kg for the weight conversion.
Passed:5. Your normalizeUnits function should return a new copy of the input manifest object without mutating the original.
Passed:6. You should have a function named validateManifest with a manifest parameter.
Passed:7. Calling validateManifest() with { containerId: 1, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false } should return the new object {}.
Passed:8. If the input manifest object is valid, your validateManifest function should return an empty object {}.
Passed:9. Calling validateManifest() with {} should return the new object { containerId: "Missing", destination: "Missing", weight: "Missing", unit: "Missing", hazmat: "Missing" } without mutating the source input.
Passed:10. Calling validateManifest() with { containerId: null, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false } should return the new object { containerId: "Invalid" } without mutating the source input.
Passed:11. Calling validateManifest() with { containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" } should return the new object { containerId: "Invalid", destination: "Invalid", weight: "Invalid", unit: "Invalid", hazmat: "Invalid" } without mutating the source input.
Passed:12. Calling validateManifest() with { containerId: -2 } should return the new object { containerId: "Invalid", destination: "Missing", weight: "Missing", unit: "Missing", hazmat: "Missing" } without mutating the source input.
Passed:13. Calling validateManifest() with { containerId: 3.50 } should return the new object { containerId: "Invalid", destination: "Missing", weight: "Missing", unit: "Missing", hazmat: "Missing" } without mutating the source input. You can use Number.isInteger() to validate integer values.
Passed:14. Calling validateManifest() with { destination: "  " } should return the new object { containerId: "Missing", destination: "Invalid", weight: "Missing", unit: "Missing", hazmat: "Missing" } without mutating the source input. You can use String.trim() to remove whitespace from a string.
Passed:15. Calling validateManifest() with { weight: NaN } should return the new object { containerId: "Missing", destination: "Missing", weight: "Invalid", unit: "Missing", hazmat: "Missing" } without mutating the source input. You can use Number.isNaN() to validate NaN values.
Passed:16. If the input manifest object is not valid, your validateManifest function should return an object describing missing and/or invalid properties.
Passed:17. Your validateManifest function should return a new object without mutating the original.
Passed:18. You should have a function named processManifest with a manifest parameter.
Passed:19. Calling processManifest() with { containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false } should first log "Validation success: 55" and then log "Total weight: 180 kg".
Passed:20. If the input manifest object is valid, your processManifest function should first log the success message, Validation success: ${containerId}.
Passed:21. If the input manifest object is valid, your processManifest function should normalize it to kilograms using normalizeUnits() and then log: Total weight: ${weight} kg.
Passed:22. If the input manifest object is valid, your processManifest function should log a success message with the object's containerId, and then log the object's weight in kilograms. You should use normalizeUnits() for the conversion and have two console.log() calls.
Passed:23. Calling processManifest() with { containerId: -88, destination: "Soledad", weight: NaN } should first log Validation error: -88 and then log the object { containerId: "Invalid", weight: "Invalid", unit: "Missing", hazmat: "Missing" }.
Passed:24. Calling processManifest() with { destination: "Watsonville", hazmat: true } should first log Validation error: undefined and then log the object { containerId: "Missing", weight: "Missing", unit: "Missing" }.
Passed:25. If the input manifest object is not valid, your processManifest function should first log the error message, Validation error: ${containerId}.
Passed:26. If the input manifest object is not valid, your processManifest function should also log the object returned by calling validateManifest() with the original manifest object. Call console.log() directly with the returned object.
Passed:27. If the input manifest object is not valid, your processManifest function should log an error message with the object's containerId, and then log the object returned by calling validateManifest() with the input object. This should involve two console.log() calls.
*/
