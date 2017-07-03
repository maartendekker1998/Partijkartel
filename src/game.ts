/**
 * This class is part of the "Thiery Baudet" application. 
 * "Thierry Baudet" is a very simple, text based adventure game.  
 * 
 * Users can walk around some scenery. Talk to NPC's and collect items.
 * 
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 * 
 * @author  Michael Kölling, David J. Barnes, Bugslayer and MaartenD
 * @version 2017.03.30
 */
class Game {
    parser : Parser;
    out : Printer;

    currentRoom : Room;
    intellect : number = 0;
    isOn : boolean;
    talkedTo : string[] = [];

    
    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }

    /**
     * Create all the rooms and link their exits together.
     */
        createRooms() : void {

        // create npcs
            var sylvana = new npc("Sylvana", "Sylvana Simons staat bij de haringkraam.");
            var alexander = new npc("Alexander", "Alexander pechtold staat stoned weg te dromen bij de fontijn van graaf Willem II.");
            var gertjan = new npc("Gert-Jan", "Gert-Jan Segers is aan het bidden dat Pechtold de CU mee laat werken in de coalitievorming.")
            var theo = new npc("Theo", "Theo Hiddema staat in de opening van het torentje en rijkt zijn hand al naar je uit.");
            var marriane = new npc("Marriane", "Je komt Marriane Theime tegen in de gang.");
            var mark = new npc("Mark","Mark Rutte is aanwezig.");
            var jesse = new npc("Jesse","Je ziet Jesse Feras Klaver zitten.");
            var geert = new npc("Geert","Geert Wilders staat hier ook.");
            var lodewijk = new npc("Lodewijk","Lodewijk Asscher zit met zijn telefoon te spelen op een bankje.");
            var jfvd = new npc("JFVD","De JFVD staat al op je te wachten")

        // create the rooms
        var buitenhof = new Room("Je staat op het buitenhof", 0);
        var binnenhof = new Room("Je staat op het binnenhof", 0);
        var hofkapel = new Room("Je bent in de hofkapel", 0);
        var hofpoort = new Room("Je staat onder de hofpoort", 0);
        var minjus = new Room("Je bent in het Departement van justitie", 35);
        var kamer = new Room("Je bent in de Tweede kamer der Staten Generaal", 0);
        var pers = new Room("Je staat op de persverdieping van de tweede kamer", 0);
        var minalg = new Room("Je bent in het ministerie van algemene zaken", 60);
        var torentje = new Room("Je bent in het torentje", 0);
        var mauritshuis = new Room("Je bent in het Mauritshuis", 0);
        
             // initialise npc locations
              buitenhof.setnpc(sylvana);
              binnenhof.setnpc(alexander);
              hofkapel.setnpc(gertjan);
              hofpoort.setnpc(geert);
              minjus.setnpc(marriane);
              kamer.setnpc(mark);
              pers.setnpc(jesse);
              minalg.setnpc(lodewijk);
              torentje.setnpc(theo);
              mauritshuis.setnpc(jfvd);

        // initialise room exits
        buitenhof.setExits(null, binnenhof, null, null, null, null);
        binnenhof.setExits(hofkapel, null, hofpoort, buitenhof, null, null);
        hofkapel.setExits(null, null, binnenhof, null, null, null);
        hofpoort.setExits(binnenhof, minjus, null, null, null, null);
        minjus.setExits(kamer, null, null, hofpoort, null, null);
        kamer.setExits(null, minalg, minjus, null, pers, null);
        pers.setExits(null, null, null, null, null, kamer)
        minalg.setExits(torentje, null, null, kamer, null, null);
        torentje.setExits(null, mauritshuis, minalg, null, null, null);
        mauritshuis.setExits(null, null, null, torentje, null, null);

        // spawn player outsideat
        this.currentRoom = buitenhof;
    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.println("Welkom!");
        this.out.println("Mijn naam is Thierry Baudet.");
        this.out.println("Je loopt rond in Den Haag");
        this.out.println("Vergaar kennis en red de maatschappij!");
        this.out.println("Typ 'help' als je niet weet wat je moet doen.");
        this.out.println();
        this.out.println(this.currentRoom.description);
        console.log(this.currentRoom);
        this.out.print("Uitgangen: ");
        if(this.currentRoom.northExit != null) {
            this.out.print("noordelijk ");
        }
        if(this.currentRoom.eastExit != null) {
            this.out.print("oostelijk ");
        }
        if(this.currentRoom.southExit != null) {
            this.out.print("zuidelijk ");
        }
        if(this.currentRoom.westExit != null) {
            this.out.print("westelijk ");
        }
        this.out.println();
        this.out.print(">");
    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("Dankjewel voor het spelen. Tot wederziens.");
        this.out.println("Druk op F5 om het spel te herstarten");
    }

    /**
     * Print out error message when user enters unknown command.
     * Here we print some erro message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printError(params : string[]) : boolean {
        this.out.println("Ik weet niet wat je bedoelt...");
        this.out.println();
        this.out.println("Je commando's zijn:");
        this.out.println("   ga kijk praat intellect stop help");
        return false;
    }

}
