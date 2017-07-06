class Ga extends Command{

execute(params : string[]) : boolean {
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.game.out.println("Ga waarheen?");
            this.game.out.println("noordelijk, oostelijk, zuidelijk of westelijk.");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "noordelijk"   : 
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "oostelijk"    : 
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "zuidelijk"    : 
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "westelijk"    : 
                nextRoom = this.game.currentRoom.westExit;
                break;
            case "omhoog"       :
                nextRoom = this.game.currentRoom.upExit;
                break;
            case "omlaag"       :
                nextRoom = this.game.currentRoom.downExit;
                break;
        }

        if (nextRoom == null) {
            this.game.out.println("Er is geen deur of trap!");
        }
        else {

            //check intellect requirement
            if (this.game.intellect < nextRoom.intellectRequirement) {
                this.game.out.println("Je hebt "+nextRoom.intellectRequirement+" intellect nodig om deze kamer in te gaan.");
                return false;
            }


            this.game.currentRoom = nextRoom;

            if (this.game.currentRoom.description == "Je bent in het Mauritshuis") {
                this.game.out.println("Frederik Jansen: Betreed het schip, snel, het kartel zit al achter je aan.")
                this.game.out.println("Thierry draait zich nog een keer om terwijl hij op de loopplank staat en hij ziet Mark Rutte met gebalde vuisten naar hem wijzen. Baudet's haren wapperen in de wind van democratie terwijl de zeilen van het vlaggenschip van de renaissancevloot gehesen worden...");
                this.game.out.println("Gefeliciteerd, je hebt het spel uitgespeeld, het partijkartel is nog lang niet opgebroken. Dit kan alleen door FvD te steunen. Ga naar 'forumvoordemocratie.nl' voor meer informatie.")
                this.game.gameOver();
                return;
            }

            this.game.out.println(this.game.currentRoom.description);
            this.game.out.print("Uitgangen: ");
            if(this.game.currentRoom.northExit != null) {
                this.game.out.print("noordelijk ");
            }
            if(this.game.currentRoom.eastExit != null) {
                this.game.out.print("oostelijk ");
            }
            if(this.game.currentRoom.southExit != null) {
                this.game.out.print("zuidelijk ");
            }
            if(this.game.currentRoom.westExit != null) {
                this.game.out.print("westelijk ");
            }
            if(this.game.currentRoom.upExit != null) {
                this.game.out.print("omhoog");
            }
            if(this.game.currentRoom.downExit != null) {
                this.game.out.print("omlaag");
            }
            this.game.out.println();
        }
        return false;

    }

}
