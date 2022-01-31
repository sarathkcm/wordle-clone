import uniqueRandom from "unique-random";
import fs from "fs/promises";
import { createRequire } from "module";
import { fileURLToPath } from 'url';
import path from 'path';
import inquirer from 'inquirer';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const words = require(path.join(__dirname, "./src/words.json"));
const challenges = require(path.join(__dirname, "./src/challenges.json"));
const random = uniqueRandom(1, words.length);
const newWords = [];

(async () => {
    let _break = false;
    do {
        const word = words[random()];
        const { confirm } = await inquirer.prompt([
            {
                name: "confirm",
                type: "list",
                message: word,
                choices: ["no", "yes", "exit"]
            }
        ])

        if (challenges.includes(word) || newWords.includes(word)) {
            console.log("Already added");
        } else if (confirm === "yes") {
            newWords.push(word);
        }
        _break = confirm === "exit";
    } while (!_break)
    const fileContent = JSON.stringify([...challenges, ...newWords], null, 2);
    await fs.writeFile(path.join(__dirname, "./src/challenges.json"), fileContent, { encoding: "utf-8" })
})()

