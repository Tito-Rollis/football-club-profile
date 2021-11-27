import { Link, useLocation } from 'react-router-dom';

function PlayerProfile() {
    let location = useLocation();
    let { name, pos, country, role, found, color, venue } = location.state;
    return (
        <div className="flex flex-col justify-center text-center w-full pt-6 pb-10">
            <h1 className="tracking-wide text-2xl font-medium text-center">
                {name}
            </h1>
            <div className="flex flex-col md:flex-row justify-between mx-auto w-3/4 mt-10">
                <ul className=" flex flex-col  md:w-60  gap-y-5">
                    <li className="border-b-2 text-sm md:text-base">
                        Position: {pos}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Country of Birth: {country}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        Role: {role}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        founded: {found}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        clubColors: {color}
                    </li>
                    <li className="border-b-2 text-sm md:text-base">
                        venue: {venue}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PlayerProfile;
