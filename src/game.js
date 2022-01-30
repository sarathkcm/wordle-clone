import { useState, useEffect } from "react";
import WordGrid from "./components/grid";
import Keyboard from "./components/keyboard";
import words from "./words.json";
import challenges from "./challenges.json";
const notyf = new Notyf({

    position: { x: 'center', y: 'top' }
});

export default function Game({ initialData, onChange }) {
    const [startTime, _] = useState(initialData.startTime);
    const [currentWord, setCurrentWord] = useState("");
    const [wordList, setWordList] = useState([]);
    const [finishedCurrent, setFinishedCurrent] = useState(false);
    const [score, setScore] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState({
        index: 0,
        word: challenges[0].toUpperCase()
    })

    useEffect(() => {
        const {
            currentWord, wordList, finishedCurrent, score, currentChallenge
        } = {
            ...{
                currentWord: "", wordList: [], finishedCurrent: false, score: 0, currentChallenge: {
                    index: 0,
                    word: challenges[0].toUpperCase()
                }
            },
            ...initialData
        };
        setCurrentWord(currentWord);
        setWordList(wordList);
        setFinishedCurrent(finishedCurrent);
        setScore(score);
        setCurrentChallenge(currentChallenge);
    }, []);

    useEffect(() => {
        onChange && onChange({
            currentWord, wordList, finishedCurrent, score, currentChallenge, startTime
        });
    }, [currentWord, wordList, finishedCurrent, score, currentChallenge]);


    const showMessage = (message, type = "error") => notyf[type](message,);
    const onKeyPress = (key) => {
        if (!key) { return; }
        switch (key.trim()) {
            case "⌫":
                setCurrentWord(w => w.substring(0, w.length - 1));
                break;
            case "Enter":
                if (currentWord.length < 5) {
                    showMessage("Not enough letters");
                    break;
                }
                if (!words.includes(currentWord.toLowerCase())) {
                    showMessage("Not a word in list");
                    break;
                }
                if (currentWord === currentChallenge.word) {
                    showMessage("Awesome...", "success");
                    setScore(s => s + 10);
                    setFinishedCurrent(true);
                    setWordList(wl => [...wl, currentWord]);
                    break;
                }

                if (wordList.length + 1 === 6) {
                    showMessage("Better luck on the next one.")
                    setFinishedCurrent(true);
                }
                setWordList(wl => [...wl, currentWord]);
                setCurrentWord("");
                break;
            default:
                if (currentWord.length < 5) {
                    setCurrentWord(w => w + key)
                }
                break;
        }
    }

    const loadNextChallenge = () => {

        if (!challenges[currentChallenge.index + 1]) {
            showMessage("Challenges completed");
            return
        }

        setCurrentChallenge({
            index: currentChallenge.index + 1,
            word: challenges[currentChallenge.index + 1].toUpperCase()
        });
        setFinishedCurrent((false));
        setWordList([]);
        setCurrentWord("");
    }

    return (
        <>
            <main className="mx-auto max-w-lg p-2">
                <h1 className="text-center text-xl my-5">Challenge {currentChallenge.index + 1}/ {challenges.length}</h1>
                <h2 className="text-right text-lg font-bold my-5">Score: {score}</h2>
                <div className="my-10 flex justify-center">
                    <WordGrid wordList={wordList} currentWord={currentWord} answer={currentChallenge.word} finishedCurrent={finishedCurrent} />
                </div>
                <div className="my-10">
                    <Keyboard onKeyPress={onKeyPress} disabled={finishedCurrent} wordList={wordList} answer={currentChallenge.word} />
                </div>
                <section className="flex flex-col justify-center items-center">
                    {finishedCurrent ? (
                        <>
                            <p className="py-2 text-lg">Answer: <span className="font-bold text-green-800">{currentChallenge.word.toUpperCase()}</span></p>
                            <button className="border bg-blue-700 text-white rounded-md px-3 py-1" onClick={loadNextChallenge}>
                                Load Next Challenge
                            </button>
                        </>
                    ) : null}
                </section>
            </main>
            <footer className="text-center">
                <p>Made with ❤️, by Sarath KCM</p>
                <p>Clone of the awesome daily word puzzle, <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank" className="underline">Wordle</a>, but for the impatient.</p>
            </footer>
        </>
    )
}