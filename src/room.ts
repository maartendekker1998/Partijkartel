/**
 * Class Room - a room in an adventure game.
 *
 * This class is part of the "Thiery Baudet" application. 
 * "Thierry Baudet" is a very simple, text based adventure game.   
 *
 * A "Room" represents one location in the scenery of the game.  It is 
 * connected to other rooms via exits.  The exits are labelled north, 
 * east, south, west.  For each direction, the room stores a reference
 * to the neighboring room, or null if there is no exit in that direction.
 * 
 * @author  Michael Kölling, David J. Barnes, Bugslayer and Maarten Dekker
 * @version 2017.03.30
 */
class Room {
    description : string;

    northExit : Room;
    southExit : Room;
    eastExit : Room;
    westExit : Room;
    upExit : Room;
    downExit : Room;

    /**
     * Create a room described "description". Initially, it has
     * no exits. "description" is something like "a kitchen" or
     * "an open court yard".
     * @param description The room's description.
     */
    constructor(description : string) {
        this.description = description;
    }

    /**
     * Define the exits of this room.  Every direction either leads
     * to another room or is null (no exit there).
     * @param noordelijk The north exit.
     * @param oostelijk The east east.
     * @param zuidelijk The south exit.
     * @param westelijk The west exit.
     * @param omhoog The stairs up.
     * @param omlaag Down the stairs.     
    **/
    setExits(noordelijk : Room, oostelijk : Room, zuidelijk : Room, westelijk : Room, omhoog : Room, omlaag : Room) : void {
        if(noordelijk != null) {
            this.northExit = noordelijk;
        }
        if(oostelijk != null) {
            this.eastExit = oostelijk;
        }
        if(zuidelijk != null) {
            this.southExit = zuidelijk;
        }
        if(westelijk != null) {
            this.westExit = westelijk;
        }
        if(omhoog != null) {
            this.upExit = omhoog;
        }
        if(omlaag != null) {
            this.downExit = omlaag;
        }
    }

        setnpc(naam : npc) : void{
        }
    
    }