class Call {
    i = 0;
    sayGreet() {
        checkI.call(this);   

        function checkI() {
            console.log(this.i);
        }
    }    
}


new Call().sayGreet();