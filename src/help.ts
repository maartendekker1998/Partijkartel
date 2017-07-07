class Help extends Command {
    execute(params: string[]): boolean {
        if (params.length > 0) {
            this.game.out.println("Help met wat?");
            return false;
        }
        this.game.out.println("Je loopt rond in Den Haag");
        this.game.out.println("Vergaar kennis en red de maatschappij!");
        this.game.out.println();
        this.game.out.println("Je commando's zijn:");
        this.game.out.println("   ga kijk praat intellect stop help");
        this.game.out.println("gebruik de commando's als volgt:");
        this.game.out.println("het commando 'ga' heef de parameters 'noordelijk''oostelijk''zuidelijk''westelijk'.");
        this.game.out.println("typ 'kijk' om te kijken en 'praat' om te praten etc.");
        return false;
    }
}