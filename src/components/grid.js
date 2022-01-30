import React from 'react';

function WordGrid({ wordList, currentWord, answer = "", finishedCurrent }) {

    return (
        <div className='grid grid-cols-5 grid-rows-6 max-w-lg place-items-center'>

            {[...Array(30).keys()].map((_, index) => {
                const row = Math.floor(index / 5);
                const col = (index % 5);
                const letter = (() => {
                    if (row == wordList.length && !finishedCurrent) {
                        return currentWord[col];
                    }
                    if (row < wordList.length) {
                        return wordList[row]?.[col];
                    }
                    return "";
                })()

                const isPrevious = row < wordList.length;
                const isGreen = answer[col] === letter;
                const isYellow = answer.indexOf(letter) > -1;
                const isBlack = answer.indexOf(letter) === -1;

                const cellStyle = (() => {
                    if (!isPrevious) {
                        return 'bg-slate-300'
                    }
                    if (isGreen) {
                        return "bg-green-500 text-white";
                    }
                    if (isYellow) {
                        return "bg-yellow-500 text-white"
                    }
                    return "bg-slate-800 text-white"
                })();
                return (
                    <div
                        className={`
                            border m-1 border-gray-600 
                            ${cellStyle}
                            h-10 w-10 flex justify-center items-center
                        `}
                        key={index}

                    >
                        {letter}
                    </div>
                )
            })}
        </div>
    );
}

export default WordGrid;
