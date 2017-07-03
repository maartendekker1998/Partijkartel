class Kijk extends Command{

    execute(params : string[]) : boolean {
        this.game.out.println(this.game.currentRoom.description);
        if (this.game.currentRoom.npc != null)
        this.game.out.println(this.game.currentRoom.npc.description);
        return false;
    }
}