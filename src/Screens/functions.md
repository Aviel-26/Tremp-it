 
 
 this func get the collection namd and one od the filed and bring it back.
 
 
 
 const querySnapshot = await getDocs(query(collection(store, 'userBio'), where('uid', '==', dayData.uid)));
      
      const userBio = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      
      setUserData(userBio);
      console.log(userBio);




 <div className ='continerSearch'>
            <form onSubmit={{}}>
                <div className='setSearch'>
                <label className='labelName' type="text">My location</label>
                <Select
                    className='seLectHome'
                    // id="seLectHome"
                    options={City}
                    onChange={handleLocationChange}
                    required
                />
                <label  className='labelName'  type="text">Destination</label>
                <Select
                className='seLectHome'
                    // id="seLectHome"
                    options={City}
                    onChange={handleDestinationChange}
                    required
                />

                <button type="submit" className="BTNsearch" > Search 🔎</button>
                </div>
            </form>