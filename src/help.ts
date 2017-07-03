class Help extends Command{
    execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Help met wat?");
            return false;
        }
        this.game.out.println("Je loopt rond in Den Haag");
        this.game.out.println("Vergaar kennis en red de maatschappij!");
        this.game.out.println();
        this.game.out.println("Je commando's zijn:");
        this.game.out.println("   ga kijk praat intellect stop help");
        return false;
    }  
}