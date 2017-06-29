/**
 * @author  Maarten Dekker
 */

class Command {
    protected game: Game;
    
    constructor(game: Game)
    {
    this.game = game;
    }

    /**
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    public execute(params : string[]) : boolean
    {
        return false;
    }
}

    

