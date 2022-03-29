/**
 * @file dislike-screen.test uses jest mock framework to test our services
 * using mocked data
 */

import {MyDislikes} from "../components/profile/my-dislikes";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuitsDislikedByUser} from "../services/dislikes-service";
import {UserList} from "../components/profile/user-list";

import axios from "axios";
jest.mock('axios');

//mocked data
const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'bob_ross', password: 'happyclouds', email: 'paintbrush@bob.com', _id: "345"},
];
const MOCKED_DISLIKES = [
    {tuit: "bob's tuit", dislikedBy: 'ellen_ripley'},
    {tuit: "ellen's tuit", dislikedBy: 'sarah_connor'},
    {tuit: "sarah's tuit", dislikedBy: 'bob_ross'},
];

/**
 * @test tests the REACT component's ability to render a static
 * array of dislikes
 */
test('dislikes screen renders static dislike array', () => {
    render(
        <HashRouter>
            <MyDislikes dislikes={MOCKED_DISLIKES}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bob's tuit/i);
    expect(linkElement).toBeInTheDocument();
});

/**
 * @test tests the REACT component's ability to render a list of
 * dislikes asynchronously
 */
test('dislikes screen renders async', async () => {
    const dislikes = await findAllTuitsDislikedByUser('234');
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS}/>
            <MyDislikes dislikes={dislikes}/>
        </HashRouter>);
    const linkElement = screen.getByText(/ellen's tuit/i);
    expect(linkElement).toBeInTheDocument();
})


/**
 * @test tests the REACT component's ability to render a mocked
 * list of dislikes
 */
test('dislike list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {dislikes: MOCKED_DISLIKES}}));

    const response = await findAllTuitsDislikedByUser('234');
    const dislikes = response.users;

    render(
        <HashRouter>
            <MyDislikes dislikes={dislikes}/>
        </HashRouter>);

    const linkElement = screen.getByText(/ellen's tuit/i);
    expect(linkElement).toBeInTheDocument();
});