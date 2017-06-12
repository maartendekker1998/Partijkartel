/**
 * @author  Maarten Dekker
 */

class npc {
        description : string;
            
    /**
     * Create a npc described "description". "description" is something like "a smart man" or the opposite
     * like "Jesse Klaver".
     * @param description The npc's description.
     */
    constructor(description : string) {
        this.description = description;
    }
}