class Stop extends Command{ 
    execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Stop met wat?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}