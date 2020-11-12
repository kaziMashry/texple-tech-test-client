import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN } from '../../api';
var Owlbot = require('owlbot-js');

var client = Owlbot(TOKEN);

const WordSearch = () => {
    document.title = 'Word Search';

    const [searchResult, setSearchResult] = useState({});
    const [searchedWord, setSearchedWord] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = (e) => {
        client.define(searchedWord)
            .then((result) => {
                setSearchResult(result);
                setSearchedWord('');
                setSearched(true);
            })
            .catch((error) => {
                alert(error.message);
                setSearchedWord('');
                setSearched(false);
            })
        e.preventDefault();
    }


    return (
        <>
            <Link to='/todo' className='d-flex justify-content-center mt-5 pt-5 text-decoration-none'>
                Go to ToDo
                </Link>
            <form className='d-flex justify-content-center mt-3'>
                <input type='text' placeholder='Try any other word' onChange={(e) => setSearchedWord(e.target.value)} value={searchedWord} required />
                <button className='btn btn-primary ml-2' onClick={handleSearch}>Search</button>
            </form>
            {
                searched &&
                <div className='d-flex align-items-center flex-column mt-5'>
                    <table className="table table-borderless table-hover w-50 p-4 ">
                        <tbody>
                            {
                                searchResult.word &&
                                <tr>
                                    <td><strong>Word</strong></td>
                                    <td className='text-left'>{searchResult.word}</td>
                                </tr>
                            }

                            {
                                searchResult.definitions[0].type &&
                                <tr>
                                    <td><strong>Type</strong></td>
                                    <td>{searchResult.definitions[0].type}</td>
                                </tr>
                            }

                            {
                                searchResult.definitions[0].definition &&
                                <tr>
                                    <td><strong>Definition</strong></td>
                                    <td>{searchResult.definitions[0].definition}</td>
                                </tr>
                            }

                            {
                                searchResult.definitions[0].example &&
                                <tr>
                                    <td><strong>Example</strong></td>
                                    <td>{searchResult.definitions[0].example}</td>
                                </tr>
                            }

                            {
                                searchResult.pronunciation &&
                                <tr>
                                    <td><strong>Pronunciation</strong></td>
                                    <td>{searchResult.pronunciation}</td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>}
        </>
    );
};

export default WordSearch;