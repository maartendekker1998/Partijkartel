class Room {
    description: string;

    northExit: Room;
    southExit: Room;
    eastExit: Room;
    westExit: Room;
    upExit: Room;
    downExit: Room;
    npc: npc;
    intellectRequirement: number = 0;

    /**
     * Create a room described "description". Initially, it has
     * no exits. "description" is something like "a kitchen" or
     * "an open court yard".
     * @param description The room's description.
     */
    constructor(description: string, req: number) {
        this.description = description;
        this.intellectRequirement = req;
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
    setExits(noordelijk: Room, oostelijk: Room, zuidelijk: Room, westelijk: Room, omhoog: Room, omlaag: Room): void {
        if (noordelijk != null) {
            this.northExit = noordelijk;
        }
        if (oostelijk != null) {
            this.eastExit = oostelijk;
        }
        if (zuidelijk != null) {
            this.southExit = zuidelijk;
        }
        if (westelijk != null) {
            this.westExit = westelijk;
        }
        if (omhoog != null) {
            this.upExit = omhoog;
        }
        if (omlaag != null) {
            this.downExit = omlaag;
        }
    }

    setnpc(n: npc): void {
        this.npc = n;
    }

}