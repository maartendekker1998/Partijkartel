class Parser {
    input: HTMLInputElement;
    game: Game;
    commands: { [key: string]: Command } = {};
    default: Default;

    /**
     * Creates the parser object.
     * 
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    constructor(game: Game, input: HTMLInputElement) {
        this.game = game;
        this.input = input;
        this.default = new Default(game);
        this.commands["ga"] = new Ga(this.game);
        this.commands['kijk'] = new Kijk(this.game);
        this.commands['praat'] = new Praat(this.game);
        this.commands['intellect'] = new Intellect(this.game);
        this.commands['stop'] = new Stop(this.game);
        this.commands['help'] = new Help(this.game);

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
    parse(words: string[]): void {
        let wantToQuit = false;
        let params = words.slice(1);
        if (words[0] == "") {
            return;
        }

        // Find the command to execute
        let command: Command;
        command = this.commands[words[0]];

        if (command == null) {
            command = this.default;
        }

        wantToQuit = command.execute(params);

        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }

    }

}