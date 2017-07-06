class Praat extends Command {
    execute(params: string[]): boolean {

        let standpunt = "";
        let reactie = "";
        let intellect = "";

        if (this.game.currentRoom.npc == null) {
            this.game.out.println("Je begint een gesprek...");
            this.game.out.println("...maar je realizeert je dat er niemand anders in deze kamer is.");
            return false;
        }

        switch (this.game.currentRoom.npc.name) {
            case "Sylvana":
                if (this.hasTalkedTo("Sylvana")) {
                    standpunt = "Sylvana: Racist!"
                } else {
                    standpunt = "Sylvana: Hey Thierry, weet je wat een goed idee is, een diversiteitsquotem. "
                    reactie = "Thierry: Nee dat is het niet, allochtonen moeten net als de rest worden aangenomen vanwege hun kwaliteiten, als er nu te weinig diversiteit is betekent dat dat er te weinig allochtonen zijn met topkwalitieiten. "
                    intellect = "Met mevrouw Simons valt niet te communiceren (+0 intellect)"
                }
                break;
            case "Alexander":
                if (this.hasTalkedTo("Alexander")) {
                    standpunt = "Alexander: Hou op straks ga ik bad.";
                } else {
                    standpunt = "Thierry: Hallo meneer Pechtold, wat is uw mening omtrent het legaliseren van softdrugs?"
                    reactie = "Alexander: Coffeeshophouders zijn gedwongen schimmige zaken te doen. Met mijn wet moet er aan dat paradoxale onderscheid een einde komen!"
                    intellect = "Pechtold mag geen verstand hebben van de EU, maar zijn drugsbeleid is degelijk. (+10 intellect)"
                    this.game.intellect += 10;
                }
                break;
            case "Gert-Jan":
                if (this.hasTalkedTo("Gert-Jan")) {
                    standpunt = "Gert-Jan: Amen .";
                } else {
                    standpunt = "Hey Thierry, voldoen onze uitgaven aan defensie al aan de NAVO-norm?"
                    reactie = "Hé Gert, laatste keer dat ik keek nog niet hoor."
                    intellect = "Je word er aan herinnert waarom het geen slim idee is om een vrouw minister van defensie te maken (+10 intellect)"
                    this.game.intellect += 15;
                }
                break;
            case "Geert":
                if (this.hasTalkedTo("Geert")) {
                    standpunt = "Geert: Doe eens normaal man";
                } else {
                    standpunt = "Geert: Hoi Thierry, wanneer stopt die massa immigratie nou eens."
                    reactie = "Thierry: Weet ik niet, maar als die land uw partijprogramma volgen komen we er vast wel"
                    intellect = "Samen kijken Wilders en Baudet naar het A4tje van de PVV op zoek naar de oplossing. Ze konden helaas geen antwoord vinden op de vraag, er was een tekort aan onderbouwing. (+15 intellect)"
                    this.game.intellect += 10;
                }
                break;
            case "Marriane":
                if (this.hasTalkedTo("Marriane")) {
                    standpunt = "Marriane: Ga eens wat dieren beschermen inplaats van mij lastig vallen.";
                } else {
                    standpunt = "Marriane: Thierry, wat vind jij nou eigenlijk van TTIP en CETA?"
                    reactie = "Theirry: We leven in een democratie, daarom moeten er over de internationale handelsverdragen referenda komen."
                    intellect = "Desondanks de PvdD een zielige one-issue partij is vallen ze een klein beetje serieus te nemen (+10 intellect) "
                    this.game.intellect += 10;
                }
                break;
            case "Mark":
                if (this.hasTalkedTo("Mark")) {
                    standpunt = "Mark: Pleur op!";
                } else {
                    standpunt = "Thierry: Hoi Mark, ik heb een vraagje. Het forum is voor een handhaving van de HRA totdat lagere belastingtarieven zijn ingevoerd."
                    reactie = "Mark: Tijd om de belastingen te verlagen. Heel normaal"
                    intellect = "Dit sluit aan bij het FvD standpunt 'Radicale vereenvoudiging belastingstelsel'(+15 intellect) "
                    this.game.intellect += 15;
                }
                break;
            case "Jesse":
                if (this.hasTalkedTo("Jesse")) {
                    standpunt = "Jesse: huilie huilie";
                } else {
                    standpunt = "Jesse: Waarom lach je nou om ons partijprogramma? Het is goed doordacht en doorgerekend."
                    reactie = "Thierry: Wilders heeft het beter gedaan dan GroenLinks, hij heeft het bij één pagina aan verbaal braaksel gelaten."
                    intellect = "Groenlinks is echt kansloos, hier valt geen intellect te vergaren (+0 intellect)"
                }
                break;
            case "Lodewijk":
                if (this.hasTalkedTo("Lodewijk")) {
                    standpunt = "Lodewijk: Heb jij mijn zetels gezien, ik ben ze kwijt.";
                } else {
                    standpunt = "Lodewijk: Het regent uitkeringen, wat is het mooi!"
                    reactie = "Thierry: Meneer Asscher, het hoort een sociale vangnet te zijn, geen sociale hangmat."
                    intellect = "Die uitspraak was zo goed dat je je eigen intellect hebt verrijkt (+10 intellect)"
                    this.game.intellect += 10;
                }
                break;
            case "Theo":
                if (this.hasTalkedTo("Theo")) {
                    standpunt = "Theo: Laat me even mijn sigaret oproken";
                } else {
                    standpunt = "Theo: Beste Thierry wat goed dat je er bent, ik heb de stekker net uit het baantjescarousel getrokken, we moeten snel gaan. Het vlaggenschip ligt op je te wachten in de hofvijver aan het mauritshuis"
                    reactie = "Thierry: Dankje Theo, we hebben geen tijd te verliezen"
                    intellect = "Dit is een vooruitgang voor heel Nederland (+30 intellect)"
                    this.game.intellect += 30;
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
    }

    public hasTalkedTo(name: string) {
        for (let i = 0; i < this.game.talkedTo.length; i++) {
            if (this.game.talkedTo[i] == name)
                return true;
        }
        return false;
    }

}