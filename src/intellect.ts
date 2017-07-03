class Intellect extends Command{
    public execute(params : string[]) : boolean {
        this.game.out.println("Je hebt "+this.game.intellect+" kennis vergaard.");
        return false;
    }
}