import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

//TODO: remove mocked_users, fix async render in both tuits and users

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
  {username: 'bob_ross', password: 'happyclouds', email: 'paintbrush@bob.com', _id: "345"},
];

const MOCKED_TUITS = [
  {tuit: "ellen's tuit", postedBy: 'ellen_ripley'},
  {tuit: "sarah's tuit", postedBy: 'sarah_conor'},
  {tuit: "bob's tuit", postedBy: 'bob_ross'},
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits = {MOCKED_TUITS}/>
    </HashRouter>);
    const linkElement = screen.getByText(/bob's tuit/i);
    expect(linkElement). toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits = {tuits}/>
    </HashRouter>);
  const linkElement = screen.getByText(/ellen's tuit/i);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({data: {tuits: MOCKED_TUITS}}));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits = {tuits}/>
    </HashRouter>);

  const tuit = screen.getByText(/sarah's tuit/i);
  expect(tuit).toBeInTheDocument();
});
