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
            var gertjan = new npc("Gert-Jan Segers", "Gert-Jan Segers is aan het bidden dat Pechtold de CU mee laat werken in de coalitievorming.")
            var theo = new npc("Theo", "Theo Hiddema staat in de opening van het torentje en rijkt zijn hand al naar je uit.");
            var marriane = new npc("Marriane", "Je komt Marriane Theime tegen in de gang.");
            var mark = new npc("Mark","Mark Rutte is aanwezig.");
            var jesse = new npc("Jesse","Je ziet Jesse Feras Klaver zitten.");
            var geert = new npc("Geert","Geert Wilders staat al op je te wachten.");
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
        var schip = new Room("Je staat op het vlaggenschip van de renaissance vloot", 0);
        
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
        mauritshuis.setExits(schip, null, null, torentje, null, null);
        schip.setExits(null, null, mauritshuis, null, null, null);

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

    /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printHelp(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Help met wat?");
            return false;
        }
        this.out.println("Je loopt rond in Den Haag");
        this.out.println("Vergaar kennis en red de maatschappij!");
        this.out.println();
        this.out.println("Je commando's zijn:");
        this.out.println("   ga kijk praat intellect stop help");
        return false;
    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params : string[]) : boolean {
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Ga waarheen?");
            this.out.println("noordelijk, oostelijk, zuidelijk of westelijk.");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "noordelijk"   : 
                nextRoom = this.currentRoom.northExit;
                break;
            case "oostelijk"    : 
                nextRoom = this.currentRoom.eastExit;
                break;
            case "zuidelijk"    : 
                nextRoom = this.currentRoom.southExit;
                break;
            case "westelijk"    : 
                nextRoom = this.currentRoom.westExit;
                break;
            case "omhoog"       :
                nextRoom = this.currentRoom.upExit;
                break;
            case "omlaag"       :
                nextRoom = this.currentRoom.downExit;
                break;
        }

        if (nextRoom == null) {
            this.out.println("Er is geen deur of trap!");
        }
        else {

            //check intellect requirement
            if (this.intellect < nextRoom.intellectRequirement) {
                this.out.println("Je hebt "+nextRoom.intellectRequirement+" intellect nodig om deze kamer in te gaan.");
                return false;
            }

            this.currentRoom = nextRoom;
            this.out.println(this.currentRoom.description);
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
            if(this.currentRoom.upExit != null) {
                this.out.print("omhoog");
            }
            if(this.currentRoom.downExit != null) {
                this.out.print("omlaag");
            }
            this.out.println();
        }
        return false;
    }

   /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */    
    quit(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Stop met wat?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }

   /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    look(params : string[]) : boolean {
        this.out.println(this.currentRoom.description);
        if (this.currentRoom.npc != null)
        this.out.println(this.currentRoom.npc.description);
        return false;
    }

    talk(params :string[]) : boolean {

        let standpunt = "";
        let reactie = "";
        let intellect = "";

        if (this.currentRoom.npc == null)
        {
            this.out.println("Je begint een gesprek...");
            this.out.println("...maar je realizeert je dat er niemand anders in deze kamer is.");
            return false;
        }
        
        switch(this.currentRoom.npc.name) {
            case "Sylvana":
                if(this.hasTalkedTo("Sylvana")) {
                standpunt = "Sylvana: Racist!"
                } else {
                standpunt = "Sylvana: Hey Thierry, weet je wat een goed idee is, een diversiteitsquotem. "
                reactie =   "Thierry: Nee dat is het niet, allochtonen moeten net als de rest worden aangenomen vanwege hun kwalitieiten, als er nu te weinig diversiteit is betekent dat dat er te weinig allochtonen zijn met topkwalitieiten. "
                intellect = "Met mevrouw Simons valt niet te communiceren (+0 intellect)"
                this.intellect += 0;
                }
            break;            
            case "Alexander":
                if (this.hasTalkedTo("Alexander")) {
                standpunt = "Alexander: Hou op straks ga ik bad.";
                } else {
                standpunt = "Thierry: Hallo meneer Pechtold, wat is uw mening omtrent het legaliseren van softdrugs?"
                reactie = "Alexander: Coffeeshophouders zijn gedwongen schimmige zaken te doen. Met mijn wet moet er aan dat paradoxale onderscheid een einde komen!"
                intellect = "Pechtold mag geen verstand hebben van de EU, maar zijn drugsbeleid is goed (+10 intellect)"
                this.intellect += 10;
            }
            case "Gert-Jan":
                if (this.hasTalkedTo("Gert-Jan")) {
                standpunt = "Gert-Jan: Amen .";
                } else {
                standpunt = "Hey Thierry, zit voldoen onze uitgaven aan defensie al aan de NAVO-norm?"
                reactie = "Hé Gert, laatste keer dat ik keek nog niet hoor."
                intellect = "Je word er aan herrinderd dat het geen slim idee is om een vrouw in een topfunctie te stoppen (+10 intellect)"
                this.intellect += 15;
                }
            
            break;
            case "Geert":
                if (this.hasTalkedTo("Geert")) {
                standpunt = "Geert: Doe eens normaal man";
                } else {
                standpunt = "Geert: Hoi Thierry, wanneer stopt die massa immigratie nou eens."
                reactie = "Thierry: Weet ik niet, maar als die land uw partijprogramma volgen komen we er vast wel"
                intellect = "Samen kijken Wilders en Baudet naar het A4tje van de PVV op zoek naar de oplossing. Ze konden helaas geen antwoord vinden op de vraag, er was een tekort aan onderbouwing. (+15 intellect)"
                this.intellect += 10;
                }
            break;
            case "Marriane":
                if (this.hasTalkedTo("Marriane")) {
                standpunt = "Marriane: Ga eens wat dieren beschermen inplaats van mij lastig vallen.";
                } else {
                standpunt = "Marriane: Thierry, wat vind jij nou eigenlijk van TTIP en CETA?"
                reactie = "Theirry: We leven in een democratie, daarom moeten er over de internationale handelsverdragen referenda komen."
                intellect = "Desondanks de PvdD een zielige one-issue partij is vallen ze een klein beetje serieus te nemen (+10 intellect) "
                this.intellect += 10;
                }
            break;
            case "Mark":
                if (this.hasTalkedTo("Mark")) {
                standpunt = "Mark: Pleur op!";
                } else {
                standpunt = "Thierry: Hoi Mark, ik heb een vraagje. Het forum is voor een handhaving van de HRA totdat lagere belastingtarieven zijn ingevoerd."
                reactie = "Mark: Tijd om de belastingen te verlagen. Heel normaal"
                intellect = "Dit sluit aan bij het fvd standpunt 'Radicale vereenvoudiging belastingstelsel'(+15 intellect) "
                this.intellect += 15;
                }
            break;
            case "Jesse":
                if (this.hasTalkedTo("Jesse")) {
                standpunt = "Jesse: huilie huilie";
                } else {
                standpunt = "Jesse: Waarom lach je nou om ons partijprogramma? Het is goed doordacht en doorgerekend."
                reactie = "Thierry: Wilders heeft het beter gedaan dan jullie, hij heeft het bij één pagina aan verbale kots gehouden."
                intellect = "Groenslinks is echt kansloos, hier valt geen intellect te vergaren (+0 intelect)"
                this.intellect += 0;
                }
            break;
            case "Lodewijk":
                if (this.hasTalkedTo("Lodewijk")) {
                standpunt = "";
                } else {
                standpunt = "Lodewijk: Het regent uitkeringen, wat is het mooi!"
                reactie = "Thierry: Meneer Asscher, het hoort een sociale vangnet te zijn, geen sociale hangmat."
                intellect = "Die uitspraak was zo goed dat je je eigen intellect hebt vergroot (+10)"
                this.intellect += 10;
                }
            break;
            case "Theo":
                if (this.hasTalkedTo("Theo")) {
                standpunt = "Theo: Laat me even mijn sigaret oproken";
                } else {
                standpunt = "Theo: Beste Theirry wat goed dat je er bent, ik heb de stekker net uit de baantjescarousel getrokken, we moeten snel gaan. Het vlaggenschip ligt op je te wachten in de hofvijver aan het mauritshuis"
                reactie = "Thierry: Dankje Theo, we hebben geen tijd te verliezen"
                intellect = "Dit is een vooruitgang voor heel Nederland (+30)"
                this.intellect += 30; 
                }
            break;
            case "JFVD":
                if (this.hasTalkedTo("JFVD")) {
                standpunt = "THIERRY!, THIERRY!, THIERRY!";
                } else {
                standpunt = "Frederik Jansen: Betreed het schip, snel, het kartel zit al achter je aan."
                reactie = "Thierry draait zich nog een keer om terwijl hij op de loopplank staat en hij ziet Mark Rutte met gebalde vuisten naar hem wijzen. Baudet's haren wapperen in de wind van democratie terwijl de zeilen van het vlaggenschip van de rainescancevloot gehesen worden..."
                intellect = "Gefeliciteerd, je hebt het spel uitgespeeld, het partijkartel is nog lang niet opgebroken. Dit kan alleen door FvD te steunen. Ga naar 'forumvoordemocratie.nl' voor meer informatie"
                this.intellect += 0;
                }
            break;
        }

        this.out.println(standpunt);
        this.out.println(reactie);
        this.out.println(intellect);
        this.talkedTo.push(this.currentRoom.npc.name);
        
        return false;
    }

    public hasTalkedTo(name: string) {
        for (let i = 0;i<this.talkedTo.length;i++) {
            if (this.talkedTo[i] == name)
            return true;
        }
        return false;
    }

    public checkIntellect(params : string[]) : boolean {
        this.out.println("Je hebt "+this.intellect+" kennis vergaard.");
        return false;
    }

}
