/**
 * @author  Maarten Dekker
 */

class npc {
        name: string;
        description : string;
            
    /**
     * Create a npc described "description". "description" is something like "a smart man" or the opposite
     * like "Jesse Klaver".
     * @param description The npc's description.
     */
    constructor(name: string, description : string) {
        this.name = name;
        this.description = description;
    }
}