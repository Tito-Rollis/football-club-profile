import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
function TeamProfile() {
    const api = process.env.REACT_APP_MY_API_KEY_NAME;
    let location = useLocation();
    let { id, name, add, phone, web, found, color, venue } = location.state;
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        fetch(`https://api.football-data.org/v2/teams/${id}`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': api,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                setPlayers((prev) => ({ ...prev, data }));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [api, id]);
    console.log(players.data.squad);
    return (
        <div className="flex flex-col justify-center text-center w-full pt-6 pb-10">
            <h1 className="tracking-wide text-2xl font-medium text-center">
                {name}
            </h1>
            <div className="flex flex-col md:flex-row justify-between mx-auto w-3/4 mt-10">
                <ul className=" flex flex-col  md:w-60  gap-y-5">
                    <li className="border-b-2 text-sm md:text-base">
                        Address: {add}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Phone: {phone}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Website: {web}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Founded: {found}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Club Color: {color}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Venue: {venue}
                    </li>
                </ul>
                <ul className="flex flex-col mt-10 md:mt-0 md:w-3/6">
                    <p className="font-medium mb-5">All Players</p>
                    {players ? (
                        players.data.squad.map((item) => {
                            return (
                                <li
                                    className="border-2 border-green-400  hover:bg-green-600 hover:text-white transition-all"
                                    key={item.id}
                                >
                                    <Link
                                    // to={{
                                    //     pathname: '/team',
                                    //     state: {
                                    //         id: item.id,
                                    //         name: item.name,
                                    //         add: item.address,
                                    //         phone: item.phone,
                                    //         web: item.website,
                                    //         found: item.founded,
                                    //         color: item.clubColors,
                                    //         venue: item.venue,
                                    //     },
                                    // }}
                                    >
                                        * {item.name}
                                    </Link>
                                </li>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TeamProfile;
