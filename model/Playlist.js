const fs = require('fs');
const {Pop,Rock} = require('./Song');

class Playlist {
    constructor(id,name,songs){
        this.id = id;
        this.name = name;
        this.songs = songs || [];
    }
    // menggunakan .map
    static getPlaylist(){ 
        // mengambil data dari data.json
        let data = JSON.parse(fs.readFileSync('./data.json','utf8'));
        // destrukturing playlist
        let Playlists = data.map(playlist =>{   
            // menggunakan let karena akan diubah / destrukturing lagi 
            let {id,name,songs} = playlist;
            // destrukturing song
            songs = songs.map(song => {
                const {id,name,duration,genre} = song;
                if(genre === 'Pop'){
                    return new Pop (id,name,duration)
                }else if (genre === 'Rock'){
                    return new Rock (id,name,duration)
                }
            }) 
            return new Playlist(id,name,songs);
        })  
        return Playlists;
    }
    // menggunakan .forEach dan .push pada methodnya
    static addPlaylist(params){
        // mengambil data
        let playlists = this.getPlaylist();
        const [name,genre,duration,playlistName] = params;

        playlists.forEach(playlist => { 
            if(playlist.name === playlistName){
                let id;
                // apabila song = 0 / kosong 
                if(playlist.songs.length === 0){
                // menjadikan lagu yang ditambahkan otomatis menjadi id 1
                    id = 1;
                }else{
                    //mengambil index terakhir dari playlist.songs dengan cara (playlist.songs.id - 1)
                    id = playlist.songs[playlist.songs.length - 1].id + 1;
                }
                //menentukan id untuk song
                //memasukan kondisi genre
                if(genre === 'Pop'){
                    // apabila genre = pop , maka playlist.songs akan dimasukkan ke class pop yang baru
                    // + duration merubah string jadi number
                    playlist.songs.push( new Pop (id,name, +duration));
                }else if (genre === 'Rock'){
                    // apabila genre = rock , maka playlist.songs akan dimasukkan ke class rock yang baru 
                    // + duration merubah string jadi number
                    playlist.songs.push( new Rock (id,name, +duration));
                }
            }
        });
        this.save(playlists);
        console.log(`${name} berhasil ditambahkan ke ${playlistName}`);
    }
    static removePlaylist(params){
        // mengambil data dari getPlaylist
        let playlists = this.getPlaylist();
        const [songName,playlistName] = params;
        
        playlists = playlists.map(playlist => {
            if(playlist.name === playlistName){
            // memfilter nama yang kita input apabila tidak sama akan masuk langsung ke playlist   
            playlist.songs = playlist.songs.filter(song => song.name !== songName);
                return playlist
            } else {
                return playlist
            }
        });
        this.save(playlists);
        console.log(`${songName} Berhasil dihapus dari playlist ${playlistName}.`);
    }
    static makePlaylist(params){
        let playlists = this.getPlaylist();
        // mengambil index id terakhir dari playlist
        let id = playlists[playlists.length - 1].id + 1;
        let [name] = params
        playlists.push(new Playlist (id,name));
        
        this.save(playlists);
        console.log(`Playlist ${name} berhasil ditambahkan`);
    }
    static showPlaylist(){
        //mengambil data dari getPlaylist
        let data = this.getPlaylist();
    }
    static save(data){
        fs.writeFileSync('./data.json',JSON.stringify(data,null,3));
    }
}

module.exports = Playlist;