/**
 * @file likes-service.test uses various methods from our likes
 * service that implement CRUD operations
 */
import {findAllTuitsLikedByUser, findAllUsersThatLikedTuit,
    userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

/**
 * @test createLike tests the service's ability to create a new like
 * relationship between a tuit and a user
 */
describe('createLike', () => {
    // sample tuit and user
    const user1 = {
        username: 'USER1',
        password: 'uno',
        email: 'numberOne@uno.com',
        uid: "USER1"
    };
    const tuit1 = {
        tid: "001",
        tuit: "this is test tuit #1",
        uid: "USER1"
    };

    // setup: remove all matching users/tuits
    beforeAll(() => {
        deleteUsersByUsername(user1.username);
        deleteTuit(tuit1.tid);
    })

    // cleanup: remove any data we created
    afterAll(() => {
        deleteUsersByUsername(user1.username);
        deleteTuit(tuit1.tid);
    })

    test('can create like with REST API', async () => {
        // insert new user and new tuit
        const newUser = await createUser(user1);
        const newTuit = await createTuit(tuit1.uid, tuit1);

        // create new like relationship between tuit and user
        await userTogglesTuitLikes(newUser.uid, newTuit.tid);

        // verify like was executed sucessfully
        expect(findAllTuitsLikedByUser(newUser.uid)).toEqual(newTuit);
        expect(findAllUsersThatLikedTuit(newTuit.tid)).toEqual(newUser);
    });

    /**
     * @test removeExistingLike tests the service's ability to delete an
     * existing like from the likes collection
     */
    describe('removeExistingLike', () => {
        // sample tuit and user
        const user1 = {
            username: 'USER1',
            password: 'uno',
            email: 'numberOne@uno.com',
            uid: "USER1"
        };
        const tuit1 = {
            tid: "001",
            tuit: "this is test tuit #1",
            uid: "USER1"
        };

        // setup: remove all matching users/tuits
        beforeAll(() => {
            deleteUsersByUsername(user1.username);
            deleteTuit(tuit1.tid);
        })

        // cleanup: remove any data we created
        afterAll(() => {
            deleteUsersByUsername(user1.username);
            deleteTuit(tuit1.tid);
        })

        test('can remove existing like with REST API', async () => {
            // insert new user and new tuit
            const newUser = await createUser(user1);
            const newTuit = await createTuit(tuit1.uid, tuit1);

            // create new like relationship between tuit and user
            await userTogglesTuitLikes(newUser.uid, newTuit.tid);

            // undo the created like
            await userTogglesTuitLikes(newUser.uid, newTuit.tid);

            // verify like was executed successfully
            expect(findAllTuitsLikedByUser(newUser.uid)).toBeNull;
            expect(findAllUsersThatLikedTuit(newTuit.tid)).toBeNull;
        });
    });
});