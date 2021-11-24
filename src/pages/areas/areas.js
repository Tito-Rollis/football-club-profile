import { useEffect, useState } from 'react';

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
    // let team = async () => {
    //     fetch('https://api.football-data.org/v2/teams/100', {
    //         method: 'GET',
    //         headers: {
    //             'X-Auth-Token': api,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };

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
    return (
        <div className="h-screen pt-6">
            <h1 className="text-medium tracking-wide">All Teams</h1>
            <ul className="flex flex-wrap w-3/5 mt-4 mx-auto border-2 border-blue-300">
                {box[currentPage] ? (
                    box[currentPage].map((item) => {
                        return (
                            <li
                                className="border-2 border-green-400 w-2/4 hover:bg-green-600 hover:text-white transition-all"
                                key={item.id}
                            >
                                <a href="#">* {item.name}</a>
                            </li>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </ul>
            <div className="w-36 flex justify-between mx-auto mt-6">
                <button
                    className=" bg-yellow-400 h-10 w-16 rounded-lg"
                    onClick={prevBtn}
                >
                    &lt;&lt;
                </button>
                <button
                    className=" bg-blue-400 h-10 w-16 rounded-lg"
                    onClick={nextBtn}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default Areas;
