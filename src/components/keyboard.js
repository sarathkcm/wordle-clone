import React from 'react';

function Keyboard({ onKeyPress, disabled, wordList, answer }) {
    const buttonRows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫ "]
    ];
    return (
        <div className='grid grid-cols-22'>
            {buttonRows.map((buttons, index) => {
                const padding = <div className={index % 2 === 0 ? "col-span-1" : "col-span-2"}>&nbsp;</div>
                const rowRendered = [padding, ...buttons.map(key => {
                    const isGreen = Boolean(answer.indexOf(key) > -1
                        && [...answer].filter((a, i) => Boolean(wordList.find(w => a === key && w[i] === key))).length > 0
                    );
                    const isYellow = Boolean(wordList.find(word => word.indexOf(key) > -1 && answer.indexOf(key) > -1));
                    const isBlack = Boolean(wordList.find(word => word.indexOf(key) > -1 && answer.indexOf(key) === -1));
                    const cellStyle = (() => {

                        if (isGreen) {
                            return "bg-green-500 text-white";
                        }
                        if (isYellow) {
                            return "bg-yellow-500 text-white"
                        }
                        if (isBlack) {
                            return "bg-slate-800 text-white"
                        }
                        return "bg-slate-400 text-white"
                    })();
                    return (<button
                        className={`m-1 border border-gray-400 rounded-sm py-3 px-1
                        ${cellStyle}
                        ${key.length > 1 ? 'col-span-3' : 'col-span-2'}`}
                        onClick={() => onKeyPress && onKeyPress(key)}
                        disabled={disabled}
                        key={key}
                    >
                        {key}
                    </button>)
                }), padding];
                return rowRendered
            })}
        </div>
    );
}

export default Keyboard;
