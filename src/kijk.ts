class Kijk extends Command {

    execute(params: string[]): boolean {
        this.game.out.println(this.game.currentRoom.description);
        this.game.out.println("De uitgangen zijn:");
        if (this.game.currentRoom.northExit != null) {
            this.game.out.print("noordelijk ");
        }
        if (this.game.currentRoom.eastExit != null) {
            this.game.out.print("oostelijk ");
        }
        if (this.game.currentRoom.southExit != null) {
            this.game.out.print("zuidelijk ");
        }
        if (this.game.currentRoom.westExit != null) {
            this.game.out.print("westelijk ");
        }
        this.game.out.println();
        this.game.out.print(">");
        if (this.game.currentRoom.npc != null)
            this.game.out.println(this.game.currentRoom.npc.description);
        return false;
    }

}