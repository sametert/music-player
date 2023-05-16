//create Music constructor
class Music {
    constructor(title, singer , img , file) {
        this.title  = title;
        this.singer = singer;
        this.img    = img;
        this.file   = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Sarı Saçlım Mavi Gözlüm", "Selda Bağcan" , "2.jpg","2.mp3"),
    new Music("İyi De Bana Ne", "Duman" , "1.jpg","1.mp3"),
    new Music("Padişah", "Sibel Can" , "3.jpg","3.mp3")
];