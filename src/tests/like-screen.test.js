/**
 * @file like-screen.test uses jest mock framework to test our services
 * using mocked data
 */

import {MyLikes} from "../components/profile/my-likes";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuitsLikedByUser} from "../services/likes-service";
import {UserList} from "../components/profile/user-list";

import axios from "axios";
jest.mock('axios');

//mocked data
const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'bob_ross', password: 'happyclouds', email: 'paintbrush@bob.com', _id: "345"},
];
const MOCKED_LIKES = [
    {tuit: "bob's tuit", likedBy: 'ellen_ripley'},
    {tuit: "ellen's tuit", likedBy: 'sarah_connor'},
    {tuit: "sarah's tuit", likedBy: 'bob_ross'},
];


/**
 * @test tests the REACT component's ability to render a static
 * array of likes
 */
test('likes screen renders static like array', () => {
    render(
        <HashRouter>
            <MyLikes likes={MOCKED_LIKES}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bob's tuit/i);
    expect(linkElement).toBeInTheDocument();
});


/**
 * @test tests the REACT component's ability to render a list of
 * likes asynchronously
 */
test('likes screen renders async', async () => {
    const likes = await findAllTuitsLikedByUser('234');
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS}/>
            <MyLikes likes={likes}/>
        </HashRouter>);
    const linkElement = screen.getByText(/ellen's tuit/i);
    expect(linkElement).toBeInTheDocument();
    })


/**
 * @test tests the REACT component's ability to render a mocked
 * list of likes
 */
test('like list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {likes: MOCKED_LIKES}}));

    const response = await findAllTuitsLikedByUser('234');
    const likes = response.users;

    render(
        <HashRouter>
            <MyLikes likes={likes}/>
        </HashRouter>);

    const linkElement = screen.getByText(/ellen's tuit/i);
    expect(linkElement).toBeInTheDocument();
});