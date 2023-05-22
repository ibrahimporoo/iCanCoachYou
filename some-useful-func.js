/* To Convert the Data Type's specific key in a doc */
// Define the key to update and its new data type
const keyToUpdate = 'order';
const newDataType = 'number';

// Get all documents in the collection
getDocs(collectionRef)
  .then((querySnapshot) => {
    // Iterate through each document in the collection
    querySnapshot.forEach((doc) => {
      // Get the current value of the key
      const currentValue = doc.data()[keyToUpdate];

      // Check if the current value is not already of the new data type
      if (typeof currentValue !== newDataType) {
        // Create an object with the updated key/value pair
        const updateData = { [keyToUpdate]: Number(currentValue) };

        // Update the document with the new key/value pair
        updateDoc(doc(collectionRef, doc.id), updateData)
          .then(() => {
            console.log(`Document ${doc.id} updated successfully`);
          })
          .catch((error) => {
            console.log(`Error updating document ${doc.id}: ${error}`);
          });
      }
    });
  })
  .catch((error) => {
    console.log(`Error getting documents: ${error}`);
  });

/* To Add a key if not exist in a doc */
// Get all documents in the collection
getDocs(collectionRef)
.then((querySnapshot) => {
  // Iterate through each document in the collection
  querySnapshot.forEach((docSnapshot) => {
    // Check if the document already has an 'order' key
    if (!docSnapshot.data().order) {
      // If the 'order' key doesn't exist, add it with a value of 0
      const updateData = { order: num };
      num++;
      // Update the document with the new key/value pair
      updateDoc(doc(collectionRef, docSnapshot.id), updateData)
        .then(() => {
          console.log(`Document ${docSnapshot.id} updated successfully`);
        })
        .catch((error) => {
          console.log(`Error updating document ${docSnapshot.id}: ${error}`);
        });
    }
  });
})