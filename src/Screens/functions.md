 
 
 this func get the collection namd and one od the filed and bring it back.
 
 
 
 const querySnapshot = await getDocs(query(collection(store, 'userBio'), where('uid', '==', dayData.uid)));
      
      const userBio = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      
      setUserData(userBio);
      console.log(userBio);
