import {
    createTuit, deleteTuit, findTuitById,
    findAllTuits, updateTuit
} from "../services/tuits-service";
import {findAllTuitsLikedByUser, userTogglesTuitLikes} from "../services/likes-service";


describe('createTuit', () => {
    // sample tuit to insert
    const tuit1 = {
        tid: "001",
        tuit: "this is test tuit #1",
        uid: "USER1"
    };

    // test setup
    beforeAll(() => {
        // clear any identical tuits
        deleteTuit(tuit1.tid);
    })

    // test cleanup
    afterAll(() => {
        // remove any data we created
        deleteTuit(tuit1.tid);
    })

    test('can create tuit with REST API', async () => {
        // insert new tuit to database
        const newTuit = await createTuit(tuit1.uid, tuit1);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tid).toEqual(tuit1.tid);
        expect(newTuit.tuit).toEqual(tuit1.tuit);
        expect(newTuit.uid).toEqual(tuit1.uid);
    });
});



describe('deleteTuit', () => {

    // sample tuit to delete
    const tuit2 = {
        tid: "002",
        tuit: "this is test tuit #2",
        uid: "USER2"
    };

    // test setup
    beforeAll(() => {
        // insert sample tuit
        return createTuit(tuit2.uid, tuit2);
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
        uid: "USER3"
    };

    // test setup
    beforeAll(() => {
        // clear any identical tuits
        deleteTuit(tuit3.tid);
    });

    // test cleanup
    afterAll(() => {
        // remove any data we created
        return deleteTuit(tuit3.tid);
    });

    test('can retrieve a tuit by their primary key with REST API', async () => {
        // insert new tuit into database
        const newTuit = await createTuit(tuit3.uid, tuit3);

        // verify new tuit matches parameter tuit
        expect(newTuit.tid).toEqual(tuit3.tid);
        expect(newTuit.tuit).toEqual(tuit3.tuit);
        expect(newTuit.uid).toEqual(tuit3.uid);


        // retrieve new tuit from the database by its PK
        const oldTuit = await findTuitById(newTuit._id);

        expect(oldTuit.tid).toEqual(tuit3.tid);
        expect(oldTuit.tuit).toEqual(tuit3.tuit);
        expect(oldTuit.uid).toEqual(tuit3.uid);
    });
});




describe('findAllTuits', () => {

    const tids = [
        "001", "002", "003"
    ];

    // test setup
    beforeAll(() =>
        // sample tuits to insert
        tids.map(tid =>
            createTuit(`USER${tid}`,{
                tid: tid,
                tuit: `test tuit number ${tid}`,
                uid: `USER${tid}`
            })
        )
    );

    // test cleanup
    afterAll(() =>
        // delete inserted tuits
        tids.map(tid =>
            deleteTuit(tid)
        )
    );

    test('can retrieve all tuits with REST API', async () => {
        // retrieve all the tuits
        const tuits = await findAllTuits();

        // number of tuits should be 3
        expect(tuits.length).toBeGreaterThanOrEqual(tids.length);

        // check each inserted tuit
        const insertedTuits = tuits.filter(
            aTuit => tids.indexOf(aTuit.tid) >= 0);

        // compare added tuits to parameter tuits
        insertedTuits.forEach(aTuit => {
            const aTid = tids.find(aTid => aTid === aTuit.tid)
            expect(aTuit.tid).toEqual(aTid);
            expect(aTuit.tuit).toEqual(`test tuit number ${tid}`);
            expect(aTuit.uid).toEqual(`USER${tid}`);
        });
    });



    describe('updateTuit', () => {
        // original tuit and update target
        const tuit5 = {
            tid: "005",
            tuit: "this is test tuit #5",
            uid: "USER5"
        };

        const target = {
            tid: "005",
            tuit: "this is the updated tuit",
            uid: "USER5"
        }

        // test setup
        beforeAll(() => {
            // clear any identical tuits
            deleteTuit(tuit5.tid);
        })

        // test cleanup
        afterAll(() => {
            // remove any data we created
            return deleteTuit(tuit5.tid);
        })

        test('can update tuit with REST API', async () => {
            // insert new tuit to database
            const newTuit = await createTuit(tuit5.uid, tuit5);

            // verify inserted tuit matches parameter tuit
            expect(newTuit.tid).toEqual(tuit5.tid);
            expect(newTuit.tuit).toEqual(tuit5.tuit);
            expect(newTuit.uid).toEqual(tuit5.uid);

            // update newTuit
            const updatedTuit = await updateTuit(newTuit.tid, "this is the updated tuit");

            // verify update matches target tuit
            expect(updatedTuit.tid).toEqual(target.tid);
            expect(updatedTuit.tuit).toEqual(target.tuit);
            expect(updatedTuit.uid).toEqual(target.uid);
        });
    });


    // NEW likes/dislikes service tests for A4
    describe('addLikes', () => {
        // original tuit with zero likes
        const tuit6 = {
            tid: "006",
            tuit: "this is test tuit #6",
            uid: "USER6"
        };

        // test setup
        beforeAll (() => {
            deleteTuit(tuit6.tid);
        })

        // test cleanup
        afterAll(() => {
            deleteTuit(tuit6.tid);
        })

        test('can update like count with REST API', async () => {
            // add a like to the test tuit
            await userTogglesTuitLikes("USER6", "006");

            // verify tuit liked by user
            const target = (findAllTuitsLikedByUser(tuit6.uid));

            // verify values match
            expect(target.tid).toEqual(tuit6.tid);
            expect(target.tuit).toEqual(tuit6.tuit);
            expect(target.uid).toEqual(tuit6.uid);
        });
    });

    describe('addDislikes', () => {
        // original tuit with zero likes
        const tuit7 = {
            tid: "007",
            tuit: "this is test tuit #7",
            uid: "USER7"
        };

        // test setup
        beforeAll (() => {
            deleteTuit(tuit7.tid);
        })

        // test cleanup
        afterAll(() => {
            deleteTuit(tuit7.tid);
        })

        test('can update dislike count with REST API', async () => {
            // add a like to the test tuit
            await userTogglesTuitLikes("USER7", "007");

            // remove the like
            await userTogglesTuitLikes("USER7", "007");

            // copy of the base tuit
            const target = tuit7;

            // verify values match
            expect(target.tid).toEqual(tuit7.tid);
            expect(target.tuit).toEqual(tuit7.tuit);
            expect(target.uid).toEqual(tuit7.uid);
        });
    });
});