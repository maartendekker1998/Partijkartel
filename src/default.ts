class Default extends Command {

    execute(params: string[]): boolean {
        this.game.out.println("Ik weet niet wat je bedoelt...");
        this.game.out.println();
        this.game.out.println("Je commando's zijn:");
        this.game.out.println("   ga kijk praat intellect stop help");
        return false;
    }
}