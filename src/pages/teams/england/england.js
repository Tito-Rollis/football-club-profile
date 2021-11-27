import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Teams() {
    const api = process.env.REACT_APP_MY_API_KEY_NAME;
    const [teams, setTeams] = useState('');

    // PAGINATION SETTING
    let itemInPage = 30;
    let [currentPage, setCurrentPage] = useState(0);
    let pages = Math.ceil(teams.length / itemInPage);
    let startIndex = 0;
    let box = [];
    for (let i = 0; i <= pages; i++) {
        box.push(teams.slice(startIndex, itemInPage));
        startIndex += 30;
        itemInPage += 30;
    }
    box.splice(
        box.findIndex((el) => {
            return el.length === 0;
        }),
        1
    );

    // NAVIGATION HANDLER
    let nextBtn = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage += 1));
    };
    let prevBtn = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage -= 1));
    };

    // FETCHING API
    useEffect(() => {
        fetch(`https://api.football-data.org/v2/teams/`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': api,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                setTeams(data.teams);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [api]);

    return (
        <div className="h-screen pt-6">
            <h1 className="tracking-wide text-2xl font-medium text-center">
                All England Teams
            </h1>

            {/* GET ALL ENGLAND TEAMS */}
            <ul className="flex text-sm md:text-base flex-wrap w-11/12 md:w-3/5 mt-4 mx-auto border-2 border-blue-300">
                {box[currentPage] ? (
                    box[currentPage].map((item) => {
                        return (
                            <li
                                className="border-2 border-green-400 w-2/4 hover:bg-green-600 hover:text-white transition-all"
                                key={item.id}
                            >
                                <Link
                                    to={{
                                        pathname: '/team',
                                        state: {
                                            id: item.id,
                                            name: item.name,
                                            add: item.address,
                                            phone: item.phone,
                                            web: item.website,
                                            found: item.founded,
                                            color: item.clubColors,
                                            venue: item.venue,
                                        },
                                    }}
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

            {/* NAVIGATION  */}
            <div className="w-36 flex justify-between mx-auto mt-6">
                {currentPage <= 0 ? (
                    <button
                        disabled
                        className=" bg-yellow-400 h-10 w-16 rounded-lg "
                        onClick={prevBtn}
                    >
                        &lt;&lt;
                    </button>
                ) : (
                    <button
                        className=" bg-yellow-400 h-10 w-16 rounded-lg "
                        onClick={prevBtn}
                    >
                        &lt;&lt;
                    </button>
                )}
                {currentPage >= box.length - 1 ? (
                    <button
                        disabled
                        className=" bg-blue-400 h-10 w-16 rounded-lg"
                        onClick={nextBtn}
                    >
                        &gt;&gt;
                    </button>
                ) : (
                    <button
                        className=" bg-blue-400 h-10 w-16 rounded-lg"
                        onClick={nextBtn}
                    >
                        &gt;&gt;
                    </button>
                )}
            </div>
        </div>
    );
}

export default Teams;
