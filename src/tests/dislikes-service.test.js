import {findAllTuitsDislikedByUser, findAllUsersThatDislikedTuit,
    userTogglesTuitDislikes} from "../services/dislikes-service";
import {createTuit, deleteTuit} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('createDislike', () => {
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

    test('can create dislike with REST API', async () => {
        // insert new user and new tuit
        const newUser = await createUser(user1);
        const newTuit = await createTuit(tuit1.uid, tuit1);

        // create new dislike relationship between tuit and user
        await userTogglesTuitDislikes(newUser.uid, newTuit.tid);

        // verify dislike was executed sucessfully
        expect(findAllTuitsDislikedByUser(newUser.uid)).toEqual(newTuit);
        expect(findAllUsersThatDislikedTuit(newTuit.tid)).toEqual(newUser);
    });


    describe('removeExistingDislike', () => {
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

        test('can remove existing dislike with REST API', async () => {
            // insert new user and new tuit
            const newUser = await createUser(user1);
            const newTuit = await createTuit(tuit1.uid, tuit1);

            // create new dislike relationship between tuit and user
            await userTogglesTuitDislikes(newUser.uid, newTuit.tid);

            // undo the created dislike
            await userTogglesTuitDislikes(newUser.uid, newTuit.tid);

            // verify dislike was executed successfully
            expect(findAllTuitsDislikedByUser(newUser.uid)).toBeNull;
            expect(findAllUsersThatDislikedTuit(newTuit.tid)).toBeNull;
        });
    });
});