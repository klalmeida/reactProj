import {
  createTuit, deleteTuit, findTuitById, 
  findAllTuits, updateTuit
} from "../services/tuits-service";

describe('createTuit', () => {
  // sample tuit to insert
  const tuit1 = {
    tid: "001",
    tuit: "this is test tuit #1",
    postedOn: "1/1/11",
    postedBy: "USER1"
  };

  // test setup
  beforeAll(() => {
    // clear any identical tuits
    return deleteTuit(tuit1.tid);
  })

  // test cleanup
  afterAll(() => {
    // remove any data we created
    return deleteTuit(tuit1.tid);
  })

  test('can create tuit with REST API', async () => {
    // insert new tuit to database
    const newTuit = await createTuit(tuit1);

    // verify inserted tuit's properties match parameter tuit
    expect(newTuit.tid).toEqual(tuit1.tid);
    expect(newTuit.tuit).toEqual(tuit1.tuit);
    expect(newTuit.postedBy).toEqual(tuit1.postedBy);
    expect(newTuit.postedOn).toEqual(tuit1.postedOn);
  });
});




describe('deleteTuit', () => {

  // sample tuit to delete
  const tuit2 = {
    tid: "002",
    tuit: "this is test tuit #2",
    postedOn: "2/2/22",
    postedBy: "USER2"
  };

  // test setup
  beforeAll(() => {
    // insert sample tuit
    return createTuit(tuit2);
  });

  //test cleanup
  afterAll(() => {
    // remove any data we created
    return deleteTuit(tuit2.tid);
  })
  
  test('can delete tuit wtih REST API', async () => {
  // delete a tuit by its tid assuming it exists
  const status = await deleteTuit(tuit2.tid);

  // verify deletion
  expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});




describe('findTuitById', () => {
  // sample tuit to be retrieved
  const tuit3 = {
    tid: "003",
    tuit: "this is test tuit 3",
    postedOn: "3/3/13",
    postedBy: "USER3"
  };

  // test setup 
  beforeAll(() => {
    // clear any identical tuits
    return deleteTuit(tuit3.tid);
  });

  // test cleanup
  afterAll(() => {
    // remove any data we created
    return deleteTuit(tuit3.tid);
  });

  test('can retrieve a tuit by their primary key with REST API', async () => {
  // insert new tuit into database
  const newTuit = await createTuit(user3);

  // verify new tuit matches parameter tuit
  expect(newTuit.tid).toEqual(tuit3.tid);
  expect(newTuit.tuit).toEqual(tuit3.tuit);
  expect(newTuit.postedBy).toEqual(tuit3.postedBy);
  expect(newTuit.postedOn).toEqual(tuit3.postedOn);

  // retrieve new tuit from the database by its PK
  const oldTuit = await findTuitById(newTuit._id);

  expect(oldTuit.tid).toEqual(tuit3.tid);
  expect(oldTuit.tuit).toEqual(tuit3.tuit);
  expect(oldTuit.postedBy).toEqual(tuit3.postedBy);
  expect(oldTuit.postedOn).toEqual(tuit3.postedOn);
  });
});




describe('findAllTuits', () => {

  const tuitz = [ "1", "2", "3"];

  // test setup
  beforeAll(() =>
    // sample tuits to insert
    tuitz.map(tid =>
      createTuit({
        tid,
        tuit: `test tuit number ${tid}`,
        postedOn: `${tid}/${tid}/22`,
        postedBy: `USER${tid}`
      })
    )
  );

  // test cleanup
  afterAll(() => 
    // delete inserted tuits
    tuitz.map(tid =>
      deleteTuit(tid)
    )
  );

  test('can retrieve all tuits with REST API', async () => {
    // retrieve all the tuits
    const tuits = await findAllTuits();

    // number of tuits should be 3
    expect(tuits.length).toBeGreaterThanOrEqual(tuitz.length);

    // check each inserted tuit
    const insertedTuits = tuits.filter(
      aTuit => tuitz.indexOf(aTuit.tid) >= 0
    );

    // compare added tuits to parameter tuits
    insertedTuits.forEach(aTuit => {
      const aTid = tuitz.find(aTid => aTid === aTuit.tid)
      expect(aTuit.tid).toEqual(aTid);
      expect(aTuit.tuit).toEqual(`test tuit number ${tid}`);
      expect(aTuit.postedOn).toEqual(`${tid}/${tid}/22`);
      expect(aTuit.postedBy).toEqual(`USER${tid}`);
    });
  });



  describe('updateTuit', () => {
    // original tuit and update target
    const tuit5 = {
      tid: "005",
      tuit: "this is test tuit #5",
      postedOn: "5/5/15",
      postedBy: "USER5"
    };

    const target = {
      tid: "005",
      tuit: "this is the updated tuit",
      postedOn: "5/5/15",
      postedBy: "USER5"
    }
  
    // test setup
    beforeAll(() => {
      // clear any identical tuits
      return deleteTuit(tuit5.tid);
    })
  
    // test cleanup
    afterAll(() => {
      // remove any data we created
      return deleteTuit(tuit5.tid);
    })
  
    test('can update tuit with REST API', async () => {
      // insert new tuit to database
      const newTuit = await createTuit(tuit5);
  
      // verify inserted tuit matches parameter tuit
      expect(newTuit.tid).toEqual(tuit5.tid);
      expect(newTuit.tuit).toEqual(tuit5.tuit);
      expect(newTuit.postedBy).toEqual(tuit5.postedBy);
      expect(newTuit.postedOn).toEqual(tuit5.postedOn);

      // update newTuit
      const updatedTuit = await updateTuit(newTuit.tid, "this is the updated tuit");

      // verify update matches target tuit
      expect(updatedTuit.tid).toEqual(target.tid);
      expect(updatedTuit.tuit).toEqual(target.tuit);
      expect(updatedTuit.postedBy).toEqual(target.postedBy);
      expect(updatedTuit.postedOn).toEqual(target.postedOn);
    });
  });
});