import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function PlayerProfile() {
    let location = useLocation();
    let { id } = location.state;
    const api = process.env.REACT_APP_MY_API_KEY_NAME;
    let [data, setData] = useState([]);

    // FETCHING API
    useEffect(() => {
        fetch(`https://api.football-data.org/v2/players/${id}`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': api,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                setData((prev) => ({ ...prev, data }));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [api, id]);

    return (
        <div className="flex flex-col justify-center items-center text-center w-full pt-6 pb-10">
            <Link to="/" className="font-medium text-blue-400 self-start pl-6">
                Back
            </Link>
            <h1 className="tracking-wide text-2xl font-medium text-center">
                {data.data?.name ? data.data.name : '-'}
            </h1>
            <ul className=" flex flex-col items-start  md:w-60 mt-10 gap-y-5">
                <li className="border-b-2 text-sm md:text-base">
                    First Name:{' '}
                    {data.data?.firstName ? data.data.firstName : '-'}
                </li>
                <li className="border-b-2 text-sm md:text-base">
                    Last Name: {data.data?.lastName ? data.data.lastName : '-'}
                </li>
                <li className="border-b-2 text-sm md:text-base">
                    Position: {data.data?.position ? data.data.position : '-'}
                </li>
                <li className="border-b-2 text-sm md:text-base">
                    Country of Birth:{' '}
                    {data.data?.countryOfBirth ? data.data.countryOfBirth : '-'}
                </li>
                <li className="border-b-2 text-sm md:text-base">
                    Nationality:{' '}
                    {data.data?.nationality ? data.data.nationality : '-'}
                </li>
            </ul>
        </div>
    );
}

export default PlayerProfile;
