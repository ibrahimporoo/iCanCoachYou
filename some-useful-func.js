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
});


/* Getting User Location */
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onSuccess);
}

function onSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Egypt's coordinates
  const egyptNorth = 31.916667;
  const egyptSouth = 22.0;
  const egyptEast = 36.333333;
  const egyptWest = 25.0;

  // Saudi Arabia's coordinates
  const saudiNorth = 32.154284;
  const saudiSouth = 16.000001;
  const saudiEast = 55.666666;
  const saudiWest = 34.5;

  if (lat >= egyptSouth && lat <= egyptNorth && lon >= egyptWest && lon <= egyptEast) {
		userCountry = 'Egypt';
    console.log("User is in Egypt.");
  } else if (lat >= saudiSouth && lat <= saudiNorth && lon >= saudiWest && lon <= saudiEast) {
		userCountry = 'Saudi Arabia';
    console.log("User is in Saudi Arabia.");
  } else {
		userCountry = 'USD';
    console.log("User is in another country.");
  }
};