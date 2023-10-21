function MainClass(isPiska) {
    this.name = "name";
    this.isPiska = isPiska;

    return ({
        name: this.name,
        isPiska: this.isPiska    
    });
}



const m = MainClass(true);

const m1 = MainClass(false);

console.log(m);