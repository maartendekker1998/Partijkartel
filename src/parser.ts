/**
 * This class is part of the "Thiery Baudet" application. 
 * "Thierry Baudet" is a very simple, text based adventure game.  
 * 
 * This parser reads user input and tries to interpret it as an "Adventure"
 * command. Every time it is called it reads a line from the terminal and
 * tries to interpret the line as a two word command. 
 *
 * The parser has a set of known command words. It checks user input against
 * the known commands, and invokes a relevant method on the Game object.
 * 
 * @author  Michael Kölling, David J. Barnes, Bugslayer and MaartenD
 * @version 2017.03.30
 */
class Parser {
    input : HTMLInputElement;
    game : Game;

    /**
     * Creates the parser object.
     * 
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    constructor(game: Game, input : HTMLInputElement) {
        this.game = game;
        this.input = input;
        input.onkeyup = (e) => { // event handler function
            if (e.keyCode == 13 && this.game.isOn) {
                // Invoke parse method wehen user pressed enter
                let command = this.input.value;
                this.game.out.println(command);
                this.parse(command.split(" "));
                this.input.value = ""; // clears the input element 
                this.game.out.print(">");
            } 
        }
    }

    /**
     * Parses the specified words and invokes the corresponding method
     * on the game object.
     * 
     * @param words an array of words to parse
     */
    parse(words : string[]) : void {
        let wantToQuit = false;
        let params = words.slice(1);
        switch (words[0]) {
            case "" :
                // Do nothing when user enters nothing 
                break
            case "help" : 
                wantToQuit = this.game.printHelp(params);
                break;
            case "ga" :
                wantToQuit = this.game.goRoom(params);
                break;
            case "stop" : 
                wantToQuit = this.game.quit(params);
                break;
            case "kijk" :
                wantToQuit = this.game.look(params);
                break;
            case "praat" :
                wantToQuit = this.game.talk(params);
                break;
            case "intellect" :
                wantToQuit = this.game.checkIntellect(params)
                break;
            default :
                // print an error when command is not known
                wantToQuit = this.game.printError(params);

        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    }

}