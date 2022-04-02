import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";


/**
 * @constructor MyTuits retrieves and displays a list of tuits posted by
 * the currently logged-in user; it renders as a tab under the profile
 * screen
 * @returns {JSX.Element}
 */
const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitByUser("me")
            .then(tuits => setTuits(tuits));

    useEffect(() => {
        findMyTuits();
        return () => {
            setTuits({});
        };
    }, []);

    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
    );
};

export default MyTuits;