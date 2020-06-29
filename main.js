var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Command = (function () {
    function Command(game) {
        this.game = game;
    }
    Command.prototype.execute = function (params) {
        return false;
    };
    return Command;
}());
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.execute = function (params) {
        this.game.out.println("Ik weet niet wat je bedoelt...");
        this.game.out.println();
        this.game.out.println("Je commando's zijn:");
        this.game.out.println("   ga kijk praat intellect stop help");
        return false;
    };
    return Default;
}(Command));
var Ga = (function (_super) {
    __extends(Ga, _super);
    function Ga() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ga.prototype.execute = function (params) {
        if (params.length == 0) {
            this.game.out.println("Ga waarheen?");
            this.game.out.println("noordelijk, oostelijk, zuidelijk of westelijk.");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "noordelijk":
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "oostelijk":
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "zuidelijk":
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "westelijk":
                nextRoom = this.game.currentRoom.westExit;
                break;
            case "omhoog":
                nextRoom = this.game.currentRoom.upExit;
                break;
            case "omlaag":
                nextRoom = this.game.currentRoom.downExit;
                break;
        }
        if (nextRoom == null) {
            this.game.out.println("Er is geen deur of trap!");
        }
        else {
            if (this.game.intellect < nextRoom.intellectRequirement) {
                this.game.out.println("Je hebt " + nextRoom.intellectRequirement + " intellect nodig om deze kamer in te gaan.");
                return false;
            }
            this.game.currentRoom = nextRoom;
            if (this.game.currentRoom.description == "Je bent in het Mauritshuis") {
                this.game.out.println("Frederik Jansen: Betreed het schip, snel, het kartel zit al achter je aan.");
                this.game.out.println("Thierry draait zich nog een keer om terwijl hij op de loopplank staat en hij ziet Mark Rutte met gebalde vuisten naar hem wijzen. Baudet's haren wapperen in de wind van democratie terwijl de zeilen van het vlaggenschip van de renaissancevloot gehesen worden...");
                this.game.out.println("Gefeliciteerd, je hebt het spel uitgespeeld, het partijkartel is nog lang niet opgebroken. Dit kan alleen door FvD te steunen. Ga naar 'forumvoordemocratie.nl' voor meer informatie.");
                this.game.gameOver();
                return;
            }
            this.game.out.println(this.game.currentRoom.description);
            this.game.out.print("Uitgangen: ");
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
            if (this.game.currentRoom.upExit != null) {
                this.game.out.print("omhoog");
            }
            if (this.game.currentRoom.downExit != null) {
                this.game.out.print("omlaag");
            }
            this.game.out.println();
        }
        return false;
    };
    return Ga;
}(Command));
var Game = (function () {
    function Game(output, input) {
        this.intellect = 0;
        this.talkedTo = [];
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }
    Game.prototype.createRooms = function () {
        var sylvana = new npc("Sylvana", "Sylvana Simons staat bij de haringkraam.");
        var alexander = new npc("Alexander", "Alexander pechtold staat stoned weg te dromen bij de fontijn van graaf Willem II.");
        var gertjan = new npc("Gert-Jan", "Gert-Jan Segers is aan het bidden dat Pechtold de CU mee laat werken in de coalitievorming.");
        var theo = new npc("Theo", "Theo Hiddema staat in de opening van het torentje en rijkt zijn hand al naar je uit.");
        var marriane = new npc("Marriane", "Je komt Marriane Thieme tegen in de gang.");
        var mark = new npc("Mark", "Mark Rutte is aanwezig.");
        var jesse = new npc("Jesse", "Je ziet Jesse Feras Klaver zitten.");
        var geert = new npc("Geert", "Geert Wilders staat hier ook.");
        var lodewijk = new npc("Lodewijk", "Lodewijk Asscher zit met zijn telefoon te spelen op een bankje.");
        var buitenhof = new Room("Je staat op het buitenhof", 0);
        var binnenhof = new Room("Je staat op het binnenhof", 0);
        var hofkapel = new Room("Je bent in de hofkapel", 0);
        var hofpoort = new Room("Je staat onder de hofpoort", 0);
        var minjus = new Room("Je bent in het Departement van justitie", 35);
        var kamer = new Room("Je bent in de Tweede kamer der Staten Generaal", 0);
        var pers = new Room("Je staat op de persverdieping van de Tweede Kamer der Staten Generaal", 0);
        var minalg = new Room("Je bent in het ministerie van algemene zaken", 60);
        var torentje = new Room("Je bent in het torentje", 0);
        var mauritshuis = new Room("Je bent in het Mauritshuis", 0);
        buitenhof.setnpc(sylvana);
        binnenhof.setnpc(alexander);
        hofkapel.setnpc(gertjan);
        hofpoort.setnpc(geert);
        minjus.setnpc(marriane);
        kamer.setnpc(mark);
        pers.setnpc(jesse);
        minalg.setnpc(lodewijk);
        torentje.setnpc(theo);
        buitenhof.setExits(null, binnenhof, null, null, null, null);
        binnenhof.setExits(hofkapel, null, hofpoort, buitenhof, null, null);
        hofkapel.setExits(null, null, binnenhof, null, null, null);
        hofpoort.setExits(binnenhof, minjus, null, null, null, null);
        minjus.setExits(kamer, null, null, hofpoort, null, null);
        kamer.setExits(null, minalg, minjus, null, pers, null);
        pers.setExits(null, null, null, null, null, kamer);
        minalg.setExits(torentje, null, null, kamer, null, null);
        torentje.setExits(null, mauritshuis, minalg, null, null, null);
        mauritshuis.setExits(null, null, null, torentje, null, null);
        this.currentRoom = buitenhof;
    };
    Game.prototype.printWelcome = function () {
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
        if (this.currentRoom.northExit != null) {
            this.out.print("noordelijk ");
        }
        if (this.currentRoom.eastExit != null) {
            this.out.print("oostelijk ");
        }
        if (this.currentRoom.southExit != null) {
            this.out.print("zuidelijk ");
        }
        if (this.currentRoom.westExit != null) {
            this.out.print("westelijk ");
        }
        this.out.println();
        this.out.print(">");
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.println("Dankjewel voor het spelen. Tot wederziens.");
        this.out.println("Druk op F5 om het spel te herstarten");
        this.parser.input.disabled = true;
    };
    Game.prototype.printError = function (params) {
        this.out.println("Ik weet niet wat je bedoelt...");
        this.out.println();
        this.out.println("Je commando's zijn:");
        this.out.println("   ga kijk praat intellect stop help");
        return false;
    };
    return Game;
}());
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Help.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Help met wat?");
            return false;
        }
        this.game.out.println("Je loopt rond in Den Haag");
        this.game.out.println("Vergaar kennis en red de maatschappij!");
        this.game.out.println();
        this.game.out.println("Je commando's zijn:");
        this.game.out.println("   ga kijk praat intellect stop help");
        return false;
    };
    return Help;
}(Command));
var Intellect = (function (_super) {
    __extends(Intellect, _super);
    function Intellect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intellect.prototype.execute = function (params) {
        this.game.out.println("Je hebt " + this.game.intellect + " kennis vergaard.");
        return false;
    };
    return Intellect;
}(Command));
var Kijk = (function (_super) {
    __extends(Kijk, _super);
    function Kijk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Kijk.prototype.execute = function (params) {
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
        if(this.game.currentRoom.upExit != null){
            this.game.out.print("omhoog")
        }
        if(this.game.currentRoom.downExit != null){
            this.game.out.print("omlaag")
        }
        this.game.out.println();
        this.game.out.print(">");
        if (this.game.currentRoom.npc != null)
            this.game.out.println(this.game.currentRoom.npc.description);
        return false;
    };
    return Kijk;
}(Command));
var npc = (function () {
    function npc(name, description) {
        this.name = name;
        this.description = description;
    }
    return npc;
}());
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.commands = {};
        this.game = game;
        this.input = input;
        this["default"] = new Default(game);
        this.commands["ga"] = new Ga(this.game);
        this.commands['kijk'] = new Kijk(this.game);
        this.commands['praat'] = new Praat(this.game);
        this.commands['intellect'] = new Intellect(this.game);
        this.commands['stop'] = new Stop(this.game);
        this.commands['help'] = new Help(this.game);
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.print(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        if (words[0] == "") {
            return;
        }
        var command;
        command = this.commands[words[0]];
        if (command == null) {
            command = this["default"];
        }
        wantToQuit = command.execute(params);
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
var Praat = (function (_super) {
    __extends(Praat, _super);
    function Praat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Praat.prototype.execute = function (params) {
        var standpunt = "";
        var reactie = "";
        var intellect = "";
        if (this.game.currentRoom.npc == null) {
            this.game.out.println("Je begint een gesprek...");
            this.game.out.println("...maar je realizeert je dat er niemand anders in deze kamer is.");
            return false;
        }
        switch (this.game.currentRoom.npc.name) {
            case "Sylvana":
                if (this.hasTalkedTo("Sylvana")) {
                    standpunt = "Sylvana: Racist!";
                }
                else {
                    standpunt = "Sylvana: Hey Thierry, weet je wat een goed idee is, een diversiteitsquotem. ";
                    reactie = "Thierry: Nee dat is het niet, allochtonen moeten net als de rest worden aangenomen vanwege hun kwaliteiten, als er nu te weinig diversiteit is betekent dat dat er te weinig allochtonen zijn met topkwalitieiten. ";
                    intellect = "Met mevrouw Simons valt niet te communiceren (+0 intellect)";
                }
                break;
            case "Alexander":
                if (this.hasTalkedTo("Alexander")) {
                    standpunt = "Alexander: Hou op straks ga ik bad.";
                }
                else {
                    standpunt = "Thierry: Hallo meneer Pechtold, wat is uw mening omtrent het legaliseren van softdrugs?";
                    reactie = "Alexander: Coffeeshophouders zijn gedwongen schimmige zaken te doen. Met mijn wet moet er aan dat paradoxale onderscheid een einde komen!";
                    intellect = "Pechtold mag geen verstand hebben van de EU, maar zijn drugsbeleid is degelijk. (+10 intellect)";
                    this.game.intellect += 10;
                }
                break;
            case "Gert-Jan":
                if (this.hasTalkedTo("Gert-Jan")) {
                    standpunt = "Gert-Jan: Amen .";
                }
                else {
                    standpunt = "Hey Thierry, voldoen onze uitgaven aan defensie al aan de NAVO-norm?";
                    reactie = "Hé Gert, laatste keer dat ik keek nog niet hoor.";
                    intellect = "Je word er aan herinnert waarom het geen slim idee is om een vrouw minister van defensie te maken (+10 intellect)";
                    this.game.intellect += 15;
                }
                break;
            case "Geert":
                if (this.hasTalkedTo("Geert")) {
                    standpunt = "Geert: Doe eens normaal man";
                }
                else {
                    standpunt = "Geert: Hoi Thierry, wanneer stopt die massa immigratie nou eens.";
                    reactie = "Thierry: Weet ik niet, maar als die land uw partijprogramma volgen komen we er vast wel";
                    intellect = "Samen kijken Wilders en Baudet naar het A4tje van de PVV op zoek naar de oplossing. Ze konden helaas geen antwoord vinden op de vraag, er was een tekort aan onderbouwing. (+15 intellect)";
                    this.game.intellect += 10;
                }
                break;
            case "Marriane":
                if (this.hasTalkedTo("Marriane")) {
                    standpunt = "Marriane: Ga eens wat dieren beschermen inplaats van mij lastig vallen.";
                }
                else {
                    standpunt = "Marriane: Thierry, wat vind jij nou eigenlijk van TTIP en CETA?";
                    reactie = "Theirry: We leven in een democratie, daarom moeten er over de internationale handelsverdragen referenda komen.";
                    intellect = "Desondanks de PvdD een zielige one-issue partij is vallen ze een klein beetje serieus te nemen (+10 intellect) ";
                    this.game.intellect += 10;
                }
                break;
            case "Mark":
                if (this.hasTalkedTo("Mark")) {
                    standpunt = "Mark: Pleur op!";
                }
                else {
                    standpunt = "Thierry: Hoi Mark, ik heb een vraagje. Het forum is voor een handhaving van de HRA totdat lagere belastingtarieven zijn ingevoerd.";
                    reactie = "Mark: Tijd om de belastingen te verlagen. Heel normaal";
                    intellect = "Dit sluit aan bij het FvD standpunt 'Radicale vereenvoudiging belastingstelsel'(+15 intellect) ";
                    this.game.intellect += 15;
                }
                break;
            case "Jesse":
                if (this.hasTalkedTo("Jesse")) {
                    standpunt = "Jesse: huilie huilie";
                }
                else {
                    standpunt = "Jesse: Waarom lach je nou om ons partijprogramma? Het is goed doordacht en doorgerekend.";
                    reactie = "Thierry: Wilders heeft het beter gedaan dan GroenLinks, hij heeft het bij één pagina aan verbaal braaksel gelaten.";
                    intellect = "Groenlinks is echt kansloos, hier valt geen intellect te vergaren (+0 intellect)";
                }
                break;
            case "Lodewijk":
                if (this.hasTalkedTo("Lodewijk")) {
                    standpunt = "Lodewijk: Heb jij mijn zetels gezien, ik ben ze kwijt.";
                }
                else {
                    standpunt = "Lodewijk: Het regent uitkeringen, wat is het mooi!";
                    reactie = "Thierry: Meneer Asscher, het hoort een sociale vangnet te zijn, geen sociale hangmat.";
                    intellect = "Die uitspraak was zo goed dat je je eigen intellect hebt verrijkt (+10 intellect)";
                    this.game.intellect += 10;
                }
                break;
            case "Theo":
                if (this.hasTalkedTo("Theo")) {
                    standpunt = "Theo: Laat me even mijn sigaret oproken";
                }
                else {
                    standpunt = "Theo: Beste Thierry wat goed dat je er bent, ik heb de stekker net uit het baantjescarousel getrokken, we moeten snel gaan. Het vlaggenschip ligt op je te wachten in de hofvijver aan het mauritshuis";
                    reactie = "Thierry: Dankje Theo, we hebben geen tijd te verliezen";
                    intellect = "Dit is een vooruitgang voor heel Nederland (+30 intellect)";
                    this.game.intellect += 30;
                }
                break;
            case "JFVD":
                if (this.hasTalkedTo("JFVD")) {
                    standpunt = "THIERRY!, THIERRY!, THIERRY!";
                }
                else {
                    standpunt = "Frederik Jansen: Betreed het schip, snel, het kartel zit al achter je aan.";
                    reactie = "Thierry draait zich nog een keer om terwijl hij op de loopplank staat en hij ziet Mark Rutte met gebalde vuisten naar hem wijzen. Baudet's haren wapperen in de wind van democratie terwijl de zeilen van het vlaggenschip van de rainescancevloot gehesen worden...";
                    intellect = "Gefeliciteerd, je hebt het spel uitgespeeld, het partijkartel is nog lang niet opgebroken. Dit kan alleen door FvD te steunen. Ga naar 'forumvoordemocratie.nl' voor meer informatie. Typ 'stop' om het spel af te sluiten";
                }
                break;
        }
        if (standpunt != "")
            this.game.out.println(standpunt);
        if (reactie != "")
            this.game.out.println(reactie);
        if (intellect != "")
            this.game.out.println(intellect);
        this.game.talkedTo.push(this.game.currentRoom.npc.name);
        if (this.game.intellect == 35) {
            this.game.out.println("Je hebt genoeg intellect vergaard om toegang tot het Departement van Justitie te krijgen.");
        }
        if (this.game.intellect == 60) {
            this.game.out.println("Je hebt genoeg intellect vergaard om toegang tot het Ministerie van algemene zaken te krijgen.");
        }
        if (this.game.intellect == 100) {
            this.game.out.println("Je hebt genoeg intellect vergaard om toegang tot het Maurtishuis te krijgen");
        }
        return false;
    };
    Praat.prototype.hasTalkedTo = function (name) {
        for (var i = 0; i < this.game.talkedTo.length; i++) {
            if (this.game.talkedTo[i] == name)
                return true;
        }
        return false;
    };
    return Praat;
}(Command));
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    return Printer;
}());
var Room = (function () {
    function Room(description, req) {
        this.intellectRequirement = 0;
        this.description = description;
        this.intellectRequirement = req;
    }
    Room.prototype.setExits = function (noordelijk, oostelijk, zuidelijk, westelijk, omhoog, omlaag) {
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
    };
    Room.prototype.setnpc = function (n) {
        this.npc = n;
    };
    return Room;
}());
var Stop = (function (_super) {
    __extends(Stop, _super);
    function Stop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stop.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Stop met wat?");
            return false;
        }
        else {
            return true;
        }
    };
    return Stop;
}(Command));
