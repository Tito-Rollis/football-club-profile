import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Areas() {
    const api = process.env.REACT_APP_MY_API_KEY_NAME;
    const [area, setArea] = useState('');
    let itemInPage = 30;
    let [currentPage, setCurrentPage] = useState(0);
    let pages = Math.ceil(area.length / itemInPage);

    let nextBtn = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage += 1));
        if (currentPage > pages) {
            alert('Oops, you reach the limit =)');
        }
    };
    let prevBtn = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage -= 1));
        if (currentPage < 0) {
            alert('Oops, you reach the limit =)');
        }
    };

    // if(currentPage > pages)
    let startIndex = 0;
    let box = [];
    for (let i = 0; i <= pages; i++) {
        box.push(area.slice(startIndex, itemInPage));
        startIndex += 30;
        itemInPage += 30;
    }

    useEffect(() => {
        fetch('https://api.football-data.org/v2/areas', {
            method: 'GET',
            headers: {
                'X-Auth-Token': api,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                setArea(data.areas);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [api]);
    box.splice(
        box.findIndex((el) => {
            return el.length === 0;
        }),
        1
    );

    return (
        <div className="pt-6 pb-6">
            <h1 className="tracking-wide text-2xl font-medium text-center">
                All Areas
            </h1>
            <ul className="flex flex-wrap w-3/5 mt-4 mx-auto border-2 border-blue-300">
                {box[currentPage] ? (
                    box[currentPage].map((item) => {
                        return (
                            <li
                                className="border-2 border-green-400  w-2/4 hover:bg-green-600 hover:text-white transition-all"
                                key={item.id}
                            >
                                {(() => {
                                    if (item.name === 'England') {
                                        return (
                                            <Link
                                                className="text-blue-500"
                                                to="/england"
                                            >
                                                * {item.name}
                                            </Link>
                                        );
                                    } else {
                                        return <a href="#">* {item.name}</a>;
                                    }
                                })()}
                            </li>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </ul>
            <div className="flex flex-row justify-center w-3/5 mt-2 mx-auto">
                <div className="flex flex-row items-center w-2/4 gap-x-2 mt-1 md:mt-3 justify-center mx-auto">
                    <p>*</p>
                    <div className="w-5 h-2 bg-blue-400"></div>
                    <p className="text-xs md:text-sm">Filled with teams</p>
                </div>
                <div className="flex flex-row items-center w-2/4 gap-x-2 mt-1 md:mt-3 justify-center mx-auto">
                    <p>*</p>
                    <div className="w-5 h-2 bg-black"></div>
                    <p className="text-xs md:text-sm">Not Filled with teams</p>
                </div>
            </div>
            <div className="w-36 flex justify-between mx-auto mt-2 md:mt-3">
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

export default Areas;
